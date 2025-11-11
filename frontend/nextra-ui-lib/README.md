# nextra-ui-lib

Lightweight shared UI library used by the `nextra-ui` app. It provides core components, a theme, small utilities and a tiny API client + auth hook for JWT backends.

Quick start
- Add the package to your app (in a monorepo you can import from the workspace path).
- Set the backend URL via Vite env variable: `VITE_API_BASE_URL` (default: `http://localhost:8080`).

Usage example (login + list properties)
1. Call `api.setBaseUrl(import.meta.env.VITE_API_BASE_URL)` or rely on the env var.
2. Use `useAuth()` to login: `const { login } = useAuth(); await login({ username, password })`.
3. Call `api.get('/api/properties', { query: { page: 0, size: 12 } })`. The backend returns `ApiResponse<PagedResponse<Property>>`, the example page normalizes the response.

Files of interest
- `src/components/ListingView.tsx` — generic listing grid
- `src/services/api.ts` — fetch-based helper with token support
- `src/hooks/useAuth.tsx` — login/logout hook (stores JWT in localStorage)
- `src/examples/PropertiesListExample.tsx` — example showing login + listing

Notes
- The backend (Java Spring) wraps responses in `ApiResponse<T> { success, message, data }`. The helpers and example are tolerant to that wrapper.
- `react` and `react-dom` are peerDependencies; the library provides small components to avoid pulling the app.
