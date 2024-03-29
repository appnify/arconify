import { toKebabCase } from '@vexip-ui/utils'
import * as compiler from '@vue/compiler-sfc'
import { compare } from 'compare-versions'
import { defineConfigWithTheme } from 'vitepress'
import { highlight } from '../build/highlight'
import { markdownItSetup } from '../build/markdown'
import type { AsideMenuTag, ThemeConfig } from '../theme/types'
import { getComponentConfig } from './component'
import { getGuideConfig } from './guide'
import { getHeadConfig } from './head'
import { getUpdatedFiles } from './updated'

compiler.parseCache.max = 10000

const SITE_DESC = 'A Vue 3 UI library, highly customizability, full TypeScript, performance pretty good.'
const SITE_TITLE = 'Arconify UI - Make interesting in development'
const SITE_DESC_ZH = '一个 Vue 3 组件库，高度可定制化，全量 TypeScript，性能很不错。'
const SITE_TITLE_ZH = 'Arconify UI - 创造有趣的开发体验'

export default async () => {
  const updated = await getUpdatedFiles()

  return defineConfigWithTheme<ThemeConfig>({
    titleTemplate: 'Arconify UI',
    lastUpdated: true,
    ignoreDeadLinks: true,
    head: getHeadConfig(),
    markdown: {
      highlight,
      config: markdownItSetup,
    },
    vue: {
      compiler: compiler as any,
      template: {
        compilerOptions: {
          isCustomElement: tag => tag === 'iconify-icon',
        },
      },
    },
    themeConfig: {
      asideMenus: {},
      nav: [
        {
          key: 'guides',
          i18n: 'common.guides',
          link: '/guide/intro',
          activeMatch: '/guide/',
        },
        {
          key: 'components',
          i18n: 'common.components',
          link: '/component/form',
          activeMatch: '/component/',
        },
        // {
        //   key: 'ecosystem',
        //   i18n: 'common.ecosystem',
        //   items: [
        //     {
        //       key: 'official',
        //       i18n: 'common.official',
        //       items: [
        //         {
        //           key: 'create-vexip',
        //           text: 'Create Vexip',
        //           link: 'https://github.com/vexip-ui/create-vexip',
        //         },
        //         {
        //           key: 'nuxt-module',
        //           text: 'Vexip Nuxt Module',
        //           link: 'https://github.com/vexip-ui/nuxt',
        //         },
        //         {
        //           key: 'lint-config',
        //           text: 'Vexip Lint Config',
        //           link: 'https://github.com/vexip-ui/lint-config',
        //         },
        //       ],
        //     },
        //     {
        //       key: 'partnership',
        //       i18n: 'common.partnership',
        //       items: [
        //         {
        //           key: 'fantastic-admin',
        //           text: 'Fantastic-admin',
        //           link: 'https://fantastic-admin.gitee.io/',
        //         },
        //         {
        //           key: 'become-partner',
        //           i18n: 'common.becomePartner',
        //           link: 'mailto:544022268@qq.com',
        //         },
        //       ],
        //     },
        //   ],
        // },
      ],
      outline: {
        '/guide/': 2,
        '/component/': 3,
      },
      editLink: {
        pattern: 'https://github.com/appnify/arconify/edit/main/docs/:path',
      },
      footerLinks: [],
    },
    locales: {
      'en-US': {
        label: 'English',
        lang: 'en-US',
        description: SITE_DESC,
        head: [
          ['meta', { property: 'og:description', content: SITE_DESC }],
          ['meta', { property: 'og:title', content: SITE_TITLE }],
        ],
        themeConfig: {
          asideMenus: getAsideMenus(updated['en-US']),
          footerLinks: getFooterLinks('en-US'),
        },
      },
      'zh-CN': {
        label: '中文',
        lang: 'zh-CN',
        description: SITE_DESC_ZH,
        head: [
          ['meta', { property: 'og:description', content: SITE_DESC_ZH }],
          ['meta', { property: 'og:title', content: SITE_TITLE_ZH }],
        ],
        themeConfig: {
          asideMenus: getAsideMenus(updated['zh-CN']),
          footerLinks: getFooterLinks('zh-CN'),
        },
      },
    },
  })
}

let version: string | undefined

function queryLibVersion() {
  if (version) return version

  try {
    version = '0.0.1'
  } catch (e) {
    console.error(e)
  }

  if (!version) {
    throw new Error('[vexip-ui:docs] failed to load vexip-ui version, please check')
  }

  return version
}

function getAsideMenus(updatedFiles?: Set<string>): ThemeConfig['asideMenus'] {
  const minorVersion = queryLibVersion().split('.').slice(0, 2).join('.') + '.x'

  const getTagConfig = (link: string, since?: string) => {
    const tags: AsideMenuTag[] = []

    if (since) {
      if (compare(since, minorVersion, '>')) {
        return [
          {
            text: 'Coming',
            type: 'warning' as const,
          },
        ]
      }
      const tag = compare(since, minorVersion, '=')
        ? {
            text: 'New',
            type: 'error' as const,
          }
        : null

      tag && tags.push(tag)
    }

    if (updatedFiles?.size && updatedFiles.has(link)) {
      tags.push({
        text: 'Updated',
        type: 'success' as const,
      })
    }

    return tags
  }

  return {
    '/guide/': getGuideConfig().map(group => {
      return {
        key: group.name,
        i18n: `guide.${group.name}`,
        items: group.guides.map(guide => {
          return {
            key: guide.name,
            link: `/guide/${guide.name}`,
            i18n: `guide.${guide.i18n}`,
            tags: getTagConfig(`/guide/${guide.name}`),
          }
        }),
      }
    }),
    '/component/': getComponentConfig().map(group => {
      return {
        key: group.name,
        i18n: `group.${group.name}`,
        count: true,
        items: group.components.map(component => {
          const link = `/component/${toKebabCase(component.name)}`

          return {
            key: component.name,
            link,
            text: component.name,
            subI18n: `component.${component.name}`,
            noSub: ['en-US'],
            tags: getTagConfig(link, component.since),
          }
        }),
      }
    }),
  }
}

function getFooterLinks(lang: 'zh-CN' | 'en-US'): ThemeConfig['footerLinks'] {
  const t = (s: string) => `footer.${s}`

  return [
    {
      i18n: t('resources'),
      items: [
        {
          text: 'Starter Vue',
          subI18n: '后台模板',
          link: 'https://github.com/appnify/starter-vue',
        },
        {
          text: 'JueTan Nav',
          subI18n: '绝弹导航',
          link: 'https://github.com/juetan/nav',
        },
      ],
    },
    {
      i18n: t('help'),
      items: [
        {
          text: 'GitHub',
          link: 'https://github.com/juetan/arconify',
        },
        {
          i18n: t('changelog'),
          link: 'https://github.com/juetan/arconify/blob/main/CHANGELOG.md',
        },
        {
          i18n: t('issue'),
          link: 'https://github.com/juetan/arconify/issues',
        },
        {
          i18n: t('contribute'),
          link: 'https://github.com/juetan/arconify/blob/main/CONTRIBUTING.md',
        },
      ],
    },
  ]
}
