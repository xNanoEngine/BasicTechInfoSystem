// src/lib/api.ts
import type {
  SearchResponse,
  SearchParams,
} from '../components/search/hook/interfaces/search'

const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000'

export const api = {
  searchGlobal: async (params: SearchParams): Promise<SearchResponse> => {
    const urlParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        urlParams.append(key, String(value))
      }
    })

    try {
      const res = await fetch(`${API_URL}/search?${urlParams.toString()}`)
      if (!res.ok) {
        throw new Error(`Error API: ${res.statusText}`)
      }
      return await res.json()
    } catch (error) {
      console.error('Error buscando productos:', error)
      return {
        metadata: {
          totalResults: 0,
          currentPage: 1,
          perPage: 20,
          totalPages: 0,
        },
        data: [],
      }
    }
  },
}
