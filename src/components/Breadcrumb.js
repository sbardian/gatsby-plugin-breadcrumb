/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
import React from 'react'
import Proptypes from 'prop-types'
import { Link } from 'gatsby'
import useBreadcrumb from './useBreadcrumb'

const Breadcrumb = ({
  title,
  location,
  crumbLabel,
  crumbSeparator,
  crumbWrapperStyle,
  crumbActiveStyle,
  crumbStyle,
  // setHome = {},
  ...rest
}) => {
  // TODO: if 'setHome' === true, set default Home crumb using first set of params

  const { crumbs = [] } = useBreadcrumb({
    location,
    crumbLabel,
    crumbSeparator,
    crumbStyle,
    crumbActiveStyle,
  })

  return (
    <div>
      <span>{title}</span>
      {crumbs.map((c, i) => {
        return (
          <div style={{ display: 'inline', ...crumbWrapperStyle }} key={i}>
            <Link
              to={c.pathname || ''}
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
              {i === crumbs.length - 1 ? null : c.crumbSeparator}
            </span>
          </div>
        )
      })}
    </div>
  )
}

Breadcrumb.defaultProps = {
  title: '',
  crumbSeparator: ' / ',
  crumbWrapperStyle: {},
  crumbStyle: {},
  crumbActiveStyle: {},
}

Breadcrumb.propTypes = {
  location: Proptypes.shape().isRequired,
  crumbLabel: Proptypes.string.isRequired,
  title: Proptypes.string,
  crumbSeparator: Proptypes.string,
  crumbWrapperStyle: Proptypes.shape(),
  crumbActiveStyle: Proptypes.shape(),
  crumbStyle: Proptypes.shape(),
}

export default Breadcrumb
