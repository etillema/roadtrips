# Navigatiebar Template

## Structuur

De navigatiebar bevindt zich bovenaan elke pagina en bevat:

1. **Site Titel** (links)
   - Tekst: `{{ site.title }}` (uit _config.yml)
   - Stijl: Bold, 20px, donkergroen (#1f4f2d)

2. **Navigatielinks** (rechts)
   - Uit: `site.navbar-links` (uit _config.yml)
   - Stijl: 15px, normaal gewicht
   - Hover: Groen kleur (#2f6f3e)
   - Active: Groen kleur + underline

## CSS Klassen

```scss
.navbar-custom {
  background: rgba(247, 243, 236, 0.92);    // Crème transparant
  backdrop-filter: blur(16px);               // Glasmorphism
  border-bottom: 1px solid rgba(38, 49, 38, 0.10);
  padding: 18px 24px;
  font-family: 'Source Sans 3', sans-serif;
}

.navbar-custom .navbar-brand {
  font-weight: 800;
  font-size: 20px;
  color: #1f4f2d;                            // Donkergroen
}

.navbar-custom .navbar-nav .nav-link {
  position: relative;
  color: #263126;                            // Donkerbruin
  font-weight: 500;
  font-size: 15px;
  transition: color 200ms ease;
}

.navbar-custom .navbar-nav .nav-link:hover {
  color: #2f6f3e;                            // Groen
}

.navbar-custom .navbar-nav .nav-link.active {
  color: #2f6f3e;
  // Underline added via ::after pseudo-element
}
```

## HTML Structuur (Beautiful Jekyll)

```html
<nav class="navbar navbar-expand-xl navbar-light navbar-custom">
  <a class="navbar-brand" href="{{ '' | absolute_url }}">{{ site.title }}</a>
  
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-navbar">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="main-navbar">
    <ul class="navbar-nav ml-auto">
      {% for link in site.navbar-links %}
        <li class="nav-item">
          <a class="nav-link" href="{{ link[1] | relative_url }}">{{ link[0] }}</a>
        </li>
      {% endfor %}
    </ul>
  </div>
</nav>
```

## _config.yml Configuratie

```yaml
title: Roadtrips

navbar-links:
  "Campings": "/"
  "Fietstochten": "/fietstochten/"
  "Wandelroutes": "/wandelroutes/"
  "Plaatsen": "/plaats/"
  "Musea": "/musea/"
  "Kano & SUP": "/kano-suproutes/"
```

## Kenmerken

- **Sticky positioning** — Blijft bovenaan tijdens scrollen
- **Glasmorphism effect** — Crème achtergrond met blur
- **Responsive** — Hamburger-menu op mobiel (Bootstrap navbar-toggler)
- **Moderne font** — Source Sans 3
- **Hover effect** — Kleur verandert naar groen
- **Active state** — Groene kleur + underline

## Implementatie

De navigatiebar wordt gerenderd door Beautiful Jekyll theme via de `_includes/nav.html` include, die automatisch in elke pagina wordt opgenomen via de `default` layout.

Aanpassingen voor custom styling staan in `assets/css/main.scss` onder de sectie `NAVBAR STYLING`.
