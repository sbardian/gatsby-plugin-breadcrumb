import React from 'react';
import Proptypes from 'prop-types';
import { Link } from 'gatsby';

const SitemapCrumb = ({
  title = '',
  crumbSeparator,
  crumbWrapperStyle,
  crumbActiveStyle,
  crumbStyle,
  crumbs: siteCrumbs,
  ...rest
}) => {
  return (
    <div>
      <span>{title}</span>
      {siteCrumbs.map((c, i) => {
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
              {...rest}
            >
              {c.crumbLabel}
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

SitemapCrumb.defaultProps = {
  title: '',
  crumbSeparator: ' / ',
  crumbWrapperStyle: {},
  crumbStyle: {},
};

SitemapCrumb.propTypes = {
  title: Proptypes.string,
  crumbSeparator: Proptypes.string,
  crumbWrapperStyle: Proptypes.shape(),
  crumbStyle: Proptypes.shape(),
  crumbs: Proptypes.arrayOf(
    Proptypes.shape({
      location: Proptypes.shape(),
      pathname: Proptypes.string.isRequired,
    }),
  ).isRequired,
};

export default SitemapCrumb;
