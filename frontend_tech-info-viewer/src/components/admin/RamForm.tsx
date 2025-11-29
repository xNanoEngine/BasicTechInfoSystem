import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from "sonner"

export function RamForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('http://localhost:3000/files/upload', {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    if (!response.ok) throw new Error('Error al subir imagen');
    const data = await response.json();
    return data.secureUrl;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setIsLoading(true);
    
    try {
      let finalImageUrl = '';

      if (selectedFile) {
        try {
          finalImageUrl = await uploadImage(selectedFile);
        } catch (error) {
          console.error(error);
          toast.error("Error al subir la imagen. No se guardó el producto.");
          setIsLoading(false);
          return;
        }
      }

      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      // Convert types
      const payload = {
        ...data,
        imageUrl: finalImageUrl,
        capacity: Number(data.capacity),
        speed: Number(data.speed),
        latency: Number(data.latency),
        modules: Number(data.modules),
        price: Number(data.price),
        hasRgb: data.hasRgb === 'true',
      };

      const response = await fetch('http://localhost:3000/ram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success("RAM agregada correctamente al catálogo.");
        (e.target as HTMLFormElement).reset();
        setSelectedFile(null);
        setPreviewUrl('');
      } else {
        throw new Error('Error al guardar');
      }
    } catch (error) {
      toast.error("No se pudo guardar la RAM. Verifica tu sesión.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-border/50 shadow-xl">
      <CardHeader>
        <CardTitle>Agregar Nueva RAM</CardTitle>
        <CardDescription>Ingresa los detalles técnicos de la memoria RAM.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre Modelo</Label>
              <Input id="name" name="name" placeholder="Ej: Vengeance RGB Pro" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="manufacturer">Fabricante</Label>
              <Input id="manufacturer" name="manufacturer" placeholder="Ej: Corsair, G.Skill" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="memoryType">Tipo de Memoria</Label>
              <Select name="memoryType" required>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DDR4">DDR4</SelectItem>
                  <SelectItem value="DDR5">DDR5</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">Capacidad Total (GB)</Label>
              <Input id="capacity" name="capacity" type="number" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="speed">Velocidad (MHz)</Label>
              <Input id="speed" name="speed" type="number" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="latency">Latencia (CL)</Label>
              <Input id="latency" name="latency" type="number" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="modules">Cantidad de Módulos</Label>
              <Input id="modules" name="modules" type="number" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hasRgb">RGB</Label>
              <Select name="hasRgb">
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Sí</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Precio ($)</Label>
              <Input id="price" name="price" type="number" placeholder="0.00" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Imagen del Producto</Label>
            <div className="flex gap-4 items-center">
              <Input 
                id="image" 
                type="file" 
                accept="image/*"
                onChange={handleImageSelect}
                className="cursor-pointer"
              />
            </div>
            
            {previewUrl && (
              <div className="mt-2 relative w-32 h-32 border rounded-md overflow-hidden">
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Guardando..." : "Guardar RAM"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
