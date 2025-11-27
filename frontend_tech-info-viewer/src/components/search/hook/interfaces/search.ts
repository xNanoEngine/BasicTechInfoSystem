// src/interfaces/search.ts

export interface SearchMetadata {
  totalResults: number
  currentPage: number
  perPage: number
  totalPages: number
}

export interface SearchResultItem {
  id: number
  name: string
  price: number
  image_url?: string
  imageUrl?: string
  manufacturer: string
  type: 'cpu' | 'gpu' | 'ram' | 'psu' | 'motherboard' | 'storage'
  category: string
}

export interface SearchResponse {
  metadata: SearchMetadata
  data: SearchResultItem[]
}

export interface SearchParams {
  query?: string
  page?: number
  limit?: number
  minPrice?: number
  maxPrice?: number
  sort?: 'ASC' | 'DESC'
  brand?: string
}
