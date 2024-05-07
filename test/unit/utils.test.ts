import { assert, describe, it } from 'vitest'
import { adjustRoutePathForTrailingSlash, getLocaleRouteName } from '../../src/utils'

// Adapted from: https://github.com/intlify/routing/blob/166e3c533ee47b40bc08e3af001bef33dcf975ed/packages/vue-i18n-routing/src/__test__/resolve.test.ts
// Credit: Kazuya Kawaguchi, @intlify
// License: MIT
describe('adjustRouteDefinitionForTrailingSlash', () => {
  describe('pagePath: /foo/bar', () => {
    describe('trailingSlash: false, isChildWithRelativePath: true', () => {
      it('should be trailed with slash: /foo/bar/', () => {
        assert.equal(adjustRoutePathForTrailingSlash('/foo/bar', true, true), '/foo/bar/')
      })
    })

    describe('trailingSlash: false, isChildWithRelativePath: true', () => {
      it('should not be trailed with slash: /foo/bar/', () => {
        assert.equal(adjustRoutePathForTrailingSlash('/foo/bar', false, true), '/foo/bar')
      })
    })

    describe('trailingSlash: true, isChildWithRelativePath: false', () => {
      it('should be trailed with slash: /foo/bar/', () => {
        assert.equal(adjustRoutePathForTrailingSlash('/foo/bar', true, false), '/foo/bar/')
      })
    })

    describe('trailingSlash: false, isChildWithRelativePath: false', () => {
      it('should not be trailed with slash: /foo/bar/', () => {
        assert.equal(adjustRoutePathForTrailingSlash('/foo/bar', false, false), '/foo/bar')
      })
    })
  })

  describe('pagePath: /', () => {
    describe('trailingSlash: false, isChildWithRelativePath: true', () => {
      it('should not be trailed with slash: empty', () => {
        assert.equal(adjustRoutePathForTrailingSlash('/', false, true), '')
      })
    })
  })

  describe('pagePath: empty', () => {
    describe('trailingSlash: true, isChildWithRelativePath: true', () => {
      it('should not be trailed with slash: /', () => {
        assert.equal(adjustRoutePathForTrailingSlash('', true, true), '/')
      })
    })
  })
})

describe('getLocaleRouteName', () => {
  it('should be `route1___en`', () => {
    assert.equal(getLocaleRouteName('route1', 'en'), 'route1___en')
  })

  it('should be ` (null)___en`', () => {
    assert.equal(getLocaleRouteName(null, 'en'), '(null)___en')
  })
})
