import { getJSON, buildQuery, ApiError } from './http'
import type { NewsArticle } from '../types/f1'

const BASE_URL = import.meta.env.VITE_NEWS_API_BASE_URL ?? 'https://newsapi.org/v2'
const API_KEY = import.meta.env.VITE_NEWS_API_KEY as string | undefined

interface NewsApiArticle {
  title: string
  description: string | null
  url: string
  urlToImage: string | null
  publishedAt: string
  source: { name: string }
}

interface NewsApiResponse {
  status: string
  articles: NewsApiArticle[]
}

/**
 * Fetches current Formula 1 headlines. Requires VITE_NEWS_API_KEY (see
 * .env.example). NewsAPI.org's free tier only allows server-side/localhost
 * requests, so a production deployment should proxy this call through a
 * small serverless function rather than calling newsapi.org directly from
 * the browser.
 */
export async function getPaddockNews(pageSize: number = 6): Promise<NewsArticle[]> {
  if (!API_KEY) {
    throw new ApiError('Missing VITE_NEWS_API_KEY — add one in your .env file to load paddock news.')
  }

  const query = buildQuery({
    q: 'Formula 1 OR F1 Grand Prix',
    language: 'en',
    sortBy: 'publishedAt',
    pageSize,
    apiKey: API_KEY,
  })

  const data = await getJSON<NewsApiResponse>(`${BASE_URL}/everything${query}`)

  return data.articles.map((a, i) => ({
    id: `${a.publishedAt}-${i}`,
    title: a.title,
    summary: a.description ?? '',
    source: a.source.name,
    url: a.url,
    imageUrl: a.urlToImage,
    publishedAt: a.publishedAt,
  }))
}
