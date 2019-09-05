/* eslint-disable no-shadow */
import fs from 'fs-extra';
import path from 'path';
import xmlParser from 'xml2js';
import { URL } from 'url';

let paths = [];
let useSitemap = true;

exports.sourceNodes = (_, pluginOptions) => {
  const publicPath = `./public`;

  if (Object.keys(pluginOptions).length <= 0 && !pluginOptions.sitemapPath) {
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
        xmlParser.parseString(fileData, (err, data) => {
          if (!err) {
            const locs = data.urlset.url.map(page => page.loc[0]);
            const locUrls = locs.map(loc => {
              return new URL(loc).pathname;
            });
            locUrls.forEach(url => {
              let acc = '';
              let crumbs = [];

              const splitUrl = url.split('/');
              splitUrl.forEach((split, index) => {
                if (index === 0 && split === '') {
                  crumbs = [
                    ...crumbs,
                    {
                      pathname: '/',
                      crumbLabel: pluginOptions.sitemapHomeLabel || 'Home',
                    },
                  ];
                } else if (index !== 0 && split !== '') {
                  acc += `/${split}`;
                  const regEx = `${acc}$`;
                  locUrls.forEach(locUrl => {
                    if (locUrl.match(regEx)) {
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

    // eslint-disable-next-line
    paths.forEach(path => {
      const { context: oldPageContext } = page;
      const newPathLoc = path.location.replace(/%20/g, ' ').replace('/', '');
      const newPagePath = page.path.replace('/', '');
      if (newPagePath === newPathLoc) {
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
