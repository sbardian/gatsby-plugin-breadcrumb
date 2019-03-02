import fs from 'fs-extra';
import path from 'path';
import xmlParser from 'xml2js';

let paths = [];
let useSitemap = true;

exports.sourceNodes = (_, pluginOptions) => {
  const publicPath = `./public`;

  if (pluginOptions && !pluginOptions.sitemapPath) {
    throw new Error(
      'You must define a `sitemapPath` option to `gatsby-plugin-breadcrumb` when using sitemap',
    );
  }

  if (!pluginOptions) {
    useSitemap = false;
  }

  if (pluginOptions && pluginOptions.sitemapPath) {
    const xmlPath = path.join(publicPath, pluginOptions.sitemapPath);
    fs.readFile(xmlPath, (err, fileData) => {
      if (!err) {
        const json = xmlParser.parseString(fileData, (err, data) => {
          if (!err) {
            const locs = data.urlset.url.map(page => page.loc[0]);
            const locUrls = locs.map(path => {
              return new URL(path).pathname;
            });
            locUrls.forEach(url => {
              let acc = '';
              let crumbs = [];

              const splitUrl = url.split('/');
              splitUrl.forEach((split, index) => {
                if (index === 0 && split === '') {
                  crumbs = [...crumbs, { pathname: '/', crumbLabel: 'Home' }];
                } else if (index !== 0 && split !== '') {
                  acc += '/' + split;
                  const regEx = `${acc}$`;
                  locUrls.forEach(path => {
                    if (path.match(regEx)) {
                      const n = acc.lastIndexOf('/');
                      crumbs = [
                        ...crumbs,
                        {
                          pathname: acc,
                          crumbLabel: acc.slice(n + 1).replace(/%20/g, ' '),
                        },
                      ];
                    }
                  });
                } else {
                  crumbs = [...crumbs];
                }
              });
              paths = [...paths, { location: url, crumbs }];
            });
          }
        });
      }
    });
  }
};

exports.onCreatePage = ({ page, actions }) => {
  if (useSitemap) {
    const { createPage, deletePage } = actions;

    paths.forEach(path => {
      const { context: oldPageContext } = page;
      const newPathLoc = path.location.replace(/%20/g, ' ');
      if (page.path === newPathLoc) {
        deletePage(page);
        createPage({
          ...page,
          context: {
            ...oldPageContext,
            breadcrumb: path,
          },
        });
      }
    });
  }
};
