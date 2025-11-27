// src/config/product-specs.ts

export interface SpecDefinition {
  key: string
  label: string
  unit?: string
  type?: 'boolean' | 'text' | 'frequency' | 'capacity'
}

export const productSpecsConfig: Record<string, SpecDefinition[]> = {
  cpu: [
    { key: 'manufacturer', label: 'Fabricante' },
    { key: 'socket', label: 'Socket' },
    { key: 'cores', label: 'Núcleos' },
    { key: 'threads', label: 'Hilos' },
    { key: 'baseClock', label: 'Frecuencia Base', unit: 'GHz' },
    { key: 'boostClock', label: 'Frecuencia Turbo', unit: 'GHz' },
    { key: 'tdp', label: 'TDP', unit: 'W' },
  ],
  gpu: [
    { key: 'manufacturer', label: 'Fabricante Chipset' }, // Nvidia/AMD
    { key: 'vram', label: 'Memoria VRAM', unit: 'GB' },
    { key: 'tdp', label: 'TDP', unit: 'W' },
    // Si tuvieras 'length' o 'fans' en el futuro, los agregas aquí
  ],
  motherboard: [
    { key: 'manufacturer', label: 'Fabricante' },
    { key: 'socket', label: 'Socket' },
    { key: 'chipset', label: 'Chipset' },
    { key: 'formFactor', label: 'Formato' },
    { key: 'memoryType', label: 'Tipo Memoria' },
    { key: 'memorySlots', label: 'Ranuras RAM' },
    { key: 'm2Slots', label: 'Ranuras M.2' },
    { key: 'hasWifi', label: 'WIFI Incluido', type: 'boolean' },
  ],
  ram: [
    { key: 'manufacturer', label: 'Fabricante' },
    { key: 'memoryType', label: 'Tecnología' },
    { key: 'capacity', label: 'Capacidad Total', unit: 'GB' },
    { key: 'speed', label: 'Velocidad', unit: 'MHz' },
    { key: 'latency', label: 'Latencia', unit: 'CL' },
    { key: 'modules', label: 'Cantidad de Módulos' },
    { key: 'hasRgb', label: 'Iluminación RGB', type: 'boolean' },
  ],
  psu: [
    { key: 'manufacturer', label: 'Fabricante' },
    { key: 'wattage', label: 'Potencia', unit: 'W' },
    { key: 'certification', label: 'Certificación 80+' },
    { key: 'modularity', label: 'Modularidad' },
    { key: 'formFactor', label: 'Formato' },
  ],
  storage: [
    { key: 'manufacturer', label: 'Fabricante' },
    { key: 'type', label: 'Tipo' }, // SSD / HDD
    { key: 'formFactor', label: 'Formato' }, // M.2 / 2.5"
    { key: 'interface', label: 'Interfaz' }, // PCIe 4.0 / SATA
    { key: 'capacity', label: 'Capacidad', unit: 'GB' },
    { key: 'readSpeed', label: 'Velocidad Lectura', unit: 'MB/s' },
    { key: 'writeSpeed', label: 'Velocidad Escritura', unit: 'MB/s' },
  ],
}

// Función Helper para formatear el valor
export function formatValue(value: any, definition: SpecDefinition): string {
  if (value === null || value === undefined) return '-'

  if (definition.type === 'boolean') {
    return value ? 'Sí' : 'No'
  }

  if (definition.unit) {
    return `${value} ${definition.unit}`
  }

  return String(value)
}
