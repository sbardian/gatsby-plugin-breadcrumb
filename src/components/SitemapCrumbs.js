import React from 'react';
import { Link } from 'gatsby';

const SitemapCrumb = ({
  title = '',
  crumbSeparator = ' / ',
  crumbWrapperStyle,
  crumbActiveStyle,
  crumbStyle,
  crumbs,
  ...rest
}) => {
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
                ...crumbStyle,
              }}
              activeStyle={{
                color: 'white',
                ...crumbActiveStyle,
              }}
            >
              {c.pathname}
            </Link>
            <span style={{ fontSize: '16pt', ...crumbStyle }}>
              {crumbSeparator}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default SitemapCrumb;
