import { extendPages } from '@nuxt/kit'
import { defu } from 'defu'
import { type NitroRouteRules } from 'nitropack'
import { createRouter as createRadixRouter, toRouteMatcher } from 'radix3'
import { type ModuleOptions } from './module'
import { type ComputedRouteOptions, type RouteOptionsResolver, localizeRoutes } from './routes'

export function setupPages(options: Required<ModuleOptions>, routeRules: NitroRouteRules) {
  const optionsResolver: RouteOptionsResolver = (route, localeCodes) => {
    const routeOptions: ComputedRouteOptions = {
      locales: localeCodes,
      paths: {}
    }

    // Set custom localized route paths
    if (Object.keys(options.pages).length) {
      for (const locale of localeCodes) {
        const customPath = options.pages?.[route.name!]?.[locale]
        if (customPath) {
          routeOptions.paths[locale] = customPath
        }
      }
    }

    return routeOptions
  }

  extendPages((pages) => {
    const routeRulesMatcher = toRouteMatcher(createRadixRouter({ routes: routeRules }))

    pages.forEach((page) => {
      const { ssr } = defu({} as any, ...routeRulesMatcher.matchAll(page.path).reverse())
      ssr === false && (page.meta = defu({}, page.meta, { ssr }))
    })

    const localizedPages = localizeRoutes(pages, { ...options, optionsResolver })

    pages.splice(0, pages.length)
    pages.unshift(...localizedPages)
  })
}
