import { useState, useEffect } from 'react';
import { productService, type Product } from '../services/product.service';

const CATEGORIES = [
  { value: 'cpu', label: 'Procesadores (CPU)' },
  { value: 'gpu', label: 'Tarjetas Gráficas (GPU)' },
  { value: 'motherboard', label: 'Placas Madre' },
  { value: 'ram', label: 'Memoria RAM' },
  { value: 'storage', label: 'Almacenamiento' },
  { value: 'psu', label: 'Fuentes de Poder (PSU)' },
];

export function useComparator() {
  const [category, setCategory] = useState<string>('cpu');
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct1, setSelectedProduct1] = useState<Product | null>(null);
  const [selectedProduct2, setSelectedProduct2] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    // Parse URL params on mount
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get('category');
    if (catParam && CATEGORIES.some(c => c.value === catParam)) {
      setCategory(catParam);
    }
  }, []);

  useEffect(() => {
    fetchProducts(category);
  }, [category]);

  const fetchProducts = async (cat: string) => {
    setLoading(true);
    const productList = await productService.getProductsByCategory(cat);
    setProducts(productList);

    // Handle URL params for product selection only after products are loaded
    if (initialLoad && productList.length > 0) {
      const params = new URLSearchParams(window.location.search);
      const p1Id = params.get('p1');
      const p2Id = params.get('p2');

      if (p1Id) {
        const p1 = productList.find((p: Product) => p.id.toString() === p1Id);
        if (p1) setSelectedProduct1(p1);
      }
      if (p2Id) {
        const p2 = productList.find((p: Product) => p.id.toString() === p2Id);
        if (p2) setSelectedProduct2(p2);
      }
      setInitialLoad(false);
    } else if (!initialLoad) {
      // Reset selections when category changes manually (not initial load)
      setSelectedProduct1(null);
      setSelectedProduct2(null);
    }
    setLoading(false);
  };

  const handleProductSelect = (productId: string, slot: 1 | 2) => {
    const product = products.find((p) => p.id.toString() === productId) || null;
    if (slot === 1) {
      setSelectedProduct1(product);
    } else {
      setSelectedProduct2(product);
    }
  };

  const isNumericField = (key: string, value: any) => {
    return typeof value === 'number' && !['id', 'price', 'tdp'].includes(key);
  };

  const getMaxValue = (key: string) => {
    if (products.length === 0) return 100;
    return Math.max(...products.map(p => typeof p[key] === 'number' ? p[key] : 0));
  };

  const getAllKeys = () => {
    const keys = new Set<string>();
    if (selectedProduct1) Object.keys(selectedProduct1).forEach(k => keys.add(k));
    if (selectedProduct2) Object.keys(selectedProduct2).forEach(k => keys.add(k));

    const ignored = ['id', 'name', 'manufacturer', 'price', 'imageUrl', 'isActive', 'createdAt', 'updatedAt', 'type', 'category'];
    return Array.from(keys).filter(k => !ignored.includes(k)).sort();
  };

  return {
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
  };
}
