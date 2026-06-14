---
layout: default
title: Roadtrips
---

{% include home-hero.html %}

<main class="page-shell home-page">
  <section class="category-section">
    <div class="category-grid">
      {% include category-card.html title="Campings" count=site.campings.size url="/campings/" icon="△" %}
      {% include category-card.html title="Fietstochten" count=site.fietstochten.size url="/fietstochten/" icon="○" %}
      {% include category-card.html title="Wandelroutes" count=site.wandelroutes.size url="/wandelroutes/" icon="⌁" %}
      {% include category-card.html title="Musea" count=site.musea.size url="/musea/" icon="▣" %}
      {% include category-card.html title="Kano & SUP" count=site.kano_suproutes.size url="/kano-suproutes/" icon="≈" %}
      {% include category-card.html title="Plaatsen & steden" count=site.plaats.size url="/plaats/" icon="▢" %}
    </div>
  </section>

  <section class="home-quote">
    <div class="home-quote__icon">⌾</div>
    <div>
      <h2>Buiten is het mooiste</h2>
      <p>Maak herinneringen, ontdek nieuwe plekken en geniet van de natuur.</p>
    </div>
  </section>
</main>
