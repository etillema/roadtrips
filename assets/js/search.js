// ────────────────────────────────────────────────────────────────────────────────
// SEARCH & FILTER FUNCTIONALITY FOR HOMEPAGE
// ────────────────────────────────────────────────────────────────────────────────

class ContentSearch {
  constructor() {
    this.allItems = [];
    this.filteredItems = [];
    this.selectedFilters = {
      locations: [],
      types: []
    };
    this.wizardState = {
      selectedLand: null,
      selectedRegios: [],
      selectedTypes: []
    };

    // Elements
    this.searchInput = document.getElementById('searchInput');
    this.suggestionsContainer = document.getElementById('searchSuggestions');
    this.locationTagsContainer = document.getElementById('locationTags');
    this.typeTagsContainer = document.getElementById('freeformTypeTags');
    this.resultsContainer = document.getElementById('searchResults');
    this.resetButton = document.getElementById('resetFilters');

    // Wizard elements
    this.landTagsContainer = document.getElementById('landTags');
    this.regioTagsContainer = document.getElementById('regioTags');
    this.wizardTypeTagsContainer = document.getElementById('typeTags');
    this.wizardResultsContainer = document.getElementById('wizardResults');

    if (this.searchInput || this.landTagsContainer) {
      this.init();
    }
  }

  async init() {
    await this.loadContent();
    this.renderLocationTags();
    this.renderTypeTags();
    this.renderWizardLandTags();
    this.attachEventListeners();
  }

  async loadContent() {
    try {
      const response = await fetch('/assets/data/search-index.json');
      this.allItems = await response.json();
      this.filteredItems = [...this.allItems];
    } catch (error) {
      console.error('Error loading search index:', error);
      this.allItems = [];
    }
  }

  getUniqueLocations() {
    const locations = new Set();
    this.allItems.forEach(item => {
      if (item.land) locations.add(item.land);
      if (item.regio) locations.add(item.regio);
    });
    return Array.from(locations).sort();
  }

  getUniqueTypes() {
    const types = new Set();
    this.allItems.forEach(item => {
      types.add(item.type);
    });
    return Array.from(types).sort();
  }

  renderLocationTags() {
    const locations = this.getUniqueLocations();
    const html = locations.map(loc =>
      `<button class="filter-tag" data-type="location" data-value="${loc}">${loc}</button>`
    ).join('');
    this.locationTagsContainer.innerHTML = html;
  }

  renderTypeTags() {
    const types = this.getUniqueTypes();
    const typeLabels = {
      'camping': 'Campings',
      'fietstocht': 'Fietstochten',
      'wandelroute': 'Wandelroutes',
      'kano-sup': 'Kano & SUP',
      'plaats': 'Plaatsen',
      'museum': 'Musea'
    };

    const html = types.map(type => {
      const label = typeLabels[type] || type;
      return `<button class="filter-tag" data-type="type" data-value="${type}">${label}</button>`;
    }).join('');
    this.typeTagsContainer.innerHTML = html;
  }

  attachEventListeners() {
    // Tab switching
    document.querySelectorAll('.search-tab').forEach(tab => {
      tab.addEventListener('click', (e) => this.handleTabSwitch(e));
    });

    // Wizard - Land selection
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('wizard-tag') && e.target.closest('#step-land')) {
        this.handleWizardLandSelect(e.target);
      }
    });

    // Wizard - Regio selection
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('wizard-tag') && e.target.closest('#step-regio')) {
        this.handleWizardRegioSelect(e.target);
      }
    });

    // Wizard - Type selection
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('wizard-tag') && e.target.closest('#step-type')) {
        this.handleWizardTypeSelect(e.target);
      }
    });

    // Wizard - Back buttons
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('wizard-back')) {
        this.handleWizardBack(e.target.dataset.back);
      }
    });

    // Wizard - Reset button
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('wizard-reset')) {
        this.resetWizard();
      }
    });

    // Search input
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => this.handleSearch(e));
      this.searchInput.addEventListener('focus', () => {
        if (this.searchInput.value) {
          this.suggestionsContainer.classList.add('active');
        }
      });
    }

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-section')) {
        this.suggestionsContainer?.classList.remove('active');
      }
    });

    // Filter tags
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('filter-tag')) {
        this.handleFilterClick(e.target);
      }
    });

    // Reset button
    if (this.resetButton) {
      this.resetButton.addEventListener('click', () => this.reset());
    }
  }

  handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();

    if (query.length < 2) {
      this.suggestionsContainer.classList.remove('active');
      return;
    }

    const suggestions = this.getSuggestions(query);
    this.renderSuggestions(suggestions);
    this.suggestionsContainer.classList.add('active');

    // Also filter results
    this.filterBySearch(query);
  }

  getSuggestions(query) {
    const suggestions = new Map();

    this.allItems.forEach(item => {
      const searchFields = [item.naam, item.land, item.regio];
      const match = searchFields.some(field =>
        field && field.toLowerCase().includes(query)
      );

      if (match) {
        const key = `${item.type}-${item.naam}`;
        if (!suggestions.has(key)) {
          suggestions.set(key, {
            naam: item.naam,
            type: item.type,
            land: item.land,
            regio: item.regio,
            url: item.url
          });
        }
      }
    });

    return Array.from(suggestions.values()).slice(0, 8);
  }

  renderSuggestions(suggestions) {
    if (suggestions.length === 0) {
      this.suggestionsContainer.innerHTML = '<div class="suggestion">Geen resultaten</div>';
      return;
    }

    const html = suggestions.map(s => `
      <a href="${s.url}" class="suggestion">
        <strong>${s.naam}</strong>
        <span class="suggestion-type">${s.land}${s.regio ? ' • ' + s.regio : ''}</span>
      </a>
    `).join('');
    this.suggestionsContainer.innerHTML = html;
  }

  handleFilterClick(button) {
    button.classList.toggle('active');
    const type = button.dataset.type;
    const value = button.dataset.value;

    if (button.classList.contains('active')) {
      if (type === 'location') {
        this.selectedFilters.locations.push(value);
      } else {
        this.selectedFilters.types.push(value);
      }
    } else {
      if (type === 'location') {
        this.selectedFilters.locations = this.selectedFilters.locations.filter(v => v !== value);
      } else {
        this.selectedFilters.types = this.selectedFilters.types.filter(v => v !== value);
      }
    }

    this.applyFilters();
  }

  filterBySearch(query) {
    this.filteredItems = this.allItems.filter(item => {
      const matches = [item.naam, item.land, item.regio].some(field =>
        field && field.toLowerCase().includes(query)
      );
      return matches && this.matchesFilters(item);
    });
    this.renderResults();
  }

  applyFilters() {
    this.filteredItems = this.allItems.filter(item => this.matchesFilters(item));
    this.renderResults();
  }

  matchesFilters(item) {
    if (this.selectedFilters.locations.length > 0) {
      const hasLocation = this.selectedFilters.locations.some(loc =>
        item.land === loc || item.regio === loc
      );
      if (!hasLocation) return false;
    }

    if (this.selectedFilters.types.length > 0) {
      if (!this.selectedFilters.types.includes(item.type)) return false;
    }

    return true;
  }

  renderResults() {
    if (this.filteredItems.length === 0) {
      this.resultsContainer.innerHTML = '';
      return;
    }

    const typeLabels = {
      'camping': 'Camping',
      'fietstocht': 'Fietstocht',
      'wandelroute': 'Wandelroute',
      'kano-sup': 'Kano & SUP',
      'plaats': 'Plaats',
      'museum': 'Museum'
    };

    const html = this.filteredItems.slice(0, 6).map(item => `
      <a href="${item.url}" class="result-card">
        <div class="result-type">${typeLabels[item.type] || item.type}</div>
        <div class="result-title">${item.naam}</div>
        <div class="result-meta">${item.land}${item.regio ? ' • ' + item.regio : ''}</div>
      </a>
    `).join('');
    this.resultsContainer.innerHTML = html;
  }

  reset() {
    this.selectedFilters = { locations: [], types: [] };
    if (this.searchInput) {
      this.searchInput.value = '';
    }
    this.suggestionsContainer?.classList.remove('active');
    document.querySelectorAll('.filter-tag').forEach(tag => tag.classList.remove('active'));
    this.filteredItems = [...this.allItems];
    this.renderResults();
  }

  // ──────────────────────────────────────────────────────────────────────────────
  // WIZARD METHODS
  // ──────────────────────────────────────────────────────────────────────────────

  handleTabSwitch(e) {
    const tabName = e.target.dataset.tab;
    document.querySelectorAll('.search-tab').forEach(t => t.classList.remove('active'));
    e.target.classList.add('active');

    document.querySelectorAll('.search-tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
  }

  renderWizardLandTags() {
    const lands = new Set();
    this.allItems.forEach(item => {
      if (item.land) lands.add(item.land);
    });

    const html = Array.from(lands).sort().map(land =>
      `<button class="wizard-tag" data-value="${land}">${land}</button>`
    ).join('');
    this.landTagsContainer.innerHTML = html;
  }

  renderWizardRegioTags() {
    if (!this.wizardState.selectedLand) return;

    const regios = new Set();
    this.allItems.forEach(item => {
      if (item.land === this.wizardState.selectedLand && item.regio) {
        regios.add(item.regio);
      }
    });

    const html = Array.from(regios).sort().map(regio =>
      `<button class="wizard-tag" data-value="${regio}">${regio}</button>`
    ).join('');
    this.regioTagsContainer.innerHTML = html;
  }

  renderWizardTypeTags() {
    const types = this.getUniqueTypes();
    const typeLabels = {
      'camping': 'Campings',
      'fietstocht': 'Fietstochten',
      'wandelroute': 'Wandelroutes',
      'kano-sup': 'Kano & SUP',
      'plaats': 'Plaatsen',
      'museum': 'Musea'
    };

    const html = types.map(type => {
      const label = typeLabels[type] || type;
      return `<button class="wizard-tag" data-value="${type}">${label}</button>`;
    }).join('');
    this.wizardTypeTagsContainer.innerHTML = html;
  }

  handleWizardLandSelect(button) {
    this.wizardState.selectedLand = button.dataset.value;
    this.wizardState.selectedRegios = [];

    document.getElementById('step-land').classList.add('hidden');
    document.getElementById('step-regio').classList.remove('hidden');

    this.renderWizardRegioTags();
  }

  handleWizardRegioSelect(button) {
    const regio = button.dataset.value;
    if (this.wizardState.selectedRegios.includes(regio)) {
      this.wizardState.selectedRegios = this.wizardState.selectedRegios.filter(r => r !== regio);
      button.classList.remove('active');
    } else {
      this.wizardState.selectedRegios.push(regio);
      button.classList.add('active');
    }
  }

  handleWizardTypeSelect(button) {
    const type = button.dataset.value;
    if (this.wizardState.selectedTypes.includes(type)) {
      this.wizardState.selectedTypes = this.wizardState.selectedTypes.filter(t => t !== type);
      button.classList.remove('active');
    } else {
      this.wizardState.selectedTypes.push(type);
      button.classList.add('active');
    }

    // Show results
    this.showWizardResults();
  }

  showWizardResults() {
    const results = this.allItems.filter(item => {
      const landMatch = item.land === this.wizardState.selectedLand;
      const regioMatch = this.wizardState.selectedRegios.length === 0 ||
        this.wizardState.selectedRegios.includes(item.regio);
      const typeMatch = this.wizardState.selectedTypes.length === 0 ||
        this.wizardState.selectedTypes.includes(item.type);

      return landMatch && regioMatch && typeMatch;
    });

    const typeLabels = {
      'camping': 'Camping',
      'fietstocht': 'Fietstocht',
      'wandelroute': 'Wandelroute',
      'kano-sup': 'Kano & SUP',
      'plaats': 'Plaats',
      'museum': 'Museum'
    };

    const html = results.slice(0, 6).map(item => `
      <a href="${item.url}" class="result-card">
        <div class="result-type">${typeLabels[item.type] || item.type}</div>
        <div class="result-title">${item.naam}</div>
        <div class="result-meta">${item.land}${item.regio ? ' • ' + item.regio : ''}</div>
      </a>
    `).join('');

    this.wizardResultsContainer.innerHTML = html || '<p>Geen resultaten gevonden</p>';

    document.getElementById('step-type').classList.add('hidden');
    document.getElementById('step-results').classList.remove('hidden');
  }

  handleWizardBack(step) {
    if (step === 'land') {
      this.resetWizard();
    } else if (step === 'regio') {
      this.wizardState.selectedLand = null;
      this.wizardState.selectedRegios = [];
      document.getElementById('step-land').classList.remove('hidden');
      document.getElementById('step-regio').classList.add('hidden');
    } else if (step === 'type') {
      this.wizardState.selectedTypes = [];
      document.querySelectorAll('#step-type .wizard-tag').forEach(tag => tag.classList.remove('active'));
      document.getElementById('step-regio').classList.remove('hidden');
      document.getElementById('step-type').classList.add('hidden');
    }
  }

  resetWizard() {
    this.wizardState = {
      selectedLand: null,
      selectedRegios: [],
      selectedTypes: []
    };

    document.getElementById('step-land').classList.remove('hidden');
    document.getElementById('step-regio').classList.add('hidden');
    document.getElementById('step-type').classList.add('hidden');
    document.getElementById('step-results').classList.add('hidden');

    document.querySelectorAll('.wizard-tag').forEach(tag => tag.classList.remove('active'));
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new ContentSearch();
});
