import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState, type Key } from 'react'
// Importamos el Hook
import { useProductSearch } from '@/components/search/hook/useProductSearch'
import { slugify } from '@/lib/utils'

export function HeroSearch() {
  const [query, setQuery] = useState('')
  const { results, searchLive, isLoading } = useProductSearch()

  const handleSearch = () => {
    console.log('Buscando productos para:', query)
    if (query) window.location.href = `/buscar?q=${query}`
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    setQuery(text)
    searchLive(text)
  }

  return (
    <div className="w-full space-y-4 relative">
      {' '}
      <div className="relative flex items-center w-full gap-2">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            type="text"
            placeholder="Busca componentes..."
            className="pl-10 h-14 bg-background shadow-xl"
            value={query}
            onChange={handleChange}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />

          {/* DROPDOWN DE RESULTADOS EN VIVO (Magia de React) */}
          {query && results.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card border rounded-lg shadow-2xl z-50 overflow-hidden">
              {isLoading && (
                <div className="p-4 text-sm text-muted-foreground">
                  Buscando...
                </div>
              )}

              {!isLoading &&
                results.map((item) => (
                  <a
                    key={`${item.type}-${item.id}`}
                    href={`/producto/${item.type}/${item.id}-${slugify(
                      item.name
                    )}`}
                    className="flex items-center gap-4 p-3 hover:bg-muted transition-colors cursor-pointer"
                  >
                    <div className="h-10 w-10 bg-muted rounded flex items-center justify-center text-xs overflow-hidden">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={String(item.name || '')}
                          className="mix-blend-multiply dark:mix-blend-normal object-contain"
                        />
                      ) : (
                        'Img'
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-xs text-primary font-bold">
                        ${item.price}
                      </p>
                    </div>
                  </a>
                ))}
            </div>
          )}
        </div>

        <Button
          size="lg"
          className="h-14 px-6 bg-indigo-600 hover:bg-indigo-700 text-white"
          onClick={handleSearch}
        >
          Buscar
        </Button>
      </div>
    </div>
  )
}
