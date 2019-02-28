import React from 'react';
import { Link } from 'gatsby';
import useBreadcrumb from './useBreadcrumb';

const Breadcrumb = ({
  title = '',
  location,
  crumbLabel = 'defaultLabel',
  crumbSeparator = ' / ',
  crumbWrapperStyle,
  crumbActiveStyle,
  crumbStyle,
  useSitemap = false, // update to true so this is default
  useAdvancedSiteMap = false, // add note to docs about not using this until implemented
  sitemapPath,
  allBreadcrumbPath,
  ...rest
}) => {
  // TODO: if 'setHome' === true, set default Home crumb using first set of params

  let finalLocation = {};
  let sitemapCrumbs = null;

  if (!useSitemap || !useAdvancedSiteMap) {
    // Nothing special, using my odd crumbs
    finalLocation = location;
  }

  if (useAdvancedSiteMap) {
    // TODO: Implement Breadcrumbs for gatsby-plugin-advanced-sitemap
  }

  if (useSitemap) {
    /**
     * Query the source nodes (allBreadcrumbs)
     * Return array of pathname
     * Update useBreadcrumb to call updateCrumbs over each "pathname" index
     *   - useBreadcrumb will need some type of check
     *   - typeof pathname === 'string' || typeof pathname === 'object'
     *   - then call updateCrumbs once or many times. . .
     */

    // const { allBreadcrumbPath } = useStaticQuery(graphql`
    //   query {
    //     allBreadcrumbPath {
    //       edges {
    //         node {
    //           location
    //           crumbs {
    //             crumb
    //           }
    //           key
    //         }
    //       }
    //     }
    //   }
    // `);
    const { edges } = allBreadcrumbPath;
    let mergedCrumb = [];
    edges.forEach(edge => {
      if (edge.node.location === location.pathname) {
        edge.node.crumbs.forEach(crumb => {
          const [label] = crumb.pathname.substring(1).split(`/.+/`);
          console.log('label: ', label);
          mergedCrumb = [
            ...mergedCrumb,
            {
              pathname: crumb.pathname,
              crumbLabel:
                label === ''
                  ? 'Home'
                  : label.charAt(0).toUpperCase() + label.slice(1),
              crumbSeparator,
              crumbStyle,
              crumbActiveStyle,
            },
          ];
        });
        console.log('mergedCrumb: ', mergedCrumb);
        sitemapCrumbs = {
          crumbs: mergedCrumb,
        };
      }
    });
  }

  const { crumbs = [] } = useSitemap
    ? sitemapCrumbs
    : useBreadcrumb({
        location: finalLocation,
        crumbLabel,
        crumbSeparator,
        crumbStyle,
        crumbActiveStyle,
      });

  return (
    <div>
      <span>{title}</span>
      {crumbs.map((c, i) => {
        return (
          <div style={{ display: 'inline' }} key={i} {...crumbWrapperStyle}>
            <Link
              to={c.pathname}
              style={{
                textDecoration: 'none',
                fontSize: '16pt',
                color: '#e1e1e1',
                ...c.crumbStyle,
              }}
              activeStyle={{
                color: 'white',
                ...crumbActiveStyle,
              }}
              state={{
                crumbClicked: true,
              }}
            >
              {c.crumbLabel}
            </Link>
            <span style={{ fontSize: '16pt', ...c.crumbStyle }}>
              {c.crumbSeparator}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
