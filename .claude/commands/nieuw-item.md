# Nieuw item aanmaken

Maak een nieuw collectie-item aan voor de roadtrips-website. De JSON-schema's in `schema/` zijn de enige bron van waarheid — gebruik geen templates.

## Stap 1: Bepaal het type

Als `$ARGUMENTS` één van de volgende waarden bevat, gebruik die direct. Anders vraag je de gebruiker welk type:

| Argument      | Collectie          | Schema                          |
|---------------|--------------------|---------------------------------|
| camping       | `_campings/`       | `schema/camping-schema.json`    |
| fietstocht    | `_fietstochten/`   | `schema/fietsroute-schema.json` |
| wandelroute   | `_wandelroutes/`   | `schema/wandelroute-schema.json`|
| kano          | `_kano_suproutes/` | `schema/kano-en-sup-schema.json`|
| sup           | `_kano_suproutes/` | `schema/kano-en-sup-schema.json`|
| plaats        | `_plaats/`         | `schema/plaats-schema.json`     |
| museum        | `_musea/`          | `schema/museum-schema.json`     |

## Stap 2: Lees de schema's

Lees het schema voor het gekozen type én `schema/defs.json`. Gebruik de `required`-array en `properties` om te weten welke velden verplicht zijn en welke typen/enum-waarden gelden.

## Stap 3: Stel vragen aan de gebruiker

Doorloop alle velden in volgorde. Stel per veld precies één vraag. Regels:

- **Verplichte velden** (`required`): altijd vragen, herhaal tot je een waarde hebt.
- **Optionele velden**: vermeld dat het optioneel is. Bij lege invoer of "n/a" of "–": veld weglaten uit de YAML.
- **Enum-waarden**: presenteer de geldige opties expliciet, bijv. `[naturcamping | minicamping | familiecamping | glamping | camperplaats]`.
- **Array-velden** (horeca, bezienswaardigheden, activiteiten, etc.): vraag of de gebruiker items wil toevoegen. Per item de sub-velden doorlopen. Herhaal voor elk volgend item. Stop als de gebruiker "klaar" of "stop" zegt.
- **Boolean-velden**: vraag "ja/nee", vertaal naar `true`/`false`.
- **Datum-velden** (`review_datum`): stel voor vandaag (2026-05-15) als default, overneembaar met Enter.
- **Locatie-veld** (`locatie`): vraag `plaats`, `regio`, `land` (verplicht) en `gebied` (optioneel) apart.

Stel géén vragen over `foto` of `gpx_bestand` — laat deze velden weg tenzij de gebruiker ze zelf noemt.

## Stap 4: Bepaal de bestandsnaam

Zet de waarde van `naam` om naar kebab-case voor de bestandsnaam, bijv. `"De Waard"` → `de-waard.md`. Vraag dit niet aan de gebruiker.

## Stap 5: Schrijf het bestand

Schrijf het bestand naar de juiste collectiemap. Formaat:

```
---
[alle ingevulde velden als geldige YAML]
---
```

Regels voor de YAML-output:
- Alleen velden opnemen die een waarde hebben (geen lege strings, geen lege arrays, geen null).
- Gebruik block scalar (`>`) voor lange tekstvelden zoals `beschrijving` en `omschrijving_*`.
- Gebruik de exacte veldnamen uit het schema.
- Geen `title`-veld — dat bestaat niet in de schema's.

## Stap 6: Valideer

Voer na het schrijven de volgende validatie uit:

```bash
python verify-schema.py <pad-naar-nieuw-bestand>
```

Als er validatiefouten zijn: toon ze aan de gebruiker en bied aan het bestand te corrigeren. Als alles klopt: meld dat het bestand aangemaakt en gevalideerd is.
