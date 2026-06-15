// ────────────────────────────────────────────────────────────────────────────────
// SEARCH & FILTER FUNCTIONALITY FOR HOMEPAGE
// ────────────────────────────────────────────────────────────────────────────────

class ContentSearch {
  constructor() {
    this.allItems = [];
    this.filteredItems = [];
    this.selectedFilters = {
      locations: [],
      areas: [],
      types: []
    };
    this.wizardState = {
      selectedLand: null,
      selectedRegios: [],
      selectedTypes: [],
      selectedActivities: []
    };

    // Elements
    this.searchInput = document.getElementById('searchInput');
    this.suggestionsContainer = document.getElementById('searchSuggestions');
    this.locationTagsContainer = document.getElementById('locationTags');
    this.areaTagsContainer = document.getElementById('areaTags');
    this.typeTagsContainer = document.getElementById('freeformTypeTags');
    this.resultsContainer = document.getElementById('searchResults');
    this.resetButton = document.getElementById('resetFilters');

    // Wizard elements
    this.landTagsContainer = document.getElementById('landTags');
    this.regioTagsContainer = document.getElementById('regioTags');
    this.wizardTypeTagsContainer = document.getElementById('typeTags');
    this.wizardActivityTagsContainer = document.getElementById('activityTags');
    this.wizardResultsContainer = document.getElementById('wizardResults');
    this.wizardResultsFiltersContainer = document.getElementById('wizardResultsFilters');

    if (this.searchInput || this.landTagsContainer) {
      this.init();
    }
  }

  async init() {
    await this.loadContent();
    this.renderLocationTags();
    this.renderAreaTags();
    this.renderTypeTags();
    this.renderWizardLandTags();
    this.attachEventListeners();
  }

  async loadContent() {
    try {
      const response = await fetch('/assets/data/search-index.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.allItems = await response.json();
      this.filteredItems = [...this.allItems];
      console.log('Loaded', this.allItems.length, 'items');
    } catch (error) {
      console.error('Error loading search index:', error);
      console.error('Fetch URL:', '/assets/data/search-index.json');
      this.allItems = [];
    }
  }

  getUniqueLocations() {
    const locations = new Set();
    this.allItems.forEach(item => {
      if (item.land) locations.add(item.land);
    });
    return Array.from(locations).sort();
  }

  getUniqueAreas() {
    const areas = new Set();
    this.allItems.forEach(item => {
      // Prefer gebied if available, otherwise add regio
      if (item.gebied) {
        areas.add(item.gebied);
      } else if (item.regio) {
        areas.add(item.regio);
      }
    });
    return Array.from(areas).sort();
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

  renderAreaTags() {
    const selectedLocation = this.selectedFilters.locations.length > 0 ? this.selectedFilters.locations[0] : null;

    // If a location is selected, only show areas from that location
    let areas = [];
    if (selectedLocation) {
      const areasSet = new Set();
      this.allItems.forEach(item => {
        if (item.land === selectedLocation) {
          const area = item.gebied || item.regio;
          if (area) areasSet.add(area);
        }
      });
      areas = Array.from(areasSet).sort();
    } else {
      // If no location selected, show all areas
      areas = this.getUniqueAreas();
    }

    const html = areas.map(area =>
      `<button class="filter-tag" data-type="area" data-value="${area}">${area}</button>`
    ).join('');
    this.areaTagsContainer.innerHTML = html;
    this.updateFilterTagStates();
  }

  updateFilterTagStates() {
    const selectedLocation = this.selectedFilters.locations.length > 0 ? this.selectedFilters.locations[0] : null;

    // Get available areas for selected location
    const availableAreas = new Set();
    if (selectedLocation) {
      this.allItems.forEach(item => {
        if (item.land === selectedLocation) {
          const area = item.gebied || item.regio;
          if (area) availableAreas.add(area);
        }
      });
    }

    // Update all location tag buttons - disable if another location is selected
    document.querySelectorAll('[data-type="location"]').forEach(button => {
      const location = button.dataset.value;
      const isSelected = location === selectedLocation;
      const isDisabled = selectedLocation && !isSelected;

      if (isDisabled) {
        button.disabled = true;
        button.classList.add('disabled');
      } else {
        button.disabled = false;
        button.classList.remove('disabled');
      }
    });

    // Update all area tag buttons
    document.querySelectorAll('[data-type="area"]').forEach(button => {
      const area = button.dataset.value;
      const isDisabled = selectedLocation && !availableAreas.has(area);

      if (isDisabled) {
        button.disabled = true;
        button.classList.add('disabled');
      } else {
        button.disabled = false;
        button.classList.remove('disabled');
      }
    });
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

    // Wizard - Toggle filter options
    const toggleFilters = document.getElementById('toggleFilters');
    if (toggleFilters) {
      toggleFilters.addEventListener('change', (e) => {
        const filterCheckboxes = document.getElementById('filterCheckboxes');
        if (e.target.checked) {
          filterCheckboxes.style.display = 'block';
        } else {
          filterCheckboxes.style.display = 'none';
          // Clear selected filters when toggling off
          this.wizardState.selectedActivities = [];
          document.querySelectorAll('.filter-checkbox').forEach(cb => cb.checked = false);
          // Update results when clearing filters
          this.showWizardFilters();
        }
      });
    }

    // Wizard - Skip buttons
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('wizard-skip-regio')) {
        this.handleWizardRegioNext();
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
      const searchFields = [item.naam, item.land, item.regio, item.gebied];
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
    // Don't allow clicking disabled buttons
    if (button.disabled || button.classList.contains('disabled')) {
      return;
    }

    button.classList.toggle('active');
    const type = button.dataset.type;
    const value = button.dataset.value;

    if (button.classList.contains('active')) {
      if (type === 'location') {
        this.selectedFilters.locations.push(value);
      } else if (type === 'area') {
        this.selectedFilters.areas.push(value);
      } else {
        this.selectedFilters.types.push(value);
      }
    } else {
      if (type === 'location') {
        this.selectedFilters.locations = this.selectedFilters.locations.filter(v => v !== value);
      } else if (type === 'area') {
        this.selectedFilters.areas = this.selectedFilters.areas.filter(v => v !== value);
      } else {
        this.selectedFilters.types = this.selectedFilters.types.filter(v => v !== value);
      }
    }

    // Re-render area tags if location changed
    if (type === 'location') {
      this.renderAreaTags();
    }

    this.applyFilters();
  }

  filterBySearch(query) {
    this.filteredItems = this.allItems.filter(item => {
      const matches = [item.naam, item.land, item.regio, item.gebied].some(field =>
        field && field.toLowerCase().includes(query)
      );
      return matches && this.matchesFilters(item);
    });
    this.renderResults();
  }

  applyFilters() {
    this.filteredItems = this.allItems.filter(item => this.matchesFilters(item));
    this.updateFilterTagStates();
    this.renderResults();
  }

  matchesFilters(item) {
    if (this.selectedFilters.locations.length > 0) {
      if (!this.selectedFilters.locations.includes(item.land)) return false;
    }

    if (this.selectedFilters.areas.length > 0) {
      const itemArea = item.gebied || item.regio;
      if (!this.selectedFilters.areas.includes(itemArea)) return false;
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
    this.selectedFilters = { locations: [], areas: [], types: [] };
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
    if (!this.landTagsContainer) {
      console.error('landTagsContainer not found');
      return;
    }

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
      if (item.land === this.wizardState.selectedLand) {
        // Prefer gebied if available, otherwise use regio
        const location = item.gebied || item.regio;
        if (location) {
          regios.add(location);
        }
      }
    });

    const html = Array.from(regios).sort().map(regio =>
      `<button class="wizard-tag" data-value="${regio}">${regio}</button>`
    ).join('');
    this.regioTagsContainer.innerHTML = html;
  }

  renderWizardTypeTags() {
    if (!this.wizardState.selectedLand) return;

    const selectedLand = this.wizardState.selectedLand;
    const selectedRegios = this.wizardState.selectedRegios;

    // Get available types for selected land and regions
    let types = new Set();
    this.allItems.forEach(item => {
      if (item.land === selectedLand) {
        // If regions are selected, only include items from those regions
        if (selectedRegios.length === 0 || selectedRegios.includes(item.regio) || selectedRegios.includes(item.gebied)) {
          types.add(item.type);
        }
      }
    });

    const typeLabels = {
      'camping': 'Campings',
      'fietstocht': 'Fietstochten',
      'wandelroute': 'Wandelroutes',
      'kano-sup': 'Kano & SUP',
      'plaats': 'Plaatsen',
      'museum': 'Musea'
    };

    const html = Array.from(types).sort().map(type => {
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

  handleWizardRegioNext() {
    // Move to type step
    document.getElementById('step-regio').classList.add('hidden');
    document.getElementById('step-type').classList.remove('hidden');
    this.renderWizardTypeTags();
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

    // Auto-advance to type step
    this.handleWizardRegioNext();
  }

  handleWizardTypeSelect(button) {
    const type = button.dataset.value;

    // Only allow one type selection
    if (this.wizardState.selectedTypes.includes(type)) {
      this.wizardState.selectedTypes = [];
      button.classList.remove('active');
      return;
    } else {
      // Clear previous selection and select only this type
      document.querySelectorAll('#step-type .wizard-tag').forEach(tag => tag.classList.remove('active'));
      this.wizardState.selectedTypes = [type];
      button.classList.add('active');
    }

    // Reset filters and move to filter step
    this.wizardState.selectedActivities = [];
    document.getElementById('step-type').classList.add('hidden');
    document.getElementById('step-filters').classList.remove('hidden');
    this.showWizardFilters();
  }

  renderFilterCheckboxes() {
    const filterCheckboxes = document.getElementById('filterCheckboxes');
    if (!filterCheckboxes) return;

    const type = this.wizardState.selectedTypes[0];
    let filters = [];

    // Define available filters by type
    const filterOptions = {
      'camping': [
        { value: 'naturcamping', label: 'Naturcamping' },
        { value: 'familiecamping', label: 'Familiecamping' },
        { value: 'glamping', label: 'Glamping' },
        { value: 'minicamping', label: 'Minicamping' }
      ],
      'plaats': [
        { value: 'dorp', label: 'Dorp' },
        { value: 'stad', label: 'Stad' }
      ]
    };

    filters = filterOptions[type] || [
      { value: type, label: type.charAt(0).toUpperCase() + type.slice(1) }
    ];

    const html = filters.map(filter => `
      <label style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px; cursor: pointer; font-size: 13px; color: var(--color-primary-dark);">
        <input type="checkbox" class="filter-checkbox" value="${filter.value}" style="width: 14px; height: 14px; cursor: pointer;">
        <span>${filter.label}</span>
      </label>
    `).join('');

    filterCheckboxes.innerHTML = html;

    // Add change listeners to checkboxes
    document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        if (e.target.checked) {
          if (!this.wizardState.selectedActivities.includes(e.target.value)) {
            this.wizardState.selectedActivities.push(e.target.value);
          }
        } else {
          this.wizardState.selectedActivities = this.wizardState.selectedActivities.filter(a => a !== e.target.value);
        }
        // Update results in real-time
        this.showWizardFilters();
      });
    });
  }

  showWizardFilters() {
    const results = this.allItems.filter(item => {
      const landMatch = item.land === this.wizardState.selectedLand;

      // Use gebied if available, otherwise fall back to regio
      const matchLocation = item => {
        const location = item.gebied || item.regio;
        return this.wizardState.selectedRegios.includes(location);
      };

      const regioMatch = this.wizardState.selectedRegios.length === 0 ||
        matchLocation(item);

      const typeMatch = this.wizardState.selectedTypes.length === 0 ||
        this.wizardState.selectedTypes.includes(item.type);
      const activityMatch = this.wizardState.selectedActivities.length === 0 ||
        this.wizardState.selectedActivities.includes(item.type);

      return landMatch && regioMatch && typeMatch && activityMatch;
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

    this.wizardResultsFiltersContainer.innerHTML = html || '<p>Geen resultaten gevonden</p>';
    this.renderFilterCheckboxes();
  }


  showWizardResults() {
    const results = this.allItems.filter(item => {
      const landMatch = item.land === this.wizardState.selectedLand;
      const regioMatch = this.wizardState.selectedRegios.length === 0 ||
        this.wizardState.selectedRegios.includes(item.regio);
      const typeMatch = this.wizardState.selectedTypes.length === 0 ||
        this.wizardState.selectedTypes.includes(item.type);
      const activityMatch = this.wizardState.selectedActivities.length === 0 ||
        this.wizardState.selectedActivities.includes(item.type);

      return landMatch && regioMatch && typeMatch && activityMatch;
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

    document.getElementById('step-filters').classList.add('hidden');
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
      document.querySelectorAll('#step-regio .wizard-tag').forEach(tag => tag.classList.remove('active'));
    } else if (step === 'type') {
      this.wizardState.selectedTypes = [];
      document.querySelectorAll('#step-type .wizard-tag').forEach(tag => tag.classList.remove('active'));
      document.getElementById('step-regio').classList.remove('hidden');
      document.getElementById('step-type').classList.add('hidden');
    } else if (step === 'type') {
      this.wizardState.selectedActivities = [];
      document.querySelectorAll('.filter-checkbox').forEach(cb => cb.checked = false);
      const toggleFilters = document.getElementById('toggleFilters');
      if (toggleFilters) {
        toggleFilters.checked = false;
        document.getElementById('filterCheckboxes').style.display = 'none';
      }
      document.getElementById('step-type').classList.remove('hidden');
      document.getElementById('step-filters').classList.add('hidden');
    }
  }

  resetWizard() {
    this.wizardState = {
      selectedLand: null,
      selectedRegios: [],
      selectedTypes: [],
      selectedActivities: []
    };

    document.getElementById('step-land').classList.remove('hidden');
    document.getElementById('step-regio').classList.add('hidden');
    document.getElementById('step-type').classList.add('hidden');
    document.getElementById('step-filters').classList.add('hidden');
    document.getElementById('step-results').classList.add('hidden');

    document.querySelectorAll('.wizard-tag').forEach(tag => tag.classList.remove('active'));
    document.querySelectorAll('.filter-checkbox').forEach(cb => cb.checked = false);

    const toggleFilters = document.getElementById('toggleFilters');
    if (toggleFilters) {
      toggleFilters.checked = false;
      document.getElementById('filterCheckboxes').style.display = 'none';
    }
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new ContentSearch();
});
