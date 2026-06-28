---
layout: default
title: Roadtrips
---

<div class="home-header">
  <div class="home-header-content">
    <h1>Roadtrips Noord-West Europa</h1>
    <p>Ontdek campings, fietstochten, wandelroutes en meer</p>
  </div>
</div>

<main class="home-main">
  <!-- Countries/Landen -->
  <section class="countries-section">
    <h2>Kies je bestemming</h2>
    <div class="countries-grid">
      <button class="country-btn active" data-country="all">🌍 Alles</button>
      <button class="country-btn" data-country="Nederland">🇳🇱 Nederland</button>
      <button class="country-btn" data-country="Duitsland">🇩🇪 Duitsland</button>
      <button class="country-btn" data-country="België">🇧🇪 België</button>
      <button class="country-btn" data-country="Frankrijk">🇫🇷 Frankrijk</button>
      <button class="country-btn" data-country="Luxemburg">🇱🇺 Luxemburg</button>
      <button class="country-btn" data-country="Oostenrijk">🇦🇹 Oostenrijk</button>
    </div>
  </section>

  <!-- Regions/Regio's -->
  <section class="regions-section">
    <h2>Kies een regio</h2>
    <div class="regions-grid" id="regionsContainer">
      <!-- Dynamisch gevuld met JavaScript -->
    </div>
  </section>

  <!-- Categories -->
  <section class="categories-showcase">
    <h2>Of kies direct een categorie</h2>
    
    <div class="category-tiles">
      <a href="/campings/" class="category-tile">
        <div class="tile-icon">🏕️</div>
        <h3>Campings</h3>
        <p class="tile-count">{{ site.campings.size }} plekken</p>
      </a>

      <a href="/fietstochten/" class="category-tile">
        <div class="tile-icon">🚴</div>
        <h3>Fietstochten</h3>
        <p class="tile-count">{{ site.fietstochten.size }} routes</p>
      </a>

      <a href="/wandelroutes/" class="category-tile">
        <div class="tile-icon">🥾</div>
        <h3>Wandelroutes</h3>
        <p class="tile-count">{{ site.wandelroutes.size }} routes</p>
      </a>

      <a href="/plaats/" class="category-tile">
        <div class="tile-icon">🏘️</div>
        <h3>Plaatsen & Steden</h3>
        <p class="tile-count">{{ site.plaats.size }} plaatsen</p>
      </a>

      <a href="/musea/" class="category-tile">
        <div class="tile-icon">🎨</div>
        <h3>Musea</h3>
        <p class="tile-count">{{ site.musea.size }} musea</p>
      </a>

      <a href="/kano-suproutes/" class="category-tile">
        <div class="tile-icon">🚣</div>
        <h3>Kano & SUP</h3>
        <p class="tile-count">{{ site.kano_suproutes.size }} routes</p>
      </a>
    </div>
  </section>

  <section class="home-tagline">
    <h2>Buiten is het mooiste 🌳</h2>
    <p>Maak herinneringen, ontdek nieuwe plekken en geniet van de natuur in Noord-West Europa.</p>
  </section>
</main>

<script>
// Regio's per land
const regions = {
  "Nederland": ["Friesland", "Drenthe", "Gelderland", "Noord-Holland", "Utrecht", "Flevoland", "Overijssel", "Limburg", "Noord-Brabant", "Zeeland", "Groningen"],
  "Duitsland": ["Niedersachsen", "Nordrhein-Westfalen", "Hessen", "Bayern", "Schleswig-Holstein", "Baden-Württemberg", "Eifel", "Schwarzwald", "Rheinland-Pfalz"],
  "België": ["West-Vlaanderen", "Oost-Vlaanderen", "Vlaams-Brabant", "Luik", "Limburg", "Hainaut", "Namur"],
  "Frankrijk": ["Bretagne", "Normandie", "Occitanie", "Auvergne-Rhône-Alpes", "Dordogne", "Nouvelle-Aquitaine"],
  "Luxemburg": ["Luxemburg-Stad", "Ardenne", "Eifel"],
  "Oostenrijk": ["Tirol", "Salzburgerland", "Vorarlberg", "Oberösterreich", "Steiermark"]
};

// Initialize regions on page load
function initializeRegions() {
  const selected = document.querySelector('.country-btn.active').dataset.country;
  updateRegions(selected);
}

// Update regions when country is clicked
document.querySelectorAll('.country-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.country-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    updateRegions(this.dataset.country);
  });
});

function updateRegions(country) {
  const container = document.getElementById('regionsContainer');
  container.innerHTML = '';
  
  let regionsToShow = [];
  if (country === 'all') {
    Object.values(regions).forEach(r => regionsToShow = regionsToShow.concat(r));
  } else {
    regionsToShow = regions[country] || [];
  }
  
  regionsToShow.forEach(region => {
    const btn = document.createElement('button');
    btn.className = 'region-btn';
    btn.textContent = region;
    btn.addEventListener('click', function() {
      // TODO: Filter items by region
      alert('Filter voor ' + region + ' (nog te implementeren)');
    });
    container.appendChild(btn);
  });
}

// Initialize on page load
initializeRegions();
</script>
