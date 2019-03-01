import React from 'react';
import { Link } from 'gatsby';
import useBreadcrumb from './useBreadcrumb';

const Breadcrumb = ({
  title = '',
  crumbLabel = 'defaultLabel',
  crumbSeparator = ' / ',
  crumbWrapperStyle,
  crumbActiveStyle,
  crumbStyle,
  useSitemap = false, // update to true so this is default
  useAdvancedSiteMap = false, // add note to docs about not using this until implemented
  crumbs: siteCrumbs,
  setHome = {},
  ...rest
}) => {
  // TODO: if 'setHome' === true, set default Home crumb using first set of params

  let finalLocation = {};
  let sitemapCrumbs = null;

  if (!useSitemap || !useAdvancedSiteMap) {
    finalLocation = location;
  }

  if (useAdvancedSiteMap) {
    // TODO: Implement Breadcrumbs for gatsby-plugin-advanced-sitemap
  }

  if (useSitemap) {
    // TODO update url
    if (!siteCrumbs) {
      throw new Error(
        'You must provide crumbs when using Sitemap.  http://xxx.xxx',
      );
    }

    let mergedCrumb = [];
    siteCrumbs.forEach(crumb => {
      const [label] = crumb.pathname.substring(1).split(`/.+/`);
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
    sitemapCrumbs = {
      crumbs: mergedCrumb,
    };
  }

  // const { crumbs: blah } = useBreadcrumb(setHome);

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
              {...rest}
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
