exports.onCreatePage = ({ page, pathPrefix, actions }, pluginOptions) => {
  if (pluginOptions.useAutoGen) {
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
    const { crumbLabelUpdates = [] } = optionsActual

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
              crumbLabel: optionsActual.autoGenHomeLabel || 'Home',
            },
          ]
        } else if (index !== 0 && split !== '') {
          // remaining sections of path
          acc += `/${split}`
          const n = acc.lastIndexOf('/')

          // update crumbLabel for any crumbLabelUpdates otherwise use path
          let crumbLabel = acc.slice(n + 1).replace(/%20/g, ' ')
          crumbLabelUpdates.forEach(labelUpdate => {
            if (labelUpdate.pathname === acc) {
              crumbLabel = labelUpdate.crumbLabel
            }
          })

          crumbs = [
            ...crumbs,
            {
              pathname: acc,
              crumbLabel,
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
