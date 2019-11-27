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

    // for pages not excludecd, create crumbs out of each section of the page path
    if (!optionsActual.exclude.includes(page.path)) {
      let acc = ''
      let crumbs = []

      const splitUrl = pathPrefix
        ? page.path.replace(new RegExp(`^${pathPrefix}`), '').split('/')
        : page.path.split('/')
      splitUrl.forEach((split, index) => {
        if (index === 0 && split === '') {
          // root or 'home' section of path
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
          // remaining sections of path
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
          // catch empty path sections
          crumbs = [...crumbs]
        }
      })
      const breadcrumb = {
        location: page.path,
        crumbs,
      }

      // inject breadcrumbs into page context
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
