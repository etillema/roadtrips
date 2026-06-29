# Campingpagina — opzet en structuur

Dit document beschrijft de opzet van een campingpagina voor de reisblog. Elke pagina wordt gevuld vanuit een bijbehorend `.md` databestand (zie bijvoorbeeld `camping-noord-meer.md`).

---

## Lettertype

- **Alles**: Source Sans 3 (Google Fonts)
- Gewichten: 400 (body), 600 (labels, knoppen), 700 (koppen)

---

## Paginastructuur

### 1. Reviewdatum
- Klein, cursief, rechtsboven de pagina
- Bron: `review_datum`

---

### 2. Paginakop

- **Campingnaam** — groot, vetgedrukt (h1)
- **Subtitel** — regio · provincie · land (bron: `gebied`, `regio`, `land`)
- **Badges** (pill-stijl, horizontaal gecentreerd):
  - Type camping (bron: `type`) — groene badge
  - Aantal staanplaatsen in staffeling (bron: `aantal_plaatsen`):
    - < 10 plaatsen
    - 10–25 plaatsen
    - 25–50 plaatsen
    - 50–100 plaatsen
    - 100+ plaatsen
  - Keurmerk indien van toepassing, bijv. SVR-lid (bron: `kenmerken_kampeerplek`) — blauwe badge

---

### 3. Fotogalerij

- Één foto zichtbaar tegelijk, volledige breedte
- Navigatie via pijltjes links/rechts en stipjes onderaan
- Swipe-gebaar ondersteund (mobiel)
- Teller rechtsboven (bijv. "2 / 5")
- Foto's komen uit de projectmap van de camping

---

### 4. Over de camping

- Sectietitel met icoon
- Sfeer-tekst als lopende alinea (bron: `omschrijving_sfeer`, niet `beschrijving`)
- Info-pills onder de tekst voor bekende feiten:
  - Sanitair (bron: `sanitair`) — alleen indien bekend
  - Elektra (bron: `kenmerken_kampeerplek`) — alleen indien van toepassing
  - Ligging (bron: `ligging`) — alleen indien bekend

---

### 5. Voorzieningen in de buurt

Drie kolommen naast elkaar:

| Kolom | Inhoud |
|-------|--------|
| Bakker | Naam, adres, Google Maps-knop |
| Supermarkt | Naam, adres, Google Maps-knop |
| Restaurants | Meerdere items mogelijk: naam, adres, Google Maps-knop |

- Bron: `voorzieningen`
- Als info ontbreekt: "Niet bekend" tonen in de kaart
- Google Maps-knop mag bij voorzieningen wél — dit is praktische routeinfo

---

### 6. Contact & locatie

Twee kolommen naast elkaar:

**Links — contactkaart:**
- Adres (bron: `adres`)
- Telefoon (bron: `telefoon`)
- E-mail (bron: `email`, indien aanwezig)
- Website (bron: `website`) — klikbare link

**Rechts — kaart:**
- Google Maps embed (iframe)
- Embed-code handmatig toevoegen per camping

---

### 7. Activiteiten in de omgeving

Uitklapkaarten (accordion), één per categorie, paginabrede opmaak.

**Categorieën en iconen:**

| Categorie | Icoon (Tabler) | Kleur |
|-----------|---------------|-------|
| Wandelen | `ti-walk` | groen |
| Fietsen | `ti-bike` | blauw |
| Kano & SUP | `ti-kayak` | paars |
| Leuke plaatsjes & stadjes | `ti-tower` | warm oranje |
| Musea | `ti-building-bank` | terracotta |

**Per activiteit binnen een kaart:**
- Naam van de activiteit of locatie
- Korte beschrijving met eventuele afstand
- **Interne link** ("Meer info"-knop) — alleen tonen als er een eigen pagina beschikbaar is binnen de website
- Geen externe links
- Geen Google Maps-links

---

## Databron

Elke campingpagina wordt gevuld vanuit een `.md` bestand met YAML front matter. Relevante velden:

```yaml
naam:
locatie:
  plaats:
  regio:
  gebied:
  land:
adres:
website:
telefoon:
type:
aantal_plaatsen:
omschrijving_sfeer:
ligging:
sanitair:
kenmerken_kampeerplek:
voorzieningen:
  winkels:
    - naam:
      type:          # bakker | supermarkt | restaurant
      afstand:
      adres:
      site:          # Google Maps link
activiteiten:
  wandelen:
  fietsen:
  kano_en_sup:
  plaatsen_en_dorpen:
  musea:
    - titel:
      beschrijving:
      afstand_km:
      interne_url:   # alleen invullen als eigen pagina beschikbaar is
review_datum:
```

---

## Noten

- Eigenaars worden **niet** vermeld op de pagina
- Kenmerkinfo (elektra, caravan/tent/camper) wordt **niet** als lijst getoond — alleen elektra als info-pill indien van toepassing
- Bij activiteiten: alleen interne links, nooit externe websites of Google Maps
- Bij voorzieningen (bakker, supermarkt, restaurant): Google Maps-links zijn wél toegestaan
