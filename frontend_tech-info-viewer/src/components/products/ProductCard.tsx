import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface ProductProps {
  title: string
  category: string
  price: string
  image: string
  isNew?: boolean
}

export function ProductCard({
  title,
  category,
  price,
  image,
  isNew,
}: ProductProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-muted/60 bg-card">
      <CardHeader className="p-0 relative aspect-square overflow-hidden bg-muted/20">
        {isNew && (
          <Badge className="absolute top-2 right-2 z-10 bg-indigo-600 hover:bg-indigo-700">
            Nuevo
          </Badge>
        )}
        {/* Placeholder de imagen */}
        <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-gray-100 dark:bg-zinc-900 group-hover:scale-105 transition-transform duration-500">
          <img
            src={image}
            alt={`Imagen de ${title}`}
            className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
          />
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">
          {category}
        </p>
        <h3 className="font-bold text-lg leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="font-medium mt-2 text-xl">{price}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          variant="outline"
          className="w-full group-hover:border-indigo-500 group-hover:text-indigo-600 transition-colors cursor-pointer"
        >
          Ver Detalles <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  )
}
