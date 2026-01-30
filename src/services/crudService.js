import { supabase } from './supabaseClient'

/**
 * Service genérico para operações CRUD no Supabase
 * @template T - Tipo da entidade
 */
export class CrudService {
  /**
   * @param {string} tableName - Nome da tabela no Supabase
   */
  constructor(tableName) {
    this.tableName = tableName
  }

  /**
   * Busca todos os registros da tabela
   * @param {Object} options - Opções de filtro
   * @param {string} [options.orderBy] - Coluna para ordenar
   * @param {boolean} [options.ascending=true] - Ordem ascendente ou descendente
   * @param {number} [options.limit] - Limite de registros
   * @returns {Promise<{data: T[] | null, error: Error | null}>}
   */
  async getAll(options = {}) {
    const { orderBy, ascending = true, limit } = options

    let query = supabase.from(this.tableName).select('*')

    if (orderBy) {
      query = query.order(orderBy, { ascending })
    }

    if (limit) {
      query = query.limit(limit)
    }

    const { data, error } = await query
    return { data, error }
  }

  /**
   * Busca um registro pelo ID
   * @param {string|number} id - ID do registro
   * @returns {Promise<{data: T | null, error: Error | null}>}
   */
  async getById(id) {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single()

    return { data, error }
  }

  /**
   * Cria um novo registro
   * @param {Partial<T>} entity - Dados da entidade
   * @returns {Promise<{data: T | null, error: Error | null}>}
   */
  async create(entity) {
    const { data, error } = await supabase
      .from(this.tableName)
      .insert(entity)
      .select()
      .single()

    return { data, error }
  }

  /**
   * Atualiza um registro pelo ID
   * @param {string|number} id - ID do registro
   * @param {Partial<T>} entity - Dados a serem atualizados
   * @returns {Promise<{data: T | null, error: Error | null}>}
   */
  async update(id, entity) {
    const { data, error } = await supabase
      .from(this.tableName)
      .update(entity)
      .eq('id', id)
      .select()
      .single()

    return { data, error }
  }

  /**
   * Remove um registro pelo ID
   * @param {string|number} id - ID do registro
   * @returns {Promise<{error: Error | null}>}
   */
  async delete(id) {
    const { error } = await supabase
      .from(this.tableName)
      .delete()
      .eq('id', id)

    return { error }
  }

  /**
   * Busca registros com filtro personalizado
   * @param {string} column - Coluna para filtrar
   * @param {string} operator - Operador ('eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'like', 'ilike')
   * @param {any} value - Valor para filtrar
   * @returns {Promise<{data: T[] | null, error: Error | null}>}
   */
  async filter(column, operator, value) {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      [operator](column, value)

    return { data, error }
  }
}
