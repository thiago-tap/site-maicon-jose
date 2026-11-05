/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SITE_VITRINE_URL: string
  readonly SITE_TENANT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
