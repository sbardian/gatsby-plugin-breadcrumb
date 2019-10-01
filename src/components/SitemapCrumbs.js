/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
import React from 'react'
import Proptypes from 'prop-types'
import { Link } from 'gatsby'

const SitemapCrumb = ({
  title = '',
  crumbSeparator,
  crumbWrapperStyle,
  crumbActiveStyle,
  crumbStyle,
  crumbs: siteCrumbs,
  crumbLabel: crumbLabelOverride = null,
  ...rest
}) => {
  return (
    <div>
      <span>{title}</span>
      {siteCrumbs.map((c, i) => {
        return (
          <div style={{ display: 'inline', ...crumbWrapperStyle }} key={i}>
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
              {crumbLabelOverride && i === siteCrumbs.length - 1
                ? crumbLabelOverride
                : c.crumbLabel}
            </Link>
            <span style={{ fontSize: '16pt', ...crumbStyle }}>
              {i === siteCrumbs.length - 1 ? null : crumbSeparator}
            </span>
          </div>
        )
      })}
    </div>
  )
}

SitemapCrumb.defaultProps = {
  title: '',
  crumbSeparator: ' / ',
  crumbWrapperStyle: {},
  crumbStyle: {},
  crumbActiveStyle: {},
  crumbLabel: null,
}

SitemapCrumb.propTypes = {
  title: Proptypes.string,
  crumbSeparator: Proptypes.string,
  crumbWrapperStyle: Proptypes.shape(),
  crumbActiveStyle: Proptypes.shape(),
  crumbStyle: Proptypes.shape(),
  crumbs: Proptypes.arrayOf(
    Proptypes.shape({
      location: Proptypes.shape(),
      pathname: Proptypes.string.isRequired,
    }),
  ).isRequired,
  crumbLabel: Proptypes.string,
}

export default SitemapCrumb
