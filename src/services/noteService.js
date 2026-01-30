import { CrudService } from './crudService'

/**
 * @typedef {Object} NoteContent
 * @property {string} [text]
 * @property {string[]} [list]
 * @property {string} [listType]
 */

/**
 * @typedef {Object} Note
 * @property {string} id
 * @property {string} title
 * @property {NoteContent[]} content
 * @property {string[]} tags
 * @property {boolean} is_favorite
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * Service para gerenciamento de notas
 * @extends {CrudService<Note>}
 */
class NoteService extends CrudService {
  constructor() {
    super('notes')
  }

  /**
   * Busca notas por título
   * @param {string} title - Título ou parte do título
   * @returns {Promise<{data: Note[] | null, error: Error | null}>}
   */
  async searchByTitle(title) {
    return this.filter('title', 'ilike', `%${title}%`)
  }

  /**
   * Busca notas favoritas
   * @returns {Promise<{data: Note[] | null, error: Error | null}>}
   */
  async getFavorites() {
    return this.filter('is_favorite', 'eq', true)
  }

  /**
   * Busca notas por tag
   * @param {string} tag - Tag para filtrar
   * @returns {Promise<{data: Note[] | null, error: Error | null}>}
   */
  async getByTag(tag) {
    return this.filter('tags', 'cs', `{${tag}}`)
  }

  /**
   * Alternar favorito
   * @param {string} id - ID da nota
   * @param {boolean} isFavorite - Novo estado
   * @returns {Promise<{data: Note | null, error: Error | null}>}
   */
  async toggleFavorite(id, isFavorite) {
    return this.update(id, { is_favorite: isFavorite })
  }
}

export const noteService = new NoteService()
