export interface Product {
  id: number;
  name: string;
  manufacturer: string;
  price: number;
  imageUrl?: string;
  [key: string]: any;
}

export const productService = {
  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const response = await fetch(`http://localhost:3000/${category}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      // Handle paginated response structure { data: [...], metadata: ... }
      return Array.isArray(data) ? data : (Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  async searchGlobal(params: any) {
    try {
      const searchParams = new URLSearchParams();
      if (params.query) searchParams.append('query', params.query);
      if (params.page) searchParams.append('page', params.page.toString());
      if (params.limit) searchParams.append('limit', params.limit.toString());
      if (params.minPrice) searchParams.append('minPrice', params.minPrice.toString());
      if (params.maxPrice) searchParams.append('maxPrice', params.maxPrice.toString());
      if (params.sort) searchParams.append('sort', params.sort);

      const response = await fetch(`http://localhost:3000/search?${searchParams.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to search products');
      }
      return await response.json();
    } catch (error) {
      console.error('Error searching products:', error);
      return { data: [], metadata: { totalResults: 0, totalPages: 0, currentPage: 1 } };
    }
  },

  async getProductDetail(type: string, id: string): Promise<Product | null> {
    try {
      const response = await fetch(`http://localhost:3000/${type}/${id}`);
      if (!response.ok) {
        return null;
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching product detail:', error);
      return null;
    }
  }
};
