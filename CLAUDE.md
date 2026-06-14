# CLAUDE.md — Roadtrips

## Over dit project

Een Jekyll-website voor het bijhouden van roadtrip-informatie in Noord-West Europa: campings, fietstochten, wandelroutes, kano- en suproutes, plaatsen en musea. Dekt Nederland, Duitsland, België, Frankrijk, Luxemburg, Oostenrijk en omliggende landen. Items zijn onderling gekoppeld op basis van land en regio. Elke detailpagina toont een Google Maps-kaartje en aanbevelingen voor andere items in dezelfde regio.

## Werkwijze met Claude Code

- **Geen automatische commits**: wijzigingen worden NIET automatisch gecommit. Vraag expliciet om een commit met `commit` als je wilt dat wijzigingen worden opgeslagen in git.

## Data beheer: Markdown → HTML

Alle items worden rechtstreeks als Markdown-bestanden aangemaakt in de juiste collectiemap, met alle gegevens als front matter. Er is geen aparte YAML-backup — de `.md` file is de enige bron van waarheid.

### 1. Markdown: Volledige data in front matter
- Campings → `_campings/naam.md`
- Fietstochten → `_fietstochten/naam.md`
- Wandelroutes → `_wandelroutes/naam.md`
- Kano- en suproutes → `_kano_suproutes/naam.md`
- Plaatsen → `_plaats/naam.md`
- Musea → `_musea/naam.md`
- **BELANGRIJK**: Alle velden (inclusief geneste arrays/objecten) volledig invullen. Niets weglaten.

### 2. Markdown → HTML: Volledige rendering
- Het template `_layouts/item.html` rendert **ALLE front-matter velden** in de HTML
- **BELANGRIJK**: Geen veld mag verborgen of weggelaten worden
- Zorg voor duidelijke labels/titels zodat alle informatie goed zichtbaar is

### 3. HTML-layout: Volledige weergave
- De HTML-pagina's moeten alle informatie duidelijk, gestructureerd en compleet weergeven
- Pas de CSS/layout aan zodat alle data-velden goed zichtbaar en leesbaar zijn
- Geen informatie mag verborgen zijn achter knoppen, collapsibles of andere verberging

## Technische keuzes

| Keuze           | Waarde                                 |
|-----------------|----------------------------------------|
| Jekyll versie   | 4.3                                    |
| Deployment      | GitHub Actions                         |
| Content formaat | Markdown met front matter (collections)|
| Taal            | Nederlands (nl) + Engels (mogelijk)     |
| Theme           | Minimal Mistakes (gem)                 |
| Tags            | Categorie-specifiek (kenmerken / thema)|
| Meertalig       | Nee (maar multi-land/multi-regio)      |
| Regio's         | Noord-West Europa                      |

## Projectstructuur

```
roadtrips/
├── _config.yml
├── Gemfile
├── .gitignore
├── index.md
├── campings.html
├── fietstochten.html
├── wandelroutes.html
├── plaats.html
├── musea.html
├── zoeken.html
├── _campings/
├── _fietstochten/
├── _wandelroutes/
├── _kano_suproutes/
├── _plaats/
├── _musea/
├── _data/
│   └── navigation.yml
├── _layouts/
│   └── item.html
├── _includes/
│   ├── google-maps.html
│   ├── in-de-buurt.html
│   └── horeca-links.html
├── assets/
│   ├── css/main.scss
│   └── images/
└── .github/workflows/jekyll.yml
```

## Nieuw item toevoegen

### Stap-voor-stap:

1. **Stap 1: Maak Markdown collectie-bestand**
   - Bestand gaat naar: `_campings/naam.md`, `_plaats/naam.md`, etc.
   - Gebruik de template uit `/templates/` als basis
   - Vul ALLE niet optionele velden in, optionele velden die niet gevuld zijn, weg laten.

2. **Stap 3: Build en test**
   ```bash
   make serve
   ```
   Controleer dat de HTML pagina alle content bevat.

### Controlelijst (NIET overslaan!):

- [ ] Markdown bestand aangemaakt in juiste collectie (`_campings/`, `_plaats/`, etc.)
- [ ] Alle velden volledig ingevuld (lege strings `""` of lege arrays `[]` zijn OK)
- [ ] HTML pagina bevat ALLE beschrijvingen en details

## Front matter templates per categorie

De volledige, geannoteerde templates staan in de map `/templates/`. Zie daar voor de meest actuele versie.

### Camping (`_campings/`, bron: `/templates/template-camping.yml`)

```yaml
---
naam: "Naam van de camping"
title: "Naam van de camping"

locatie:
  plaats: "Plaatsnaam"
  regio: "Provincienaam"       # Zie regio-indeling hieronder
  gebied: ""                   # (optioneel) specifiekere streek, bijv. Hogeland, Eifel
  land: "Nederland"

adres: "Straat 1, 1234 AB Plaats"
website: "https://..."
telefoon: "+31 ..."
email: ""                      # (optioneel)

type: "naturcamping"           # naturcamping | minicamping | familiecamping | glamping | camperplaats
aantal_plaatsen: 0

beschrijving: >
  Korte beschrijving (2-3 zinnen) voor de overzichtspagina.

omschrijving_sfeer: >
  Uitgebreidere sfeeromschrijving.

ligging: ""                    # water | bosrand | bos | meer | rivier | bergen | dorp | platteland | kust

kenmerken_kampeerplek:
  - ""                         # bijv. "ruime plekken zonder paaltjes"

sanitair: >
  Beschrijving van het sanitair.

voorzieningen:
  broodjesservice: false
  zwemgelegenheid: false
  horeca_op_camping:
    - naam: ""
      type: ""                 # restaurant | koffie | snackbar
      opmerking: ""
  winkels:
    - naam: ""
      type: ""                 # supermarkt | bakker | drogist | etc.
      site: ""                 # (optioneel) Google Maps link
      afstand: ""              # bijv. "5 km"
  horeca_in_de_buurt:
    - naam: ""
      type: ""                 # restaurant | koffie
      plaats: ""
      afstand: ""              # bijv. "8 km"
      opmerking: ""

activiteiten:
  algemeen:
    - titel: ""                # (optioneel) titel van de activiteit
      beschrijving: ""
      afstand_km: 0           # (optioneel) afstand van camping naar startpunt
      url: ""
      fotos: []                # (optioneel) foto's
  wandelen:
    - titel: ""
      beschrijving: ""
      afstand_km: 0
      url: ""
      fotos: []
  fietsen:
    - titel: ""
      beschrijving: ""
      afstand_km: 0
      url: ""
      fotos: []
  kano_en_sup:
    - titel: ""
      beschrijving: ""
      afstand_km: 0
      url: ""
      fotos: []
  plaatsen_en_dorpen:
    - titel: ""
      beschrijving: ""
      afstand_km: 0
      url: ""
      fotos: []
  musea:
    - titel: ""
      beschrijving: ""
      afstand_km: 0
      url: ""
      fotos: []

fotos:                         # (optioneel) foto's van de camping
  - "/assets/images/campings/bestandsnaam.jpg"
review_datum: "2026-05-12"     # (optioneel) datum van laatste review
---
```

### Fietstocht (`_fietstochten/`, bron: `/templates/template-fietstocht.yml`)

```yaml
---
naam: "Naam van de tocht"
title: "Naam van de tocht"

locatie:
  plaats: "Startplaats"
  regio: "Provincienaam"
  gebied: ""                   # (optioneel) specifiekere streek
  land: "Nederland"

startpunt: "Omschrijving startpunt"
eindpunt: ""                   # (optioneel) alleen bij A-naar-B

afstand_km: 35
type: "rondrit"                # rondrit | A-naar-B
ondergrond: "fietspad"         # verhard | onverhard | fietspad | openbare weg | mix

beschrijving: >
  Korte beschrijving (2-3 zinnen) voor de overzichtspagina.

omschrijving_route: >
  Uitgebreidere beschrijving van de route.

bezienswaardigheden_onderweg:
  - beschrijving: ""
    url: ""

gpx_bestand: "/assets/gpx/bestandsnaam.gpx"
route_url: ""

horeca:
  - naam: ""
    type: ""                   # restaurant | koffie
    plaats: ""
    url: ""
    opmerking: ""

fotos:                         # (optioneel) foto's
  - "/assets/images/fietstochten/bestandsnaam.jpg"
review_datum: "2026-05-12"     # (optioneel) datum van laatste review
---
```

### Wandelroute (`_wandelroutes/`, bron: `/templates/template-wandelroute.yml`)

```yaml
---
naam: "Naam van de route"
title: "Naam van de route"

locatie:
  plaats: "Startplaats"
  regio: "Provincienaam"
  gebied: ""                   # (optioneel) specifiekere streek
  land: "Nederland"

startpunt: "Omschrijving startpunt"
eindpunt: ""                   # (optioneel) alleen bij lijnwandelingen

afstand_km: 14
duur_uren: 3.5
type: "rondwandeling"          # rondwandeling | lijnwandeling
ondergrond: "onverhard"        # verhard | onverhard | bospad | zandpad | mix

beschrijving: >
  Korte beschrijving (2-3 zinnen) voor de overzichtspagina.

omschrijving_route: >
  Uitgebreidere beschrijving van de route.

bezienswaardigheden_onderweg:
  - beschrijving: ""
    url: ""

gpx_bestand: "/assets/gpx/bestandsnaam.gpx"
route_url: ""

ov_tip: ""                     # (optioneel) OV-suggestie bij lijnwandelingen

horeca:
  - naam: ""
    type: ""                   # restaurant | koffie
    plaats: ""
    url: ""
    opmerking: ""

fotos:                         # (optioneel) foto's
  - "/assets/images/wandelroutes/bestandsnaam.jpg"
review_datum: "2026-05-12"     # (optioneel) datum van laatste review
---
```

### Plaats of stad (`_plaats/`, bron: `/templates/template-plaats.yml`)

```yaml
---
naam: "Plaatsnaam"
title: "Plaatsnaam"

locatie:
  plaats: "Plaatsnaam"
  regio: "Provincienaam"
  land: "Nederland"

website: "https://..."

type: "dorp"                   # dorp | stad | gehucht

bezienswaardigheden:
  - "Bezienswaardigheid 1"

horeca: []

beschrijving: >
  Korte beschrijving voor de overzichtspagina.

fotos:                         # (optioneel) foto's
  - "/assets/images/plaats/bestandsnaam.jpg"
review_datum: "2026-05-12"     # (optioneel) datum van laatste review
---
```

### Museum (`_musea/`, bron: `/templates/template-musea.yml`)

```yaml
---
naam: "Naam van het museum"
title: "Naam van het museum"

locatie:
  plaats: "Plaatsnaam"
  regio: "Provincienaam"
  land: "Nederland"

adres: "Straat 1, 1234 AB Plaats"
website: "https://..."

thema:
  - geschiedenis
  - kunst

openingstijden: "di–zo 10:00–17:00"
toegangsprijs: "12,00 euro"

horeca: []

beschrijving: >
  Korte beschrijving voor de overzichtspagina.

fotos:                         # (optioneel) foto's
  - "/assets/images/musea/bestandsnaam.jpg"
review_datum: "2026-05-12"     # (optioneel) datum van laatste review
---
```

### Kano- of suproute (`_kano_suproutes/`, bron: `/templates/template-kano-en-sup.yml`)

```yaml
---
naam: "Naam van de route"
title: "Naam van de route"

locatie:
  plaats: "Startplaats"
  regio: "Provincienaam"
  gebied: ""                   # (optioneel) specifiekere streek
  land: "Nederland"

instapplaats: ""               # waar ga je het water op (steiger, strand, botenhelling, etc.)
uitstapplaats: ""              # (optioneel) alleen bij A-naar-B

afstand_km: 18
duur_uren: 4
type: "rondvaart"              # rondvaart | A-naar-B
type_water: "rivier"           # rivier | kanaal | meer | plas | zee | mix
stroming: "geen"               # geen | licht | matig | sterk

beschrijving: >
  Korte beschrijving (2-3 zinnen) voor de overzichtspagina.

omschrijving_route: >
  Uitgebreidere beschrijving van de route.

verhuur:
  - naam: ""
    type: ""                   # kano | sup | kajak | sloep
    plaats: ""
    url: ""
    opmerking: ""

bezienswaardigheden_onderweg:
  - beschrijving: ""
    url: ""

gpx_bestand: ""
route_url: ""

horeca:
  - naam: ""
    type: ""                   # restaurant | koffie
    plaats: ""
    url: ""
    opmerking: ""

fotos:                         # (optioneel) foto's
  - "/assets/images/kano-en-sup/bestandsnaam.jpg"
review_datum: "2026-05-12"     # (optioneel) datum van laatste review
---
```

## Regio-indeling

Gebruik een consistente regio-indeling per land — dit is de basis voor de "Meer in [regio]"-koppelingen:

| Land        | Gebruik                        | Voorbeelden                                                          |
|-------------|--------------------------------|----------------------------------------------------------------------|
| Nederland   | Provincienaam                  | Friesland, Drenthe, Gelderland, Noord-Holland, Limburg              |
| Duitsland   | Bundesland of streek           | Niedersachsen, Nordrhein-Westfalen, Hessen, Bayern, Schleswig-Holstein, Eifel, Schwarzwald |
| België      | Provincie                      | West-Vlaanderen, Oost-Vlaanderen, Vlaams-Brabant, Luik, Limburg     |
| Frankrijk   | Regio (région)                 | Bretagne, Normandie, Occitanie, Auvergne-Rhône-Alpes, Dordogne    |
| Luxemburg   | Canton of landstreek           | Luxemburg-Stad, Ardenne, Eifel (grensgebied)                       |
| Oostenrijk  | Bundesland                     | Tirol, Salzburgerland, Vorarlberg, Oberösterreich, Steiermark      |

## Afbeeldingen

Bewaar afbeeldingen in de bijbehorende submap:

```
assets/images/campings/
assets/images/fietstochten/
assets/images/wandelroutes/
assets/images/kano-en-sup/
assets/images/plaats/
assets/images/musea/
```

Gebruik beschrijvende bestandsnamen in kebab-case, bijv. `de-waard.jpg`.

## Lokaal draaien

```bash
bundle install
bundle exec jekyll serve
```

Open daarna [http://localhost:4000](http://localhost:4000).

## Plugins en dependencies

| Gem                    | Doel                                        |
|------------------------|---------------------------------------------|
| `minimal-mistakes-jekyll` | Theme: layout, navigatie, typografie     |
| `jekyll-feed`          | RSS-feed genereren                          |
| `jekyll-seo-tag`       | SEO-metatags (title, description, og:*)     |
| `jekyll-include-cache` | Vereist door Minimal Mistakes               |

GitHub Actions is vereist — de `minimal-mistakes-jekyll` gem is niet whitelisted voor klassieke GitHub Pages.

## Voor livegang

- [ ] **Stel `url` in `_config.yml`** in op het definitieve domein, bijv. `https://jouw-naam.github.io`
- [ ] **Stel `baseurl` in** — laat leeg (`""`) voor een organisatie/gebruikerspagina (`naam.github.io`); zet op `"/repo-naam"` voor een projectpagina (`naam.github.io/repo-naam`)
- [ ] Activeer GitHub Pages in de repository-instellingen: **Settings → Pages → Source → GitHub Actions**
- [ ] Voeg echte afbeeldingen toe aan `assets/images/`
- [ ] Verwijder of vervang de voorbeelditems door echte content

## Conventies

- Gebruik **geen emojis of icoontjes** in content, templates, navigatie of YAML-velden. De site heeft een zakelijke, informatieve toon — tekst en typografie doen het werk.

## Stijl aanpassen

Het Minimal Mistakes skin wordt ingesteld via `_config.yml`:

```yaml
minimal_mistakes_skin: default   # opties: air, aqua, contrast, dark, dirt, mint, neon, plum, sunrise
```

Eigen stijlen toevoegen in `assets/css/main.scss` — onderaan het bestand, na de `@import`-regels.
