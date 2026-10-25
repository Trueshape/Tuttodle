# Regole UI dei giochi

Regole uniche per tutte le pagine di gioco. Ogni gioco nuovo o modificato le rispetta.

## 1. Slot azione unico
Sotto la barra di ricerca c'è sempre un solo pulsante grande, nella stessa posizione e con la stessa larghezza.

| Modalità | Stato | Contenuto dello slot |
|---|---|---|
| Infinite | in partita | "Arrenditi" |
| Infinite | partita finita | "Nuova partita" (stesso punto, stessa dimensione) |
| Daily | in partita | vuoto (altezza riservata, senza spostamenti) |
| Daily | partita finita | "Torna domani" con conto alla rovescia, nessun pulsante |

Componente: `src/components/ActionSlot.tsx`.

## 2. Tastiera
- Dopo ogni tentativo e dopo una nuova partita il cursore torna nella barra di ricerca.
- Invio a partita finita (Infinite) avvia la nuova partita.
- Esc svuota la ricerca.

## 3. Ordine fisso dei blocchi
Titolo, serie e record (Infinite), difficoltà e filtri (Infinite), area di gioco, contatore tentativi, barra di ricerca, slot azione, risultato e indizi.

## 4. Glossario unico
Etichette in `src/utils/uiLabels.ts`: Nuova partita, Arrenditi, Tentativi, Serie, Record, Aiuto, Torna domani. Italiano e inglese insieme.

## 5. Scheda risultato unica
Vittoria in verde, sconfitta in rosso, stesso layout: nome rivelato, dettagli, poi lo slot azione.

## Da fare dopo
- Contatori: serie e record in Infinite in tutti i giochi, con record per difficoltà dove esiste.
- Indizi: stessa regola di sblocco e posizione.
- Daily: una partita al giorno, banner "Daily completata" in tutti i giochi, ripresa dell'Infinite in corso.
