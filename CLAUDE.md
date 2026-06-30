# CLAUDE.md — Roadtrips

## Over dit project

Een Jekyll-website voor het bijhouden van roadtrip-informatie in Noord-West Europa: campings, fietstochten, wandelroutes, kano- en suproutes, plaatsen en musea. Dekt Nederland, Duitsland, België, Frankrijk, Luxemburg, Oostenrijk en omliggende landen. Items zijn onderling gekoppeld op basis van land en regio. Elke detailpagina toont een Google Maps-kaartje en aanbevelingen voor andere items in dezelfde regio.

## Werkwijze met Claude Code

- **Geen automatische commits**: wijzigingen worden NIET automatisch gecommit. Vraag expliciet om een commit met `commit` als je wilt dat wijzigingen worden opgeslagen in git.
- **`make serve` en `jekyll serve` zijn taboe voor Claude**: Start deze zelf in de terminal met `make serve` of `bundle exec jekyll serve`. Claude voert deze commands NIET uit.

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
| Taal            | Nederlands (nl)                        |
| Theme           | Beautiful Jekyll Theme (gem)           |
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

## Camping met activiteiten toevoegen

Wanneer je een YAML bestand met een camping en bijbehorende activiteiten toevoegt:

1. **Maak eerst de Markdown bestanden voor alle activiteiten** in de bijbehorende collecties:
   - `_wandelroutes/naam.md` voor wandelroutes
   - `_fietstochten/naam.md` voor fietstochten
   - `_kano_suproutes/naam.md` voor kano/SUP routes
   - `_plaats/naam.md` voor plaatsen en dorpen
   - `_musea/naam.md` voor musea

2. **Voeg interne links toe in de camping's activiteiten sectie**:
   - Gebruik `interne_url` (niet `url`) voor links naar eigen pagina's
   - Zorg dat de pad exact overeenkomt met de bestandsnaam (zonder `.md` extensie)
   - Voorbeeld: `_wandelroutes/durch-das-habichtstal.md` → `/wandelroutes/durch-das-habichtstal/`

3. **Template link structuur**:
   ```yaml
   activiteiten:
     wandelen:
       - titel: "Wandeling Habichtstal"
         beschrijving: "..."
         afstand_km: 0
         interne_url: "/wandelroutes/durch-das-habichtstal/"
     fietsen:
       - titel: "Weser-Radweg"
         beschrijving: "..."
         afstand_km: 0
         interne_url: "/fietstochten/weser-radweg-hoexter-hameln/"
   ```

4. **Zorg dat ook de plaatsen-pagina's interne links hebben** naar relevante activiteiten (gebruik `interne_url` in hun `activiteiten` sectie)

5. **Voeg externe links toe aan activiteitenpagina's**:
   - Elke activiteitenpagina kan een `url` veld hebben met een link naar een externe website
   - Dit kan zijn: OutdoorActive, website van het museum/attractie, Google Maps link, etc.
   - **Als de externe URL niet bekend is, vraag ernaar aan de gebruiker** (vraag niet zomaar aan om het in te vullen - wacht op antwoord)
   - Voorbeeld in front matter:
   ```yaml
   url: "https://www.outdooractive.com/de/route/wanderung/..."
   ```

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
      url: ""                  # (optioneel) link naar website/reservering
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
      url: ""                 # externe URL
      interne_url: ""         # interne URL naar eigen pagina
      fotos: []                # (optioneel) foto's
  wandelen:
    - titel: ""
      beschrijving: ""
      afstand_km: 0
      url: ""                 # externe URL
      interne_url: ""         # link naar wandelroute pagina: /wandelroutes/...
      fotos: []
  fietsen:
    - titel: ""
      beschrijving: ""
      afstand_km: 0
      url: ""                 # externe URL
      interne_url: ""         # link naar fietstocht pagina: /fietstochten/...
      fotos: []
  kano_en_sup:
    - titel: ""
      beschrijving: ""
      afstand_km: 0
      url: ""                 # externe URL
      interne_url: ""         # link naar kano/sup route pagina: /kano-suproutes/...
      fotos: []
  plaatsen_en_dorpen:
    - titel: ""
      beschrijving: ""
      afstand_km: 0
      url: ""                 # externe URL
      interne_url: ""         # link naar plaats pagina: /plaats/...
      fotos: []
  musea:
    - titel: ""
      beschrijving: ""
      afstand_km: 0
      url: ""                 # externe URL
      interne_url: ""         # link naar museum pagina: /musea/...
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
    url: ""                    # externe URL
    interne_url: ""            # interne URL naar plaats/attractie pagina

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
    url: ""                    # externe URL
    interne_url: ""            # interne URL naar plaats/attractie pagina

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

activiteiten:                  # (optioneel) koppelingen naar relevante routes en activiteiten
  wandelen:
    - titel: ""
      beschrijving: ""
      afstand_km: 0
      interne_url: ""         # link naar wandelroute pagina: /wandelroutes/...
  fietsen:
    - titel: ""
      beschrijving: ""
      afstand_km: 0
      interne_url: ""         # link naar fietstocht pagina: /fietstochten/...
  kano_en_sup:
    - titel: ""
      beschrijving: ""
      afstand_km: 0
      interne_url: ""         # link naar kano/sup route pagina: /kano-suproutes/...

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

activiteiten:                  # (optioneel) koppelingen naar relevante routes en plaatsen
  plaatsen_en_dorpen:
    - beschrijving: ""
      afstand_km: 0
      url: ""                  # externe URL
      interne_url: ""          # link naar plaats pagina: /plaats/...

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
    url: ""                    # externe URL
    interne_url: ""            # interne URL naar plaats/attractie pagina

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
| `beautiful-jekyll-theme` | Theme: layout, navigatie, typografie     |
| `jekyll-feed`          | RSS-feed genereren                          |
| `jekyll-seo-tag`       | SEO-metatags (title, description, og:*)     |
| `jekyll-include-cache` | Performance: include-caching                |

GitHub Actions is vereist voor automatische build & deploy.

## Voor livegang

- [ ] **Stel `url` in `_config.yml`** in op het definitieve domein, bijv. `https://jouw-naam.github.io`
- [ ] **Stel `baseurl` in** — laat leeg (`""`) voor een organisatie/gebruikerspagina (`naam.github.io`); zet op `"/repo-naam"` voor een projectpagina (`naam.github.io/repo-naam`)
- [ ] Activeer GitHub Pages in de repository-instellingen: **Settings → Pages → Source → GitHub Actions**
- [ ] Voeg echte afbeeldingen toe aan `assets/images/`
- [ ] Verwijder of vervang de voorbeelditems door echte content

## Conventies

- Gebruik **geen emojis of icoontjes** in content, templates, navigatie of YAML-velden. De site heeft een zakelijke, informatieve toon — tekst en typografie doen het werk.

## URL's en baseurl

**BELANGRIJK**: Dit project gebruikt `baseurl: "/roadtrips"` voor GitHub Pages. Alle relatieve URL's (links naar detail pagina's, afbeeldingen, CSS/JS bestanden) MOETEN de baseurl meenemen.

### Regels voor URL's in templates:

1. **Detail page links**: Gebruik altijd `{{ item.url | relative_url }}`
   ```liquid
   <a href="{{ camping.url | relative_url }}" class="item-card">
   ```

2. **Afbeelding URLs**: Gebruik altijd `{{ image_path | relative_url }}`
   ```liquid
   <img src="{{ camping.fotos[0] | relative_url }}" alt="...">
   ```

3. **CSS/JS/Asset paths**: Gebruik altijd `{{ site.baseurl }}/assets/...` of `| relative_url`
   ```liquid
   <link rel="stylesheet" href="{{ site.baseurl }}/assets/css/main.css">
   <script src="{{ site.baseurl }}/assets/js/script.js"></script>
   ```

4. **Filter links**: Voeg `site.baseurl` toe aan base_url
   ```liquid
   {% assign base_url = site.baseurl | append: page.url | split: '?' | first %}
   ```

### Waarom?

- **Lokaal** (localhost:4000): baseurl is leeg, dus URL's werken zonder prefix
- **GitHub Pages** (/roadtrips): baseurl moet `/roadtrips` zijn, dus alle relatieve URL's moeten dit meenemen

De `relative_url` filter voegt automatisch de baseurl toe aan URL's die met `/` beginnen. Dit is de standaard Jekyll-manier en werkt op beide omgevingen.

## Stijl aanpassen

Beautiful Jekyll Theme gebruikmaken van custom CSS via `_config.yml`:

```yaml
site-css:
  - "/assets/css/main.css"
```

Eigen stijlen toevoegen in `assets/css/main.css` of `assets/css/main.scss`.
