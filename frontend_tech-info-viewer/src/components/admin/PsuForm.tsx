import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from "sonner"

export function PsuForm() {
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
        wattage: Number(data.wattage),
        price: Number(data.price),
      };

      const response = await fetch('http://localhost:3000/psu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success("PSU agregada correctamente al catálogo.");
        (e.target as HTMLFormElement).reset();
        setSelectedFile(null);
        setPreviewUrl('');
      } else {
        throw new Error('Error al guardar');
      }
    } catch (error) {
      toast.error("No se pudo guardar la PSU. Verifica tu sesión.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-border/50 shadow-xl">
      <CardHeader>
        <CardTitle>Agregar Nueva PSU</CardTitle>
        <CardDescription>Ingresa los detalles técnicos de la fuente de poder.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre Modelo</Label>
              <Input id="name" name="name" placeholder="Ej: RM850x" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="manufacturer">Fabricante</Label>
              <Input id="manufacturer" name="manufacturer" placeholder="Ej: Corsair, EVGA" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="wattage">Potencia (W)</Label>
              <Input id="wattage" name="wattage" type="number" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="certification">Certificación</Label>
              <Select name="certification" required>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="80 Plus White">80 Plus White</SelectItem>
                  <SelectItem value="80 Plus Bronze">80 Plus Bronze</SelectItem>
                  <SelectItem value="80 Plus Silver">80 Plus Silver</SelectItem>
                  <SelectItem value="80 Plus Gold">80 Plus Gold</SelectItem>
                  <SelectItem value="80 Plus Platinum">80 Plus Platinum</SelectItem>
                  <SelectItem value="80 Plus Titanium">80 Plus Titanium</SelectItem>
                  <SelectItem value="None">Ninguna</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="modularity">Modularidad</Label>
              <Select name="modularity" required>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full Modular">Full Modular</SelectItem>
                  <SelectItem value="Semi Modular">Semi Modular</SelectItem>
                  <SelectItem value="Non Modular">Non Modular</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="formFactor">Form Factor</Label>
              <Select name="formFactor" required>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ATX">ATX</SelectItem>
                  <SelectItem value="SFX">SFX</SelectItem>
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
            {isLoading ? "Guardando..." : "Guardar PSU"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
