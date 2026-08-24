import { useAsync } from './useAsync'
import { getPaddockNews } from '../services/news'
import type { FetchState, NewsArticle } from '../types/f1'

export function useNews(pageSize: number = 6): FetchState<NewsArticle[]> {
  return useAsync(() => getPaddockNews(pageSize), [pageSize])
}
