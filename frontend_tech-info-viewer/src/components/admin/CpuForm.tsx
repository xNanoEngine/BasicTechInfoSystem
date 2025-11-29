import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from "sonner"

export function CpuForm() {
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
        cores: Number(data.cores),
        threads: Number(data.threads),
        baseClock: Number(data.baseClock),
        boostClock: Number(data.boostClock),
        tdp: Number(data.tdp),
        price: Number(data.price),
      };

      const response = await fetch('http://localhost:3000/cpu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success("CPU agregado correctamente al catálogo.");
        (e.target as HTMLFormElement).reset();
        setSelectedFile(null);
        setPreviewUrl('');
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Error desconocido' }));
        console.error('Error creating CPU:', response.status, errorData);
        throw new Error(errorData.message || 'Error al guardar');
      }
    } catch (error: any) {
      console.error('Submission error:', error);
      toast.error(`Error: ${error.message || "No se pudo guardar el CPU"}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-border/50 shadow-xl">
      <CardHeader>
        <CardTitle>Agregar Nuevo CPU</CardTitle>
        <CardDescription>Ingresa los detalles técnicos del procesador.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre Modelo</Label>
              <Input id="name" name="name" placeholder="Ej: Ryzen 7 7800X3D" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="manufacturer">Fabricante</Label>
              <Select name="manufacturer" required>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Intel">Intel</SelectItem>
                  <SelectItem value="AMD">AMD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="socket">Socket</Label>
              <Input id="socket" name="socket" placeholder="Ej: AM5, LGA1700" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Precio ($)</Label>
              <Input id="price" name="price" type="number" placeholder="0.00" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cores">Núcleos</Label>
              <Input id="cores" name="cores" type="number" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="threads">Hilos</Label>
              <Input id="threads" name="threads" type="number" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="baseClock">Frecuencia Base (GHz)</Label>
              <Input id="baseClock" name="baseClock" type="number" step="0.1" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="boostClock">Frecuencia Boost (GHz)</Label>
              <Input id="boostClock" name="boostClock" type="number" step="0.1" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tdp">TDP (W)</Label>
              <Input id="tdp" name="tdp" type="number" required />
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
            {isLoading ? "Guardando..." : "Guardar CPU"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
