import { ApiClient } from './api.client'
import type {
  SearchResponse,
  SearchParams,
} from '@/components/search/hook/interfaces/search'

class ProductService extends ApiClient {
  [x: string]: any
  async searchGlobal(params: SearchParams): Promise<SearchResponse> {
    try {
      console.log('ProductService.searchGlobal called with params:', params)
      return await this.get<SearchResponse>('/search', params)
    } catch (error) {
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
  }

  async getProductDetail(type: string, id: string | number): Promise<any> {
    const endpoint = `/${type}/${id}`
    try {
      return await this.get<any>(endpoint)
    } catch (error) {
      console.error(`Error fetching ${type} ${id}:`, error)
      return null
    }
  }

  async getBySlug(slug: string) {
    // return this.get(`/products/${slug}`);
  }
}

export const productService = new ProductService()
