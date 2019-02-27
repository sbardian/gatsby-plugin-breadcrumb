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
  ...rest
}) => {
  // TODO: if 'setHome' === true, set default Home crumb using first set of params

  let finalLocation = {};

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
  }

  const { crumbs = [] } = useBreadcrumb({
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
        console.log('c >>> ', c);
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
