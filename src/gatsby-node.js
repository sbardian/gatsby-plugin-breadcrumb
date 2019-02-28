import fs from 'fs-extra';
import path from 'path';
import xmlParser from 'xml2js';

exports.sourceNodes = (
  { actions, createNodeId, createContentDigest },
  pluginOptions,
) => {
  const { createNode } = actions;
  const publicPath = `./public`;

  if (!pluginOptions || !pluginOptions.sitemapPath) {
    throw new Error('You must define a `sitemapPath` option');
  }

  /**
   * TODO !!!!! while documenting mention they must run
   * gatsby build && gatsby serve
   * before using this as it must generate the sitemap file so we can read it!
   */

  const xmlPath = path.join(publicPath, pluginOptions.sitemapPath);
  fs.readFile(xmlPath, (err, fileData) => {
    if (!err) {
      const json = xmlParser.parseString(fileData, (err, data) => {
        if (!err) {
          const locs = data.urlset.url.map(page => page.loc[0]);
          const locUrls = locs.map(path => {
            return new URL(path).pathname;
          });
          let paths = [];
          locUrls.forEach((url, pathIndex) => {
            let acc = '';
            let crumbs = [];

            const splitUrl = url.split('/');
            splitUrl.forEach((split, index) => {
              if (index === 0 && split === '') {
                crumbs = [...crumbs, { pathname: '/' }];
              } else if (index !== 0 && split !== '') {
                acc += '/' + split;
                const regEx = `${acc}$`;
                locUrls.forEach(path => {
                  if (path.match(regEx)) {
                    crumbs = [...crumbs, { pathname: acc }];
                  }
                });
              } else {
                crumbs = [...crumbs];
              }
            });

            paths = [
              ...paths,
              { location: url, key: `${url}-${pathIndex}`, crumbs },
            ];
          });

          paths.forEach(path => {
            const nodeContent = JSON.stringify(path);
            const nodeMeta = {
              id: createNodeId(`gatsby-plugin-breadcrumb-path-${path.key}`),
              parent: null,
              children: [],
              internal: {
                type: `BreadcrumbPath`,
                mediaType: `text/html`,
                content: nodeContent,
                contentDigest: createContentDigest(path),
              },
            };
            const node = Object.assign({}, path, nodeMeta);
            createNode(node);
          });
        }
      });
    }
  });
};
