exports.onCreatePage = ({ page, pathPrefix, actions }, pluginOptions) => {
  // TODO: remove useSitemap before v7 release
  if (pluginOptions.useSitemap || pluginOptions.useAutoGen) {
    const { createPage, deletePage } = actions

    const defaultOptions = {
      exclude: [
        `/dev-404-page`,
        `/404`,
        `/404.html`,
        `/offline-plugin-app-shell-fallback`,
      ],
    }

    const optionsActual = { ...defaultOptions, ...pluginOptions }

    if (!optionsActual.exclude.includes(page.path)) {
      let acc = ''
      let crumbs = []

      const splitUrl = pathPrefix
        ? page.path.replace(new RegExp(`^${pathPrefix}`), '').split('/')
        : page.path.split('/')
      splitUrl.forEach((split, index) => {
        if (index === 0 && split === '') {
          crumbs = [
            ...crumbs,
            {
              pathname: '/',
              // TODO: remove sitemapHomeLabel option before v7 release
              crumbLabel:
                optionsActual.sitemapHomeLabel ||
                optionsActual.autoGenHomeLabel ||
                'Home',
            },
          ]
        } else if (index !== 0 && split !== '') {
          acc += `/${split}`
          const n = acc.lastIndexOf('/')
          crumbs = [
            ...crumbs,
            {
              pathname: acc,
              crumbLabel: acc.slice(n + 1).replace(/%20/g, ' '),
            },
          ]
        } else {
          crumbs = [...crumbs]
        }
      })
      const breadcrumb = {
        location: page.path,
        crumbs,
      }

      const { context: oldPageContext } = page
      deletePage(page)
      createPage({
        ...page,
        context: {
          ...oldPageContext,
          breadcrumb,
        },
      })
    }
  }
}
