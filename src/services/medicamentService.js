import { CrudService } from './crudService'

/**
 * @typedef {Object} Medicament
 * @property {string} id
 * @property {string} name - Nome do medicamento
 * @property {string} class - Classe do medicamento (antibiotic, analgesic, etc)
 * @property {string} route - Via de administração (oral, iv, im, etc)
 * @property {string} [indications] - Indicações
 * @property {string} [dosage] - Dosagem
 * @property {string} [notes] - Anotações
 * @property {string[]} [tags] - Tags
 * @property {string} created_at
 */

/**
 * Service para gerenciamento de medicamentos
 * @extends {CrudService<Medicament>}
 */
class MedicamentService extends CrudService {
  constructor() {
    super('medicaments')
  }

  /**
   * Busca medicamentos por nome
   * @param {string} name - Nome ou parte do nome
   * @returns {Promise<{data: Medicament[] | null, error: Error | null}>}
   */
  async searchByName(name) {
    return this.filter('name', 'ilike', `%${name}%`)
  }

  /**
   * Busca medicamentos por classe
   * @param {string} className - Nome da classe
   * @returns {Promise<{data: Medicament[] | null, error: Error | null}>}
   */
  async getByClass(className) {
    return this.filter('class', 'eq', className)
  }

  /**
   * Busca medicamentos por via de administração
   * @param {string} route - Via de administração
   * @returns {Promise<{data: Medicament[] | null, error: Error | null}>}
   */
  async getByRoute(route) {
    return this.filter('route', 'eq', route)
  }
}

export const medicamentService = new MedicamentService()
