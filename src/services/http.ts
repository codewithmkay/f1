/**
 * Thin fetch wrapper shared by every API client (OpenF1, Jolpica, News).
 * Centralizes timeout handling, JSON parsing and error normalization so
 * components never touch `fetch` directly.
 */

export class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message)
    this.name = 'ApiError'
  }
}

interface RequestOptions {
  timeoutMs?: number
  signal?: AbortSignal
}

export async function getJSON<T>(url: string, opts: RequestOptions = {}): Promise<T> {
  const { timeoutMs = 10_000 } = opts
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)

  // Combine an externally passed signal (e.g. from a hook cleanup) with our timeout signal.
  if (opts.signal) {
    opts.signal.addEventListener('abort', () => controller.abort())
  }

  try {
    const res = await fetch(url, { signal: controller.signal })
    if (!res.ok) {
      throw new ApiError(`Request to ${url} failed with status ${res.status}`, res.status)
    }
    return (await res.json()) as T
  } catch (err) {
    if (err instanceof ApiError) throw err
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new ApiError(`Request to ${url} timed out`)
    }
    throw new ApiError(err instanceof Error ? err.message : 'Unknown network error')
  } finally {
    clearTimeout(timeout)
  }
}

/** Builds a query string from a plain object, skipping undefined/null values. */
export function buildQuery(params: Record<string, string | number | undefined | null>): string {
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) search.set(key, String(value))
  }
  const qs = search.toString()
  return qs ? `?${qs}` : ''
}
