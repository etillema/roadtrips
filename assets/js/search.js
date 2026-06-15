class FilteredSearch {
  constructor() {
    this.allItems = [];
    this.filteredItems = [];

    // Get DOM elements
    this.searchInput = document.getElementById('searchInput');
    this.filterLand = document.getElementById('filterLand');
    this.filterGebied = document.getElementById('filterGebied');
    this.filterType = document.getElementById('filterType');
    this.resultsContainer = document.getElementById('searchResults');
    this.resultsHeader = document.getElementById('resultsHeader');
    this.resetButton = document.getElementById('resetFilters');

    if (this.searchInput) {
      this.init();
    }
  }

  async init() {
    await this.loadData();
    this.populateSelects();
    this.attachListeners();
    this.updateResults();
  }

  async loadData() {
    try {
      const response = await fetch('/assets/data/search-index.json');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      this.allItems = await response.json();
    } catch (error) {
      console.error('Error loading search data:', error);
      this.allItems = [];
    }
  }

  populateSelects() {
    // Populate Land (Landen)
    const lands = [...new Set(this.allItems.map(i => i.land))].sort();
    lands.forEach(land => {
      const opt = document.createElement('option');
      opt.value = land;
      opt.textContent = land;
      this.filterLand.appendChild(opt);
    });

    // Populate Type
    const types = {
      'camping': 'Campings',
      'fietstocht': 'Fietstochten',
      'wandelroute': 'Wandelroutes',
      'kano-sup': 'Kano & SUP',
      'plaats': 'Plaatsen',
      'museum': 'Musea'
    };
    Object.entries(types).forEach(([key, label]) => {
      const opt = document.createElement('option');
      opt.value = key;
      opt.textContent = label;
      this.filterType.appendChild(opt);
    });

    // Initialize Gebied with all areas
    this.updateGebieden();
  }

  updateGebieden() {
    const selectedLand = this.filterLand.value;
    const gebieden = new Set();

    this.allItems.forEach(item => {
      if (!selectedLand || item.land === selectedLand) {
        const gebied = item.gebied || item.regio;
        if (gebied) gebieden.add(gebied);
      }
    });

    this.filterGebied.innerHTML = '<option value="">Alle gebieden</option>';
    [...gebieden].sort().forEach(gebied => {
      const opt = document.createElement('option');
      opt.value = gebied;
      opt.textContent = gebied;
      this.filterGebied.appendChild(opt);
    });
  }

  attachListeners() {
    this.searchInput.addEventListener('input', () => this.updateResults());
    this.filterLand.addEventListener('change', () => {
      this.updateGebieden();
      this.updateResults();
    });
    this.filterGebied.addEventListener('change', () => this.updateResults());
    this.filterType.addEventListener('change', () => this.updateResults());
    this.resetButton.addEventListener('click', () => this.reset());
  }

  updateResults() {
    const query = this.searchInput.value.toLowerCase().trim();
    const land = this.filterLand.value;
    const gebied = this.filterGebied.value;
    const type = this.filterType.value;

    this.filteredItems = this.allItems.filter(item => {
      // Text search
      if (query) {
        const matches = [item.naam, item.land, item.regio, item.gebied]
          .filter(Boolean)
          .some(field => field.toLowerCase().includes(query));
        if (!matches) return false;
      }

      // Filters
      if (land && item.land !== land) return false;
      if (gebied && (item.gebied || item.regio) !== gebied) return false;
      if (type && item.type !== type) return false;

      return true;
    });

    this.render();
  }

  render() {
    // Header
    this.resultsHeader.textContent =
      this.filteredItems.length === 0
        ? 'Geen resultaten gevonden'
        : `${this.filteredItems.length} resultaat${this.filteredItems.length !== 1 ? 'en' : ''} gevonden`;

    // Results
    const typeLabels = {
      'camping': 'Camping',
      'fietstocht': 'Fietstocht',
      'wandelroute': 'Wandelroute',
      'kano-sup': 'Kano & SUP',
      'plaats': 'Plaats',
      'museum': 'Museum'
    };

    const html = this.filteredItems.map(item => {
      const location = [item.plaats, item.regio].filter(Boolean).join(', ');
      return `
      <a href="${item.url}" class="result-card">
        ${item.foto ? `<img src="${item.foto}" alt="${item.naam}" class="result-card__image" loading="lazy">` : ''}
        <div class="result-card__content">
          <div class="result-card__type">${typeLabels[item.type] || item.type}</div>
          <div class="result-card__title">${item.naam}</div>
          <div class="result-card__location">${location}</div>
        </div>
      </a>
    `;
    }).join('');

    this.resultsContainer.innerHTML = html;
  }

  reset() {
    this.searchInput.value = '';
    this.filterLand.value = '';
    this.filterGebied.value = '';
    this.filterType.value = '';
    this.updateGebieden();
    this.updateResults();
  }
}

// Initialize when page is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new FilteredSearch();
  });
} else {
  new FilteredSearch();
}
