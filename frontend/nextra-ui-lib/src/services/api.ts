// Lightweight fetch-based API helper with JWT support
export type RequestOptions = RequestInit & { query?: Record<string, string | number | boolean> };

// Use Vite's import.meta.env in libraries to avoid referencing `process` at runtime in browsers.
const envBase = (typeof import.meta !== 'undefined' && (import.meta as any).env && (import.meta as any).env.VITE_API_BASE_URL) || '';
let baseUrl = (envBase as string) || '';
let token: string | null = null;

export function setBaseUrl(url: string) {
    baseUrl = url;
}

export function setToken(t: string | null) {
    token = t;
}

function buildUrl(path: string, query?: Record<string, any>) {
    const url = path.startsWith('http') ? path : `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
    if (!query) return url;
    const params = new URLSearchParams();
    Object.entries(query).forEach(([k, v]) => params.set(k, String(v)));
    return `${url}?${params.toString()}`;
}

async function request<T = any>(method: string, path: string, body?: any, opts?: RequestOptions): Promise<T> {
    const headers: Record<string, string> = Object.assign({}, (opts && (opts.headers as Record<string, string>)) || {});
    headers['Accept'] = 'application/json';
    if (body && !(body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const url = buildUrl(path, opts?.query as any);
    const res = await fetch(url, {
        method,
        body: body && !(body instanceof FormData) ? JSON.stringify(body) : body,
        ...opts,
        headers,
    });

    if (!res.ok) {
        const text = await res.text();
        let json: any = text;
        try { json = JSON.parse(text); } catch { }
        const err: any = new Error(res.statusText || 'Request failed');
        err.status = res.status;
        err.body = json;
        throw err;
    }

    const ct = res.headers.get('content-type') || '';
    if (ct.includes('application/json')) return res.json();
    return (res.text() as unknown) as T;
}

export const api = {
    setBaseUrl,
    setToken,
    get: <T = any>(path: string, opts?: RequestOptions) => request<T>('GET', path, undefined, opts),
    post: <T = any>(path: string, body?: any, opts?: RequestOptions) => request<T>('POST', path, body, opts),
    put: <T = any>(path: string, body?: any, opts?: RequestOptions) => request<T>('PUT', path, body, opts),
    del: <T = any>(path: string, opts?: RequestOptions) => request<T>('DELETE', path, undefined, opts),
};
