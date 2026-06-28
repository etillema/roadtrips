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
  <!-- Regio's per Land - ALLES ZICHTBAAR -->
  <section class="countries-regions">
    <h2>Zoeken op Land & Regio</h2>
    
    <!-- Nederland -->
    <div class="country-block">
      <h3>🇳🇱 Nederland</h3>
      <div class="regions-buttons">
        <a href="/campings/?regio=Friesland" class="region-link">Friesland</a>
        <a href="/campings/?regio=Drenthe" class="region-link">Drenthe</a>
        <a href="/campings/?regio=Groningen" class="region-link">Groningen</a>
        <a href="/campings/?regio=Overijssel" class="region-link">Overijssel</a>
        <a href="/campings/?regio=Flevoland" class="region-link">Flevoland</a>
        <a href="/campings/?regio=Gelderland" class="region-link">Gelderland</a>
        <a href="/campings/?regio=Noord-Holland" class="region-link">Noord-Holland</a>
        <a href="/campings/?regio=Utrecht" class="region-link">Utrecht</a>
        <a href="/campings/?regio=Noord-Brabant" class="region-link">Noord-Brabant</a>
        <a href="/campings/?regio=Limburg" class="region-link">Limburg</a>
        <a href="/campings/?regio=Zeeland" class="region-link">Zeeland</a>
      </div>
    </div>

    <!-- Duitsland -->
    <div class="country-block">
      <h3>🇩🇪 Duitsland</h3>
      <div class="regions-buttons">
        <a href="/campings/?regio=Schleswig-Holstein" class="region-link">Schleswig-Holstein</a>
        <a href="/campings/?regio=Niedersachsen" class="region-link">Niedersachsen</a>
        <a href="/campings/?regio=Nordrhein-Westfalen" class="region-link">Nordrhein-Westfalen</a>
        <a href="/campings/?regio=Hessen" class="region-link">Hessen</a>
        <a href="/campings/?regio=Rheinland-Pfalz" class="region-link">Rheinland-Pfalz</a>
        <a href="/campings/?regio=Baden-Württemberg" class="region-link">Baden-Württemberg</a>
        <a href="/campings/?regio=Bayern" class="region-link">Bayern</a>
        <a href="/campings/?regio=Eifel" class="region-link">Eifel</a>
        <a href="/campings/?regio=Schwarzwald" class="region-link">Schwarzwald</a>
      </div>
    </div>

    <!-- België -->
    <div class="country-block">
      <h3>🇧🇪 België</h3>
      <div class="regions-buttons">
        <a href="/campings/?regio=West-Vlaanderen" class="region-link">West-Vlaanderen</a>
        <a href="/campings/?regio=Oost-Vlaanderen" class="region-link">Oost-Vlaanderen</a>
        <a href="/campings/?regio=Vlaams-Brabant" class="region-link">Vlaams-Brabant</a>
        <a href="/campings/?regio=Limburg" class="region-link">Limburg</a>
        <a href="/campings/?regio=Luik" class="region-link">Luik</a>
        <a href="/campings/?regio=Hainaut" class="region-link">Hainaut</a>
        <a href="/campings/?regio=Namur" class="region-link">Namur</a>
      </div>
    </div>

    <!-- Frankrijk -->
    <div class="country-block">
      <h3>🇫🇷 Frankrijk</h3>
      <div class="regions-buttons">
        <a href="/campings/?regio=Bretagne" class="region-link">Bretagne</a>
        <a href="/campings/?regio=Normandie" class="region-link">Normandie</a>
        <a href="/campings/?regio=Nouvelle-Aquitaine" class="region-link">Nouvelle-Aquitaine</a>
        <a href="/campings/?regio=Auvergne-Rhône-Alpes" class="region-link">Auvergne-Rhône-Alpes</a>
        <a href="/campings/?regio=Occitanie" class="region-link">Occitanie</a>
        <a href="/campings/?regio=Dordogne" class="region-link">Dordogne</a>
      </div>
    </div>

    <!-- Luxemburg -->
    <div class="country-block">
      <h3>🇱🇺 Luxemburg</h3>
      <div class="regions-buttons">
        <a href="/campings/?regio=Luxemburg-Stad" class="region-link">Luxemburg-Stad</a>
        <a href="/campings/?regio=Ardenne" class="region-link">Ardenne</a>
        <a href="/campings/?regio=Eifel" class="region-link">Eifel</a>
      </div>
    </div>

    <!-- Oostenrijk -->
    <div class="country-block">
      <h3>🇦🇹 Oostenrijk</h3>
      <div class="regions-buttons">
        <a href="/campings/?regio=Vorarlberg" class="region-link">Vorarlberg</a>
        <a href="/campings/?regio=Tirol" class="region-link">Tirol</a>
        <a href="/campings/?regio=Salzburgerland" class="region-link">Salzburgerland</a>
        <a href="/campings/?regio=Oberösterreich" class="region-link">Oberösterreich</a>
        <a href="/campings/?regio=Steiermark" class="region-link">Steiermark</a>
      </div>
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
