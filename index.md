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
  <!-- Gebieden & Regio's - ALLEEN BESTAANDE ITEMS -->
  <section class="filter-section">
    <h2>Zoeken op Gebied / Regio</h2>
    
    {% for land in site.data.filters.gebieden %}
      {% if site.data.filters.gebieden[land[0]] %}
        <div class="country-block">
          <h3>{{ land[0] }}</h3>
          <div class="filter-buttons">
            <!-- Gebieden eerst -->
            {% if site.data.filters.gebieden[land[0]] %}
              {% for gebied in site.data.filters.gebieden[land[0]] %}
                <a href="/campings/?gebied={{ gebied | url_encode }}" class="filter-link">{{ gebied }}</a>
              {% endfor %}
            {% endif %}
            
            <!-- Regio's als fallback -->
            {% if site.data.filters.regio[land[0]] %}
              {% for regio in site.data.filters.regio[land[0]] %}
                <a href="/campings/?regio={{ regio | url_encode }}" class="filter-link">{{ regio }}</a>
              {% endfor %}
            {% endif %}
          </div>
        </div>
      {% endif %}
    {% endfor %}
  </section>

  <!-- Categories -->
  <section class="categories-showcase">
    <h2>Of kies direct een categorie</h2>
    
    <div class="category-tiles">
      <a href="/campings/" class="category-tile">
        <div class="tile-label">Campings</div>
        <p class="tile-count">{{ site.campings.size }} plekken</p>
      </a>

      <a href="/fietstochten/" class="category-tile">
        <div class="tile-label">Fietstochten</div>
        <p class="tile-count">{{ site.fietstochten.size }} routes</p>
      </a>

      <a href="/wandelroutes/" class="category-tile">
        <div class="tile-label">Wandelroutes</div>
        <p class="tile-count">{{ site.wandelroutes.size }} routes</p>
      </a>

      <a href="/plaats/" class="category-tile">
        <div class="tile-label">Plaatsen & Steden</div>
        <p class="tile-count">{{ site.plaats.size }} plaatsen</p>
      </a>

      <a href="/musea/" class="category-tile">
        <div class="tile-label">Musea</div>
        <p class="tile-count">{{ site.musea.size }} musea</p>
      </a>

      <a href="/kano-suproutes/" class="category-tile">
        <div class="tile-label">Kano & SUP</div>
        <p class="tile-count">{{ site.kano_suproutes.size }} routes</p>
      </a>
    </div>
  </section>

  <section class="home-tagline">
    <h2>Buiten is het mooiste</h2>
    <p>Maak herinneringen, ontdek nieuwe plekken en geniet van de natuur in Noord-West Europa.</p>
  </section>
</main>
