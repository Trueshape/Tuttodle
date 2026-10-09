import { LOL_QUOTES } from '../src/data/lolQuotes';
import fs from 'fs';

function getWikiPageName(id: string): string {
  const map: Record<string, string> = {
    AurelionSol: 'Aurelion_Sol',
    Belveth: "Bel'Veth",
    Chogath: "Cho'Gath",
    DrMundo: 'Dr._Mundo',
    JarvanIV: 'Jarvan_IV',
    Kaisa: "Kai'Sa",
    Khazix: "Kha'Zix",
    KogMaw: "Kog'Maw",
    KSante: "K'Sante",
    Leblanc: 'LeBlanc',
    LeeSin: 'Lee_Sin',
    MasterYi: 'Master_Yi',
    MissFortune: 'Miss_Fortune',
    MonkeyKing: 'Wukong',
    Nunu: 'Nunu_&_Willump',
    RekSai: "Rek'Sai",
    Renata: 'Renata_Glasc',
    TahmKench: 'Tahm_Kench',
    TwistedFate: 'Twisted_Fate',
    Velkoz: "Vel'Koz",
    XinZhao: 'Xin_Zhao',
  };
  return map[id] || id;
}

async function getWikiPickQuote(champId: string): Promise<string | null> {
  const page = encodeURIComponent(getWikiPageName(champId)) + '/LoL/Audio';
  const url = `https://leagueoflegends.fandom.com/api.php?action=parse&page=${page}&prop=wikitext&formatversion=2&format=json`;
  try {
    const res = await fetch(url);
    const json = await res.json();
    const wt = json.parse?.wikitext || '';
    const csIdx = wt.indexOf('Champion Select');
    if (csIdx === -1) return null;
    const chunk = wt.slice(csIdx, csIdx + 700);
    const pickSection = chunk.split(';Ban')[0];
    const match = pickSection.match(/''"([^"]+)"''/) || pickSection.match(/''([^'"]+)''/);
    if (match) return match[1].replace(/[\u200E\u200F]/g, '').trim();
    return null;
  } catch (e) {
    return null;
  }
}

async function run() {
  const results: any[] = [];
  for (let i = 0; i < LOL_QUOTES.length; i += 10) {
    const batch = LOL_QUOTES.slice(i, i + 10);
    const promises = batch.map(async (q) => {
      const wikiQuote = await getWikiPickQuote(q.championId);
      return {
        id: q.championId,
        currentEn: q.quoteEn,
        currentIt: q.quoteIt,
        wikiPickEn: wikiQuote,
        type: q.quoteTypeEn,
      };
    });
    const res = await Promise.all(promises);
    results.push(...res);
  }

  fs.writeFileSync('wiki_comparison.json', JSON.stringify(results, null, 2));

  const mismatches = results.filter((r) => {
    if (!r.wikiPickEn) return false;
    const cleanCur = r.currentEn.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanWiki = r.wikiPickEn.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleanCur !== cleanWiki;
  });

  console.log('Total checked:', results.length);
  console.log('Quotes with wiki pick:', results.filter((r) => r.wikiPickEn).length);
  console.log('Mismatches count:', mismatches.length);
  console.log('Mismatches:', JSON.stringify(mismatches, null, 2));
}

run();
