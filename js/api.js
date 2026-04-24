// Módulo de API - Comunicación con el backend

const API = {
  /**
   * Obtener todas las series (con filtros opcionales)
   */
  async getAllSeries(filters = {}) {
    try {
      const params = new URLSearchParams();
      
      if (filters.search) params.append('search', filters.search);
      if (filters.genre) params.append('genre', filters.genre);
      
      const url = `${CONFIG.API_URL}/series${params.toString() ? '?' + params.toString() : ''}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Error al obtener las series');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en getAllSeries:', error);
      throw error;
    }
  },

  /**
   * Obtener una serie por ID
   */
  async getSeriesById(id) {
    try {
      const response = await fetch(`${CONFIG.API_URL}/series/${id}`);
      
      if (!response.ok) {
        throw new Error('Serie no encontrada');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en getSeriesById:', error);
      throw error;
    }
  },

  /**
   * Crear una nueva serie
   */
  async createSeries(data) {
    try {
      const response = await fetch(`${CONFIG.API_URL}/series`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error('Error al crear la serie');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en createSeries:', error);
      throw error;
    }
  },

  /**
   * Actualizar una serie existente
   */
  async updateSeries(id, data) {
    try {
      const response = await fetch(`${CONFIG.API_URL}/series/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error('Error al actualizar la serie');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en updateSeries:', error);
      throw error;
    }
  },

  /**
   * Eliminar una serie
   */
  async deleteSeries(id) {
    try {
      const response = await fetch(`${CONFIG.API_URL}/series/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Error al eliminar la serie');
      }
      
      return true;
    } catch (error) {
      console.error('Error en deleteSeries:', error);
      throw error;
    }
  }
};