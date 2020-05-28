exports.onCreatePage = ({ page, pathPrefix, actions }, pluginOptions) => {
  if (pluginOptions.useAutoGen) {
    const { createPage, deletePage } = actions

    const defaultOptions = {
      trailingSlashes: false,
      exclude: [],
    }

    const optionsActual = { ...defaultOptions, ...pluginOptions }
    const { crumbLabelUpdates = [], trailingSlashes } = optionsActual

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
          crumbLabelUpdates.forEach((labelUpdate) => {
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

      // if trailingSlashes add a trailing slash to the end of
      // each crumb. Excluding root (/) and crumbs including a "." (ex: 404.html)
      if (trailingSlashes) {
        crumbs.forEach((crumb, index) => {
          if (index !== 0 && crumb.pathname.indexOf('.') === -1) {
            crumbs[index].pathname = `${crumbs[index].pathname}/`
          }
        })
      }

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
