import { useState } from 'react'
import { productService } from '@/services/product.service'
import type { SearchResultItem } from '@/components/search/hook/interfaces/search'

export function useProductSearch() {
  const [results, setResults] = useState<SearchResultItem[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const searchLive = async (query: string) => {
    if (!query) {
      setResults([])
      return
    }

    setIsLoading(true)

    const response = await productService.searchGlobal({ query, limit: 5 })
    setResults(response.data)
    setIsLoading(false)
  }

  return { results, isLoading, searchLive }
}
