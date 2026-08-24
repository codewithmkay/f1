import { AlertTriangle, Inbox, Loader2 } from 'lucide-react'

export function LoadingState({ label = 'Pulling live data' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-mist-dim">
      <Loader2 className="h-6 w-6 animate-spin text-violet" />
      <p className="font-mono text-xs uppercase tracking-widest2">{label}</p>
    </div>
  )
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-carbon-border bg-carbon/60 py-16 text-center">
      <AlertTriangle className="h-6 w-6 text-gold" />
      <p className="max-w-sm text-sm text-mist">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-1 rounded-full border border-carbon-border px-4 py-1.5 text-xs uppercase tracking-widest2 text-mist hover:border-violet hover:text-white transition-colors"
        >
          Retry
        </button>
      )}
    </div>
  )
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-carbon-border py-16 text-center">
      <Inbox className="h-6 w-6 text-mist-dim" />
      <p className="max-w-sm text-sm text-mist-dim">{message}</p>
    </div>
  )
}
