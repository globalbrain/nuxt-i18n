import { useLogger } from '@nuxt/kit'

export const logger = useLogger('nuxt-i18n')

export function adjustRoutePathForTrailingSlash(
  pagePath: string,
  trailingSlash: boolean,
  isChildWithRelativePath: boolean
): string {
  return pagePath.replace(/\/+$/, '') + (trailingSlash ? '/' : '') || (isChildWithRelativePath ? '' : '/')
}

export function getRouteName(routeName?: string | symbol | null): string {
  return typeof routeName === 'string'
    ? routeName
    : typeof routeName === 'symbol'
      ? routeName.toString()
      : '(null)'
}

export function getLocaleRouteName(
  routeName: string | null,
  locale: string
): string {
  return getLocalizeRouteName(getRouteName(routeName), locale)
}

export function getLocalizeRouteName(
  routeName: string | null,
  locale: string
): string {
  return `${routeName}___${locale}`
}
