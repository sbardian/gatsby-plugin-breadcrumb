import React from 'react';
import { Link } from 'gatsby';
import useBreadcrumb from './useBreadcrumb';

const Breadcrumb = ({ location, crumbLabel, crumbSeparator, ...rest }) => {
  const { crumbs } = useBreadcrumb({
    location,
    crumbLabel,
    crumbSeparator,
  });

  return (
    <div>
      <span>Breadcrumbs: </span>
      {crumbs.map(c => {
        return (
          <div style={{ display: 'inline' }} key={Math.random()} {...rest}>
            <Link
              to={c.pathname}
              style={{
                textDecoration: 'none',
                fontSize: '16pt',
              }}
              state={{
                crumbClicked: true,
              }}
            >
              {c.crumbLabel}
              {c.crumbSeparator || ' / '}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
