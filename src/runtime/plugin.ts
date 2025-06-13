import {
  addRouteMiddleware,
  defineNuxtPlugin,
  navigateTo,
  useCookie,
  useRequestHeaders,
  useState
} from '#imports'
import { getLocaleFromRoute } from './utils'
import { options } from '#build/i18n'

export default defineNuxtPlugin({
  name: 'nuxt-i18n-plugin',
  enforce: 'pre',
  async setup() {
    // Add route middleware to load locale messages for the target route
    addRouteMiddleware(
      'nuxt-i18n-middleware',
      async (to, from) => {
        const cookie = useCookie('locale', { maxAge: 31536000 })
        const locale = useState<string | undefined>('locale')

        if (to.meta.ssr === false) {
          locale.value = cookie.value || locale.value || options.defaultLocale
          return
        }

        if (to.path === '/' && from.path === '/') {
          if (cookie.value && options.locales.includes(cookie.value)) {
            if (cookie.value !== options.defaultLocale) {
              return navigateTo(`/${cookie.value}`)
            } else {
              locale.value = options.defaultLocale
              return
            }
          }

          const headerLocale = (useRequestHeaders(['accept-language'])['accept-language'] || '')
            .split(',')
            .map((l) => clean(l.split(';')[0]!))
            .filter((l) => options.locales.includes(l))[0]

          if (headerLocale && headerLocale !== options.defaultLocale) {
            return navigateTo(`/${headerLocale}`)
          }

          const browserLocale
            = typeof document !== 'undefined'
              ? navigator.languages.map(clean).filter((l) => options.locales.includes(l))[0]
                || (options.locales.includes(clean(navigator.language))
                  ? clean(navigator.language)
                  : '')
              : ''

          if (browserLocale && browserLocale !== options.defaultLocale) {
            return navigateTo(`/${browserLocale}`)
          }
        }

        const targetLocale = getLocaleFromRoute(to) || options.defaultLocale
        locale.value = targetLocale
        cookie.value = targetLocale
      },
      { global: true }
    )
  }
})

function clean(str: string) {
  return str.split('-')[0]!.trim().toLowerCase()
}
