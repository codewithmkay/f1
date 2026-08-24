import { useEffect, useState } from 'react'
import type { FetchState } from '../types/f1'

/**
 * Runs an async loader on mount (and whenever `deps` change), tracking
 * loading/error/success state. Every data-fetching hook in the app builds
 * on this so components get consistent, professional loading/error states.
 */
export function useAsync<T>(loader: () => Promise<T>, deps: React.DependencyList): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false
    setState({ status: 'loading' })

    loader()
      .then((data) => {
        if (!cancelled) setState({ status: 'success', data })
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : 'Something went wrong loading this data.'
          setState({ status: 'error', message })
        }
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return state
}
