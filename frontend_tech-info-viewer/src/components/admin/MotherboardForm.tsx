import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from "sonner"

export function MotherboardForm() {
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
        memorySlots: Number(data.memorySlots),
        m2Slots: Number(data.m2Slots),
        price: Number(data.price),
        hasWifi: data.hasWifi === 'true',
      };

      const response = await fetch('http://localhost:3000/motherboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success("Motherboard agregada correctamente al catálogo.");
        (e.target as HTMLFormElement).reset();
        setSelectedFile(null);
        setPreviewUrl('');
      } else {
        throw new Error('Error al guardar');
      }
    } catch (error) {
      toast.error("No se pudo guardar la Motherboard. Verifica tu sesión.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-border/50 shadow-xl">
      <CardHeader>
        <CardTitle>Agregar Nueva Motherboard</CardTitle>
        <CardDescription>Ingresa los detalles técnicos de la placa base.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre Modelo</Label>
              <Input id="name" name="name" placeholder="Ej: B650 AORUS ELITE" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="manufacturer">Fabricante</Label>
              <Input id="manufacturer" name="manufacturer" placeholder="Ej: Gigabyte, ASUS" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="socket">Socket</Label>
              <Input id="socket" name="socket" placeholder="Ej: AM5, LGA1700" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="chipset">Chipset</Label>
              <Input id="chipset" name="chipset" placeholder="Ej: B650, Z790" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="formFactor">Form Factor</Label>
              <Select name="formFactor" required>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ATX">ATX</SelectItem>
                  <SelectItem value="Micro-ATX">Micro-ATX</SelectItem>
                  <SelectItem value="Mini-ITX">Mini-ITX</SelectItem>
                  <SelectItem value="E-ATX">E-ATX</SelectItem>
                </SelectContent>
              </Select>
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
              <Label htmlFor="memorySlots">Ranuras de Memoria</Label>
              <Input id="memorySlots" name="memorySlots" type="number" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="m2Slots">Ranuras M.2</Label>
              <Input id="m2Slots" name="m2Slots" type="number" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hasWifi">WiFi</Label>
              <Select name="hasWifi">
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
            {isLoading ? "Guardando..." : "Guardar Motherboard"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
