import { extendPages } from '@nuxt/kit'
import { type ModuleOptions } from './module'
import { type ComputedRouteOptions, type RouteOptionsResolver, localizeRoutes } from './routes'

export function setupPages(options: Required<ModuleOptions>) {
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
    const localizedPages = localizeRoutes(pages, {
      ...options,
      optionsResolver
    })
    pages.splice(0, pages.length)
    pages.unshift(...localizedPages)
  })
}
