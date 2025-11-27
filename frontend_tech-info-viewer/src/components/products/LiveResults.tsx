// src/components/products/LiveResults.tsx
import { useProductSearch } from '@/components/search/hook/useProductSearch'
import { useEffect } from 'react'

export function LiveResults() {
  // Usamos el Hook
  const {
    results: products,
    isLoading,
    searchLive: search,
  } = useProductSearch()

  const handleType = (text: string) => {
    search(text)
  }

  return (
    <div>
      <input
        onChange={(e) => handleType(e.target.value)}
        placeholder="Busca en vivo..."
      />

      {isLoading && <p>Cargando...</p>}

      {products.map((p) => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  )
}
