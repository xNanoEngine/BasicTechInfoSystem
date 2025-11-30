import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from './ui/progress'; 
import { X } from 'lucide-react';
import { useComparator } from '@/hooks/useComparator';
import type { Product } from '@/services/product.service';

export default function Comparator() {
  const {
    category,
    setCategory,
    products,
    selectedProduct1,
    selectedProduct2,
    loading,
    handleProductSelect,
    isNumericField,
    getMaxValue,
    getAllKeys,
    CATEGORIES
  } = useComparator();

  const allKeys = getAllKeys();

  const renderProductCard = (product: Product | null, slot: 1 | 2) => {
    if (!product) {
      return (
        <div className="h-full min-h-[600px] flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl text-muted-foreground bg-muted/20">
          <p className="mb-4 text-lg font-medium">Selecciona un producto</p>
          <Select
            onValueChange={(val) => handleProductSelect(val, slot)}
            disabled={loading}
          >
            <SelectTrigger className="w-full max-w-xs">
              <SelectValue placeholder="Buscar producto..." />
            </SelectTrigger>
            <SelectContent>
              {Array.isArray(products) && products
                .filter(
                  (p) =>
                    p.id !== (slot === 1 ? selectedProduct2?.id : selectedProduct1?.id)
                )
                .map((p) => (
                  <SelectItem key={p.id} value={p.id.toString()}>
                    {p.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      );
    }

    return (
      <Card className="h-full flex flex-col relative overflow-hidden border-primary/20 shadow-lg transition-all hover:shadow-xl">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-10 hover:bg-destructive/10 hover:text-destructive"
          onClick={() => handleProductSelect('', slot)}
        >
          <X className="h-4 w-4" />
        </Button>
        {/* Fixed height image container */}
        <div className="h-48 w-full bg-muted/30 flex items-center justify-center p-4">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-contain drop-shadow-md"
            />
          ) : (
            <div className="text-muted-foreground text-sm">Sin imagen</div>
          )}
        </div>
        {/* Fixed height header */}
        <CardHeader className="pb-2 h-32 flex-shrink-0">
          <div className="flex justify-between items-start gap-2">
             <Badge variant="outline" className="mb-2">{product.manufacturer}</Badge>
             <span className="font-bold text-lg text-primary">${product.price.toLocaleString()}</span>
          </div>
          <CardTitle className="text-xl line-clamp-2" title={product.name}>
            {product.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 flex-grow">
           {/* Render all keys to ensure alignment, even if value is missing */}
           {allKeys.map((key) => {
             const value = product[key];
             const isNumeric = value !== undefined && isNumericField(key, value);
             const maxVal = isNumeric ? getMaxValue(key) : 100;
             const percentage = isNumeric ? (Number(value) / maxVal) * 100 : 0;

             return (
               <div key={key} className="space-y-1 h-12 flex flex-col justify-center">
                 <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="text-sm font-semibold">{value !== undefined ? value.toString() : '-'}</span>
                 </div>
                 {isNumeric && (
                     <Progress value={percentage} className="h-2" />
                 )}
               </div>
             )
           })}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-8 w-full max-w-6xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-card p-6 rounded-xl border shadow-sm">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Comparador de Componentes</h2>
          <p className="text-muted-foreground">Compara especificaciones técnicas lado a lado</p>
        </div>
        <div className="w-full sm:w-64">
          <Select value={category} onValueChange={(val) => {
              setCategory(val);
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative items-stretch">
         {/* VS Badge in the middle */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-background rounded-full p-2 shadow-xl border-4 border-primary/10">
            <div className="bg-primary text-primary-foreground font-black text-xl w-12 h-12 flex items-center justify-center rounded-full">
                VS
            </div>
        </div>

        <div className="w-full h-full">
          {renderProductCard(selectedProduct1, 1)}
        </div>
        <div className="w-full h-full">
          {renderProductCard(selectedProduct2, 2)}
        </div>
      </div>
    </div>
  );
}
