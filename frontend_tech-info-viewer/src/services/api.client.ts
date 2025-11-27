export class ApiClient {
  private baseUrl = 'http://localhost:3000'

  protected async get<T>(
    endpoint: string,
    params?: Record<string, any>
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`)
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          url.searchParams.append(key, String(value))
        }
      })
    }

    try {
      const res = await fetch(url.toString(), {
        headers: { 'Content-Type': 'application/json' },
        // cache: 'no-store' // Descomentar si quieres evitar caché en desarrollo
      })

      if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`)

      return await res.json()
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }
}
