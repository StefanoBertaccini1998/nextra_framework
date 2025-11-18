# Redux + Thunk Setup Complete ✅

## Summary

Successfully implemented Redux Toolkit with Thunk for global state management and API calls in the Nextra UI application.

## What Was Done

### 1. **Dependencies Installed**
- `@reduxjs/toolkit` - Redux with modern best practices
- `react-redux` - React bindings for Redux
- `axios` - HTTP client (added to nextra-ui-lib)

### 2. **Shared API Client (nextra-ui-lib)**
- Created `ApiClient` class in `frontend/nextra-ui-lib/src/services/ApiClient.ts`
- Axios-based client with:
  - Request interceptor for JWT authentication
  - Response interceptor for error handling (401 auto-logout)
  - Methods: get, post, put, delete, patch
- Exported from `@nextra/ui-lib` for reuse across apps
- Built the library with `pnpm build`

### 3. **Redux Store Structure (nextra-ui)**
Created in `frontend/nextra-ui/src/store/`:

#### `store/store.ts`
- Configured Redux store with `configureStore`
- Combined reducers: `clients` and `auth`
- Exported typed `RootState` and `AppDispatch`

#### `store/slices/clientsSlice.ts`
- **State**: clients list, selectedClient, loading, error, sort config
- **Async Thunks**:
  - `fetchClients` - GET /clients with sorting
  - `createClient` - POST /clients
  - `updateClient` - PUT /clients/:id
  - `deleteClient` - DELETE /clients/:id
- **Reducers**: setSelectedClient, setSortColumn, setSortDirection, clearError
- Handles loading/error states automatically

#### `store/slices/authSlice.ts`
- **State**: user, token, refreshToken, loading, error, isAuthenticated
- **Async Thunks**:
  - `login` - POST /auth/login (stores token in localStorage)
  - `logout` - POST /auth/logout (clears localStorage)
  - `refreshTokenThunk` - POST /auth/refresh (refreshes JWT)
  - `getCurrentUser` - GET /auth/me (fetches user profile)
- **Reducers**: clearError, setUser
- Handles authentication flow with token persistence

### 4. **Typed Redux Hooks**
Created `hooks/redux.ts`:
```typescript
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
```
- Type-safe versions of `useDispatch` and `useSelector`
- Auto-completion and type checking for state/actions

### 5. **Provider Setup**
Updated `main.tsx`:
```tsx
<Provider store={store}>
  <App />
</Provider>
```
- Wraps entire app with Redux Provider

### 6. **Refactored ClientsPage**
Migrated from custom hooks (`useFetch`, `useMutation`) to Redux:

**Before**: Used `useFetch` and `useMutation` with local ApiClient instance

**After**:
- Uses `useAppDispatch` and `useAppSelector`
- Dispatches `fetchClients` thunk on mount
- Handles delete with `deleteClientThunk`
- Reads state from Redux store: `state.clients`
- Toast notifications on success/error
- Proper loading and error handling

## Architecture Benefits

### Why Redux + Thunk?
1. **Global State**: Clients, auth, and other data accessible from any component
2. **Predictable**: Single source of truth for application state
3. **Devtools**: Time-travel debugging, action replay, state inspection
4. **Thunks**: Async logic (API calls) co-located with state management
5. **Type Safety**: Full TypeScript support with typed hooks

### Shared Components Pattern
- **nextra-ui-lib**: Reusable components, services (ApiClient), types
- **nextra-ui**: App-specific logic, Redux store, pages, routes
- Context providers (Toast, Theme) stay in app (not library) to avoid React context issues across packages

## API Integration

### Backend Endpoint Expected Structure

#### GET /api/clients?sort=name,asc
```json
[
  {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "status": "active",
    "createdAt": "2025-01-01T00:00:00Z"
  }
]
```

#### POST /api/clients
**Request**:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+0987654321",
  "status": "active"
}
```
**Response**: Same as GET with generated `id` and `createdAt`

#### PUT /api/clients/:id
**Request**: Partial client object
**Response**: Updated client object

#### DELETE /api/clients/:id
**Response**: 204 No Content or success message

#### POST /auth/login
**Request**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
**Response**:
```json
{
  "token": "jwt-token-here",
  "refreshToken": "refresh-token-here",
  "user": {
    "id": "1",
    "email": "user@example.com",
    "name": "User Name",
    "role": "admin"
  }
}
```

## Environment Variables

Set in `frontend/nextra-ui/.env`:
```env
VITE_API_URL=http://localhost:8080/api
```

## Next Steps

1. **Start Backend**: Ensure Java Spring Boot backend is running on port 8080
2. **Test ClientsPage**: 
   ```bash
   cd frontend/nextra-ui
   pnpm dev
   ```
   Navigate to Clients page and verify:
   - Clients load from API
   - Toast shows on error (when backend is down)
   - Delete functionality works
   - Redux DevTools shows state changes

3. **Add More Features**:
   - Create client form (dispatch `createClient`)
   - Edit client form (dispatch `updateClient`)
   - Login page (dispatch `login` from authSlice)
   - Protected routes (check `state.auth.isAuthenticated`)

4. **Optional Enhancements**:
   - Add pagination to clients slice
   - Add search/filter functionality
   - Implement optimistic updates
   - Add error retry logic
   - Cache API responses

## File Structure

```
frontend/
├── nextra-ui-lib/           # Shared library
│   └── src/
│       └── services/
│           └── ApiClient.ts  # ✨ NEW: Axios API client
│
└── nextra-ui/               # Main app
    └── src/
        ├── hooks/
        │   └── redux.ts      # ✨ NEW: Typed Redux hooks
        ├── store/
        │   ├── store.ts      # ✨ NEW: Redux store config
        │   └── slices/
        │       ├── clientsSlice.ts  # ✨ NEW: Clients state + thunks
        │       └── authSlice.ts     # ✨ NEW: Auth state + thunks
        ├── pages/
        │   └── ClientsPage.tsx      # 🔄 UPDATED: Uses Redux
        └── main.tsx                 # 🔄 UPDATED: Adds Provider
```

## Testing the Setup

### 1. With Backend Running
```bash
# Terminal 1: Start backend (Java)
cd nextra-core
mvn spring-boot:run

# Terminal 2: Start frontend
cd frontend/nextra-ui
pnpm dev
```

Open http://localhost:5173/clients
- Should fetch clients from API
- Click a client to see details
- Delete button should work

### 2. Without Backend (Error Handling)
```bash
# Only start frontend
cd frontend/nextra-ui
pnpm dev
```

Open http://localhost:5173/clients
- Should show error toast: "Failed to load clients"
- Should show red error banner
- Console should log: "[App ToastProvider] addToast"

### 3. Redux DevTools
Install [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools) in Chrome/Firefox

Features:
- See all actions dispatched (fetchClients/pending, fetchClients/fulfilled, etc.)
- Inspect state tree (state.clients.clients, state.auth.user, etc.)
- Time-travel debugging (rewind actions)
- Export/import state snapshots

## Troubleshooting

### "ApiClient is not exported from '@nextra/ui-lib'"
**Solution**: Rebuild the library
```bash
cd frontend/nextra-ui-lib
pnpm build
```

### "Cannot find module './slices/authSlice'"
**Solution**: Restart TypeScript server in VS Code
- Press `Ctrl+Shift+P` → "TypeScript: Restart TS Server"

### Toast not showing
**Solution**: Already fixed! Toast is now local to the app (not in library) so context works correctly.

### API calls failing with CORS error
**Solution**: Configure Spring Boot backend CORS:
```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("*");
    }
}
```

---

**Your professor was right!** Redux + Thunk is an excellent choice for:
- Managing complex global state
- Coordinating API calls across components
- Maintaining predictable state updates
- Providing great developer experience with DevTools

The setup is now complete and ready for integration with your Java backend! 🚀
