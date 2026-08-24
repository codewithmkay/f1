import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { FetchState, NewsArticle } from '../types/f1'
import { timeAgo } from '../utils/format'
import { SectionHeading } from './ui/SectionHeading'
import { LoadingState, ErrorState, EmptyState } from './ui/States'

export function NewsSection({ state }: { state: FetchState<NewsArticle[]> }) {
  return (
    <section id="news" className="relative mx-auto max-w-7xl px-5 sm:px-8 py-24 sm:py-32">
      <SectionHeading eyebrow="The Paddock" title="Latest Stories" description="Current headlines from around the grid." />

      <div className="mt-12">
        {state.status === 'loading' && <LoadingState label="Loading paddock news" />}
        {state.status === 'error' && (
          <ErrorState message="Paddock news needs a NewsAPI key — add VITE_NEWS_API_KEY to your .env file to load live stories." />
        )}
        {state.status === 'success' && state.data.length === 0 && (
          <EmptyState message="No stories found right now — check back shortly." />
        )}
        {state.status === 'success' && state.data.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {state.data.map((article, i) => (
              <motion.a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: Math.min(i * 0.06, 0.3) }}
                className="group flex flex-col overflow-hidden rounded-xl border border-carbon-border bg-carbon transition-colors hover:border-violet/50"
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-carbon-light">
                  {article.imageUrl ? (
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        ;(e.currentTarget as HTMLImageElement).style.display = 'none'
                      }}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center font-display text-4xl font-black text-carbon-border">
                      APEX
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest2 text-mist-dim">
                    <span>{article.source}</span>
                    <span>{timeAgo(article.publishedAt)}</span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-bold leading-snug text-white group-hover:text-violet-glow transition-colors">
                    {article.title}
                  </h3>
                  {article.summary && (
                    <p className="mt-2 line-clamp-2 text-sm text-mist">{article.summary}</p>
                  )}
                  <div className="mt-4 flex items-center gap-1 text-xs text-violet-glow">
                    Read story
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
