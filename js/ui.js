// Módulo UI - Funciones para crear elementos de la interfaz

const UI = {
  /**
   * Crear una card de serie
   */
  createSeriesCard(series) {
    const card = document.createElement('div');
    card.className = 'series-card';
    card.dataset.id = series.id;
    
    card.innerHTML = `
      <div class="series-card-inner">
        <img 
          src="${series.image_url || 'https://via.placeholder.com/400x250?text=No+Image'}" 
          alt="${series.title}" 
          class="series-image"
          onerror="this.src='https://via.placeholder.com/400x250?text=No+Image'"
        >
        <span class="series-badge">${series.genre}</span>
        <h3 class="series-title">${this.escapeHtml(series.title)}</h3>
        <div class="series-meta">
          <span>⭐ ${series.rating}</span>
          <span>📅 ${series.year}</span>
          <span>${series.watched ? '✓ Vista' : '⏳ Pendiente'}</span>
        </div>
        <p class="series-description">
          ${this.escapeHtml(series.description)}
        </p>
        <div class="series-actions">
          <button class="btn btn-secondary btn-small" onclick="App.editSeries(${series.id})">
            Editar
          </button>
          <button class="btn btn-danger btn-small" onclick="App.deleteSeries(${series.id})">
            Eliminar
          </button>
        </div>
      </div>
    `;
    
    return card;
  },

  /**
   * Mostrar loading
   */
  showLoading() {
    const container = document.getElementById('seriesContainer');
    container.innerHTML = '<div class="loading">CARGANDO_DATOS...</div>';
  },

  /**
   * Mostrar mensaje de error
   */
  showError(message) {
    const container = document.getElementById('seriesContainer');
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">⚠</div>
        <div class="empty-state-text">${message}</div>
      </div>
    `;
  },

  /**
   * Mostrar estado vacío
   */
  showEmpty() {
    const container = document.getElementById('seriesContainer');
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📺</div>
        <div class="empty-state-text">No hay series registradas</div>
      </div>
    `;
  },

  /**
   * Renderizar grid de series
   */
  renderSeriesGrid(series) {
    const container = document.getElementById('seriesContainer');
    
    if (!series || series.length === 0) {
      this.showEmpty();
      return;
    }
    
    const grid = document.createElement('div');
    grid.className = 'series-grid';
    
    series.forEach(s => {
      grid.appendChild(this.createSeriesCard(s));
    });
    
    container.innerHTML = '';
    container.appendChild(grid);
  },

  /**
   * Escapar HTML para prevenir XSS
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  },

  /**
   * Abrir modal
   */
  openModal(title = 'Nueva Serie') {
    const modal = document.getElementById('seriesModal');
    const modalTitle = document.getElementById('modalTitle');
    
    modalTitle.textContent = title;
    modal.classList.add('active');
  },

  /**
   * Cerrar modal
   */
  closeModal() {
    const modal = document.getElementById('seriesModal');
    modal.classList.remove('active');
  },

  /**
   * Limpiar formulario
   */
  clearForm() {
    document.getElementById('seriesForm').reset();
    document.getElementById('seriesId').value = '';
  },

  /**
   * Llenar formulario con datos de serie
   */
  fillForm(series) {
    document.getElementById('seriesId').value = series.id;
    document.getElementById('title').value = series.title;
    document.getElementById('description').value = series.description;
    document.getElementById('genre').value = series.genre;
    document.getElementById('year').value = series.year;
    document.getElementById('rating').value = series.rating;
    document.getElementById('image_url').value = series.image_url;
    document.getElementById('watched').checked = series.watched;
  }
};