import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'

export function SearchFilters() {
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [sort, setSort] = useState('ASC')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('minPrice')) setMinPrice(params.get('minPrice')!)
    if (params.get('maxPrice')) setMaxPrice(params.get('maxPrice')!)
    if (params.get('sort')) setSort(params.get('sort')!)
  }, [])

  const handleApplyFilters = () => {
    const params = new URLSearchParams(window.location.search)

    // Actualizamos params
    if (minPrice) params.set('minPrice', minPrice)
    else params.delete('minPrice')
    if (maxPrice) params.set('maxPrice', maxPrice)
    else params.delete('maxPrice')
    if (sort) params.set('sort', sort)

    params.set('page', '1')

    window.location.href = `/buscar?${params.toString()}`
  }

  const handleClear = () => {
    window.location.href = '/buscar'
  }

  return (
    <div className="space-y-6 p-4 border rounded-xl bg-card/50 backdrop-blur-sm sticky top-24">
      <div>
        <h3 className="font-semibold text-lg mb-1">Filtros</h3>
        <p className="text-sm text-muted-foreground mb-4">Refina tu búsqueda</p>
      </div>

      {/* FILTRO: ORDENAR */}
      <div className="space-y-2">
        <Label>Ordenar por Precio</Label>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ASC">Menor a Mayor</SelectItem>
            <SelectItem value="DESC">Mayor a Menor</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* FILTRO: RANGO DE PRECIO */}
      <div className="space-y-2">
        <Label>Precio ($)</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="h-9"
          />
          <span className="text-muted-foreground">-</span>
          <Input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="h-9"
          />
        </div>
      </div>

      <div className="pt-4 flex flex-col gap-2">
        <Button
          onClick={handleApplyFilters}
          className="w-full cursor-pointer bg-primary hover:bg-primary/90 text-white"
        >
          Aplicar Filtros
        </Button>
        <Button
          variant="ghost"
          onClick={handleClear}
          className="w-full cursor-pointer"
        >
          Limpiar Todo
        </Button>
      </div>
    </div>
  )
}
