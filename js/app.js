// Módulo principal de la aplicación

const App = {
  // Filtros actuales
  filters: {
    search: '',
    genre: ''
  },

  /**
   * Inicializar la aplicación
   */
  async init() {
    console.log('🚀 Inicializando Series Tracker...');
    
    // Cargar series
    await this.loadSeries();
    
    // Setup event listeners
    this.setupEventListeners();
  },

  /**
   * Configurar event listeners
   */
  setupEventListeners() {
    // Botón nueva serie
    document.getElementById('newSeriesBtn').addEventListener('click', () => {
      UI.clearForm();
      UI.openModal('Nueva Serie');
    });

    // Cerrar modal
    document.getElementById('closeModal').addEventListener('click', () => {
      UI.closeModal();
    });

    // Cerrar modal al hacer click fuera
    document.getElementById('seriesModal').addEventListener('click', (e) => {
      if (e.target.id === 'seriesModal') {
        UI.closeModal();
      }
    });

    // Submit del formulario
    document.getElementById('seriesForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      await this.handleFormSubmit();
    });

    // Búsqueda
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', this.debounce(() => {
      this.filters.search = searchInput.value;
      this.loadSeries();
    }, 500));

    // Filtro de género
    document.getElementById('genreFilter').addEventListener('change', (e) => {
      this.filters.genre = e.target.value;
      this.loadSeries();
    });

    // Exportar CSV
    document.getElementById('exportCsvBtn').addEventListener('click', async () => {
      try {
        const series = await API.getAllSeries(this.filters);
        const timestamp = new Date().toISOString().split('T')[0];
        UI.exportToCSV(series, `series-tracker-${timestamp}.csv`);
      } catch (error) {
        console.error('Error al exportar:', error);
        alert('Error al exportar CSV');
      }
    });

    // Upload de imagen
    document.getElementById('uploadImageBtn').addEventListener('click', () => {
      document.getElementById('imageFile').click();
    });

    document.getElementById('imageFile').addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      // Validar tamaño (1MB)
      if (file.size > 1048576) {
        alert('La imagen no puede superar 1MB');
        return;
      }

      // Validar tipo
      if (!file.type.startsWith('image/')) {
        alert('Solo se permiten imágenes');
        return;
      }

      try {
        const uploadBtn = document.getElementById('uploadImageBtn');
        uploadBtn.textContent = '⏳ Subiendo...';
        uploadBtn.disabled = true;

        const response = await API.uploadImage(file);
        document.getElementById('image_url').value = response.url;

        uploadBtn.textContent = '✅ Subido';
        setTimeout(() => {
          uploadBtn.textContent = '📤 Subir';
          uploadBtn.disabled = false;
        }, 2000);

      } catch (error) {
        console.error('Error al subir:', error);
        alert('Error al subir imagen: ' + error.message);
        
        const uploadBtn = document.getElementById('uploadImageBtn');
        uploadBtn.textContent = '📤 Subir';
        uploadBtn.disabled = false;
      }
    });
  },

  /**
   * Cargar series desde la API
   */
  async loadSeries() {
    try {
      UI.showLoading();
      const series = await API.getAllSeries(this.filters);
      UI.renderSeriesGrid(series);
    } catch (error) {
      console.error('Error al cargar series:', error);
      UI.showError('ERROR_AL_CARGAR_DATOS');
    }
  },

  /**
   * Manejar submit del formulario
   */
  async handleFormSubmit() {
    const seriesId = document.getElementById('seriesId').value;
    
    const data = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      genre: document.getElementById('genre').value,
      year: parseInt(document.getElementById('year').value),
      rating: parseFloat(document.getElementById('rating').value),
      image_url: document.getElementById('image_url').value,
      watched: document.getElementById('watched').checked
    };

    try {
      if (seriesId) {
        // Actualizar
        await API.updateSeries(seriesId, data);
        console.log('✅ Serie actualizada');
      } else {
        // Crear
        await API.createSeries(data);
        console.log('✅ Serie creada');
      }

      UI.closeModal();
      UI.clearForm();
      await this.loadSeries();
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Error al guardar la serie. Verifica los datos.');
    }
  },

  /**
   * Editar una serie
   */
  async editSeries(id) {
    try {
      const series = await API.getSeriesById(id);
      UI.fillForm(series);
      UI.openModal('Editar Serie');
    } catch (error) {
      console.error('Error al cargar serie:', error);
      alert('Error al cargar la serie');
    }
  },

  /**
   * Eliminar una serie
   */
  async deleteSeries(id) {
    if (!confirm('¿Seguro que quieres eliminar esta serie?')) {
      return;
    }

    try {
      await API.deleteSeries(id);
      console.log('✅ Serie eliminada');
      await this.loadSeries();
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert('Error al eliminar la serie');
    }
  },

  /**
   * Debounce helper
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});