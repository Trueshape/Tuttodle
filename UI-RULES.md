# Regole UI dei giochi

Riferimento: **Cover** e **Specs dei videogiochi**. Ogni gioco nuovo o modificato li segue.

## 1. Riga tentativi (come Cover)
Sopra l'area di gioco c'è una riga con:
- a sinistra i quadratini dei tentativi 1..N (✓ verde, ✕ rosso, quello corrente pulsa); nei giochi senza massimo un contatore "Tentativi: n";
- a destra un solo pulsante, sempre nello stesso punto e con la stessa larghezza (`w-28`).

| Modalità | Stato | Pulsante |
|---|---|---|
| Infinite | in partita | "Arrenditi" |
| Infinite | partita finita | "Nuova partita" (stesso punto) |
| Daily | in partita | nessuno |
| Daily | partita finita | "Torna domani" |

Componente: `src/components/AttemptsRow.tsx`.

## 2. Barra in alto in Infinite (come Specs)
Nei giochi con filtri o difficoltà: scheda "Filtri" con il conteggio a destra e il pulsante "Nuova partita", poi la riga della difficoltà.

## 3. Record e punti
Nella riga del titolo, a destra, in Infinite (come Cover).

## 4. Tastiera
- Dopo ogni tentativo e dopo una nuova partita il cursore torna nella barra di ricerca.
- Invio a partita finita (Infinite) avvia la nuova partita.
- Esc svuota la ricerca.

## 5. Ordine fisso dei blocchi
Titolo, record e punti, barra filtri e difficoltà, riga tentativi, area di gioco, ricerca, risultato e indizi.

## 6. Glossario unico
Etichette in `src/utils/uiLabels.ts`: Nuova partita, Arrenditi, Tentativi, Serie, Record, Aiuto, Torna domani. Italiano e inglese insieme.

## 7. Scheda risultato unica
Vittoria in verde, sconfitta in rosso: nome rivelato, dettagli. Componente: `src/components/ResultCard.tsx`.

## 8. Lista giochi
Cover e Specs usano la stessa lista di giochi (solo con copertina): `src/hooks/usePlayableGames.ts`.

## Da fare dopo
- Punteggi e tentativi uniformi (da confermare).
- Indizi: stessa regola di sblocco e posizione.
- Daily: banner "Daily completata" in tutti i giochi.
