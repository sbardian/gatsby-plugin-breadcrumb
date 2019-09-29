import xmlParser from 'xml2js'
import { createSitemap } from 'sitemap'
import { URL } from 'url'

let allPaths = []
let useSitemap = false

const createUrls = (pageNodes, site, serialize) => {
  const serializedPages = pageNodes.map(async node => {
    return serialize(node, site)
  })
  return Promise.all(serializedPages).then(urls => urls)
}

const getPaths = async (optionsActual, urls, site) => {
  let paths = []
  return new Promise(resolve => {
    const sitemap = createSitemap({
      hostname: site,
      cacheTime: 600000,
      urls,
    })

    const xml = sitemap.toXML()

    xmlParser.parseString(xml, (err, data) => {
      if (err) {
        // eslint-disable-next-line
        console.error(
          `gatsby-plugin-breadcrumb: Unable to parse page sitemap data`,
        )
        resolve(paths)
      }
      if (!err) {
        const locs = data.urlset.url.map(page => page.loc[0])
        const locUrls = locs.map(loc => {
          return new URL(loc).pathname
        })
        locUrls.forEach((url, urlIndex) => {
          let acc = ''
          let crumbs = []

          const splitUrl = url.split('/')
          splitUrl.forEach((split, index) => {
            if (index === 0 && split === '') {
              crumbs = [
                ...crumbs,
                {
                  pathname: '/',
                  crumbLabel: optionsActual.sitemapHomeLabel || 'Home',
                },
              ]
            } else if (index !== 0 && split !== '') {
              acc += `/${split}`
              const regEx = `${acc}$`
              locUrls.forEach(locUrl => {
                if (locUrl.match(regEx)) {
                  const n = acc.lastIndexOf('/')
                  crumbs = [
                    ...crumbs,
                    {
                      pathname: acc,
                      crumbLabel: acc.slice(n + 1).replace(/%20/g, ' '),
                    },
                  ]
                }
              })
            } else {
              crumbs = [...crumbs]
            }
          })
          paths = [...paths, { location: url, crumbs }]
          if (urlIndex === locUrls.length - 1 || locUrls.length === 0) {
            resolve(paths)
          }
        })
      }
    })
  })
}

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest, getNodesByType },
  pluginOptions,
) => {
  const { createNode } = actions
  const defaultOptions = {
    exclude: [
      `/dev-404-page`,
      `/404`,
      `/404.html`,
      `/offline-plugin-app-shell-fallback`,
    ],
    serialize: (node, site) => ({
      url: site.siteMetadata.siteUrl + node.path,
      changefreq: `daily`,
      priority: 0.7,
    }),
  }

  const optionsActual = { ...defaultOptions, ...pluginOptions }

  if (optionsActual && optionsActual.useSitemap) {
    useSitemap = true
    const siteNode = await getNodesByType('Site')
    const [site] = siteNode
    const pageNodes = await getNodesByType('SitePage')
    const newPageNodes = pageNodes.filter(
      page => !defaultOptions.exclude.includes(page.path),
    )
    const urls = await createUrls(newPageNodes, site, optionsActual.serialize)
    const newPaths = await getPaths(optionsActual, urls)
    allPaths = [...newPaths]
    newPaths.forEach(path => {
      const nodeMeta = {
        id: createNodeId(`my-data-${path.location}`),
        parent: null,
        children: [],
        internal: {
          type: `Breadcrumbs`,
          mediaType: `text/html`,
          content: JSON.stringify(path),
          contentDigest: createContentDigest(path),
        },
      }
      createNode({ ...path, ...nodeMeta })
    })
  }
}

exports.onCreatePage = ({ page, actions }) => {
  if (useSitemap) {
    const { createPage, deletePage } = actions

    allPaths.forEach(path => {
      const { context: oldPageContext } = page
      const newPathLoc = path.location.replace(/%20/g, ' ').replace('/', '')
      const newPagePath = page.path.replace('/', '')
      if (newPagePath === newPathLoc) {
        deletePage(page)
        createPage({
          ...page,
          context: {
            ...oldPageContext,
            pathname: newPagePath === '' ? `/^/$/` : `/${newPagePath}/`,
            breadcrumb: path,
          },
        })
      }
    })
  }
}
