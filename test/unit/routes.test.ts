import { type NuxtPage } from '@nuxt/schema'
import { describe, expect, it } from 'vitest'
import { localizeRoutes } from '../../src/routes'

// Adapted from: https://github.com/intlify/routing/blob/166e3c533ee47b40bc08e3af001bef33dcf975ed/packages/vue-i18n-routing/src/__test__/resolve.test.ts
// Credit: Kazuya Kawaguchi, @intlify
// License: MIT
describe('localizeRoutes', () => {
  describe('basic', () => {
    it('should be localized routing', () => {
      const routes: NuxtPage[] = [
        {
          path: '/',
          name: 'home'
        },
        {
          path: '/about',
          name: 'about'
        }
      ]
      const localeCodes = ['en', 'ja']
      const localizedRoutes = localizeRoutes(routes, {
        locales: localeCodes
      })

      expect(localizedRoutes).toMatchSnapshot()
      expect(localizedRoutes.length).to.equal(4)

      for (const locale of localeCodes) {
        for (const route of routes) {
          expect(localizedRoutes).to.deep.include({
            path: `/${locale}${route.path === '/' ? '' : route.path}`,
            name: `${route.name}___${locale}`
          })
        }
      }
    })
  })

  describe('has children', () => {
    it('should be localized routing', () => {
      const routes: NuxtPage[] = [
        {
          path: '/user/:id',
          name: 'user',
          children: [
            {
              path: 'profile',
              name: 'user-profile'
            },
            {
              path: 'posts',
              name: 'user-posts'
            }
          ]
        }
      ]
      const children = routes[0]!.children!

      const localeCodes = ['en', 'ja']
      const localizedRoutes = localizeRoutes(routes, {
        locales: localeCodes
      })

      expect(localizedRoutes).toMatchSnapshot()
      expect(localizedRoutes.length).to.equal(2)

      for (const locale of localeCodes) {
        for (const route of routes) {
          expect(localizedRoutes).to.deep.include({
            path: `/${locale}${route.path === '/' ? '' : route.path}`,
            name: `${route.name}___${locale}`,
            children: children.map((child) => ({
              path: child.path,
              name: `${child.name}___${locale}`
            }))
          })
        }
      }
    })
  })

  describe('trailing slash', () => {
    it('should be localized routing', () => {
      const routes: NuxtPage[] = [
        {
          path: '/',
          name: 'home'
        },
        {
          path: '/about',
          name: 'about'
        }
      ]
      const localeCodes = ['en', 'ja']
      const localizedRoutes = localizeRoutes(routes, {
        locales: localeCodes,
        trailingSlash: true
      })

      expect(localizedRoutes).toMatchSnapshot()
      expect(localizedRoutes.length).to.equal(4)

      for (const locale of localeCodes) {
        for (const route of routes) {
          expect(localizedRoutes).to.deep.include({
            path: `/${locale}${route.path === '/' ? '' : route.path}/`,
            name: `${route.name}___${locale}`
          })
        }
      }
    })
  })

  describe('strategy: "prefix_and_default"', () => {
    it('should be localized routing', () => {
      const routes: NuxtPage[] = [
        {
          path: '/',
          name: 'home'
        },
        {
          path: '/about',
          name: 'about'
        }
      ]
      const localeCodes = ['en', 'ja']
      const localizedRoutes = localizeRoutes(routes, {
        defaultLocale: 'en',
        locales: localeCodes
      })

      expect(localizedRoutes).toMatchSnapshot()
    })
  })

  describe('route option resolver: routing disable', () => {
    it('should be disabled routing', () => {
      const routes: NuxtPage[] = [
        {
          path: '/',
          name: 'home'
        },
        {
          path: '/about',
          name: 'about'
        }
      ]
      const localeCodes = ['en', 'ja']
      const localizedRoutes = localizeRoutes(routes, {
        locales: localeCodes,
        optionsResolver: () => null
      })

      expect(localizedRoutes).toMatchSnapshot()
    })
  })
})
