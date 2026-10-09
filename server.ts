import express from "express";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Endpoints
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "OmniDle Server operational" });
  });

  // Daily seed generator helper API
  app.get("/api/daily-seed", (req, res) => {
    const today = new Date().toISOString().split("T")[0];
    res.json({ date: today, timestamp: Date.now() });
  });

  // Persistent disk cache setup
  const CACHE_DIR = path.join(process.cwd(), ".cache", "covers");
  try {
    if (!fs.existsSync(CACHE_DIR)) {
      fs.mkdirSync(CACHE_DIR, { recursive: true });
    }
  } catch (err) {
    console.warn("Failed to create cache dir:", err);
  }

  // Cover image in-memory cache
  interface ImageCacheEntry {
    buffer: Buffer;
    contentType: string;
    timestamp: number;
  }
  const coverCache = new Map<string, ImageCacheEntry>();
  const MAX_CACHE_ENTRIES = 1200;

  // In-flight deduplication map: prevents multiple simultaneous requests from hitting upstream
  const inFlightFetches = new Map<string, Promise<{ buffer: Buffer; contentType: string } | null>>();

  function generateFallbackCoverSvg(title: string = "Videogame"): string {
    const safeTitle = title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 480" width="360" height="480">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0f172a"/>
          <stop offset="50%" stop-color="#1e1b4b"/>
          <stop offset="100%" stop-color="#020617"/>
        </linearGradient>
        <linearGradient id="borderGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#6366f1"/>
          <stop offset="100%" stop-color="#f43f5e"/>
        </linearGradient>
      </defs>
      <rect width="360" height="480" fill="url(#bg)"/>
      <rect x="14" y="14" width="332" height="452" rx="14" fill="#0b0f19" stroke="url(#borderGlow)" stroke-width="2"/>
      <circle cx="180" cy="190" r="54" fill="#1e1b4b" stroke="#818cf8" stroke-width="2"/>
      <text x="180" y="208" font-size="44" text-anchor="middle">🎮</text>
      <text x="180" y="285" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="18" text-anchor="middle" letter-spacing="-0.5">${safeTitle}</text>
      <text x="180" y="315" fill="#818cf8" font-family="system-ui, sans-serif" font-weight="800" font-size="12" text-anchor="middle" letter-spacing="1.5">RETRO BOX ART</text>
      <text x="180" y="340" fill="#94a3b8" font-family="system-ui, sans-serif" font-weight="600" font-size="11" text-anchor="middle">OMNIDLE CLASSIC</text>
    </svg>`;
  }

  function getDiskCachePaths(key: string) {
    const hash = crypto.createHash("sha256").update(key).digest("hex");
    return {
      bin: path.join(CACHE_DIR, `${hash}.bin`),
      meta: path.join(CACHE_DIR, `${hash}.json`),
    };
  }

  function readFromDisk(key: string): ImageCacheEntry | null {
    try {
      const { bin, meta } = getDiskCachePaths(key);
      if (fs.existsSync(bin) && fs.existsSync(meta)) {
        const metaData = JSON.parse(fs.readFileSync(meta, "utf-8"));
        const buffer = fs.readFileSync(bin);
        return {
          buffer,
          contentType: metaData.contentType || "image/jpeg",
          timestamp: metaData.timestamp || Date.now(),
        };
      }
    } catch {}
    return null;
  }

  function writeToDisk(key: string, buffer: Buffer, contentType: string) {
    try {
      const { bin, meta } = getDiskCachePaths(key);
      fs.writeFileSync(bin, buffer);
      fs.writeFileSync(
        meta,
        JSON.stringify({ contentType, timestamp: Date.now() }, null, 2)
      );
    } catch (err) {
      console.warn("[cover-proxy] disk cache write error:", err);
    }
  }

  async function fetchUpstreamCover(url: string): Promise<{ buffer: Buffer; contentType: string } | null> {
    // Strip tracking queries for clean canonical upstream requests
    let cleanUrl = url;
    try {
      const parsed = new URL(url);
      parsed.searchParams.delete("utm_source");
      parsed.searchParams.delete("utm_campaign");
      parsed.searchParams.delete("utm_content");
      parsed.searchParams.delete("utm_medium");
      cleanUrl = parsed.toString();
    } catch {}

    const userAgents = [
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 OmniDleBot/2.1",
      "OmniDle/2.1 (https://omnidle.app; contact@omnidle.app) Node/20",
    ];

    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 9000);

        const upstream = await fetch(cleanUrl, {
          signal: controller.signal,
          headers: {
            "User-Agent": userAgents[attempt % userAgents.length],
            "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
          },
        });
        clearTimeout(timeout);

        if (upstream.ok) {
          const arrayBuffer = await upstream.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const contentType = upstream.headers.get("content-type") || "image/jpeg";
          return { buffer, contentType };
        }

        if (upstream.status === 429) {
          // Rate-limited: backoff and retry
          await new Promise((resolve) => setTimeout(resolve, 350 * (attempt + 1)));
          continue;
        }

        if (upstream.status === 404 && cleanUrl.includes("upload.wikimedia.org")) {
          // Handle renamed/moved Wikimedia files using Wikipedia Special:FilePath redirect
          const filename = cleanUrl.split("/").pop()?.split("?")[0];
          if (filename && !cleanUrl.includes("Special:FilePath")) {
            const redirectUrl = `https://en.wikipedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}`;
            const redirectUpstream = await fetch(redirectUrl, {
              headers: { "User-Agent": userAgents[0] },
              redirect: "follow",
            });
            if (redirectUpstream.ok) {
              const arrayBuffer = await redirectUpstream.arrayBuffer();
              const buffer = Buffer.from(arrayBuffer);
              const contentType = redirectUpstream.headers.get("content-type") || "image/jpeg";
              return { buffer, contentType };
            }
          }
          break;
        }
      } catch {
        if (attempt < 2) {
          await new Promise((resolve) => setTimeout(resolve, 250));
        }
      }
    }
    return null;
  }

  app.get("/api/cover-proxy", async (req, res) => {
    const rawTargetUrl = req.query.url as string;
    if (!rawTargetUrl || typeof rawTargetUrl !== "string") {
      res.status(400).send("Missing url parameter");
      return;
    }

    let normalizedKey = rawTargetUrl;
    try {
      const parsed = new URL(rawTargetUrl);
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        res.status(400).send("Invalid protocol");
        return;
      }
      parsed.searchParams.delete("utm_source");
      parsed.searchParams.delete("utm_campaign");
      parsed.searchParams.delete("utm_content");
      parsed.searchParams.delete("utm_medium");
      normalizedKey = parsed.toString();
    } catch {
      res.status(400).send("Invalid URL");
      return;
    }

    // 1. Check in-memory cache
    const memCached = coverCache.get(normalizedKey) || coverCache.get(rawTargetUrl);
    if (memCached) {
      res.setHeader("Content-Type", memCached.contentType);
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
      res.send(memCached.buffer);
      return;
    }

    // 2. Check disk cache
    const diskCached = readFromDisk(normalizedKey);
    if (diskCached) {
      if (coverCache.size >= MAX_CACHE_ENTRIES) {
        const firstKey = coverCache.keys().next().value;
        if (firstKey) coverCache.delete(firstKey);
      }
      coverCache.set(normalizedKey, diskCached);

      res.setHeader("Content-Type", diskCached.contentType);
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
      res.send(diskCached.buffer);
      return;
    }

    // 3. Deduplicate in-flight fetches so concurrent requests share a single upstream call
    let fetchPromise = inFlightFetches.get(normalizedKey);
    if (!fetchPromise) {
      fetchPromise = fetchUpstreamCover(normalizedKey)
        .finally(() => {
          inFlightFetches.delete(normalizedKey);
        });
      inFlightFetches.set(normalizedKey, fetchPromise);
    }

    try {
      const result = await fetchPromise;
      if (result) {
        const { buffer, contentType } = result;
        // Save to in-memory and disk
        if (coverCache.size >= MAX_CACHE_ENTRIES) {
          const firstKey = coverCache.keys().next().value;
          if (firstKey) coverCache.delete(firstKey);
        }
        coverCache.set(normalizedKey, { buffer, contentType, timestamp: Date.now() });
        writeToDisk(normalizedKey, buffer, contentType);

        res.setHeader("Content-Type", contentType);
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
        res.send(buffer);
        return;
      }

      // If upstream failed, serve crisp stylized SVG cover with 200 OK so image tags NEVER break
      const fallbackSvg = generateFallbackCoverSvg();
      const svgBuffer = Buffer.from(fallbackSvg, "utf-8");
      res.setHeader("Content-Type", "image/svg+xml;charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=86400");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
      res.send(svgBuffer);
    } catch {
      const fallbackSvg = generateFallbackCoverSvg();
      const svgBuffer = Buffer.from(fallbackSvg, "utf-8");
      res.setHeader("Content-Type", "image/svg+xml;charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=86400");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
      res.send(svgBuffer);
    }
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
