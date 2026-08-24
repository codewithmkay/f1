/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_JOLPICA_BASE_URL?: string
  readonly VITE_OPENF1_BASE_URL?: string
  readonly VITE_NEWS_API_KEY?: string
  readonly VITE_NEWS_API_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
