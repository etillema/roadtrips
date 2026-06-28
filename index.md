---
layout: default
title: Roadtrips
---

<div class="home-header">
  <div class="home-header-content">
    <h1>Roadtrips Noord-West Europa</h1>
    <p>Campings, fietstochten, wandelroutes, en nog veel meer</p>
  </div>
</div>

<main class="home-main">
  <section class="categories-showcase">
    <h2>Kies een categorie</h2>
    
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
