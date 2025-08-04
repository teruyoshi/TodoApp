function getApiBaseUrl(): string {
  if (
    typeof window !== 'undefined' &&
    (window.location.hostname === 'front' || window.location.hostname === 'go')
  ) {
    return 'http://go:8080'
  }
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'
}

export default getApiBaseUrl
