/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
import React from 'react'
import Proptypes from 'prop-types'
import { Link } from 'gatsby'
import { OptionsContext } from './options-context'
import useBreadcrumb from './useBreadcrumb'

// TODO: Delete before v7 release

const ClickTrackingCrumb = ({
  title,
  location,
  crumbLabel,
  crumbSeparator,
  crumbWrapperStyle,
  crumbActiveStyle,
  crumbStyle,
  ...rest
}) => {
  const { useClassNames, usePathPrefix } = React.useContext(OptionsContext)

  const { crumbs = [] } = useBreadcrumb({
    location: {
      ...location,
      pathname: usePathPrefix
        ? location.pathname.replace(new RegExp(`^${usePathPrefix}`), '')
        : location.pathname,
    },
    crumbLabel,
    crumbSeparator,
    crumbStyle,
    crumbActiveStyle,
  })

  return (
    <div>
      <span className="breadcrumb__title">{title}</span>
      {crumbs.map((c, i) => {
        return (
          <div
            className="breadcrumb"
            style={
              useClassNames ? null : { display: 'inline', ...crumbWrapperStyle }
            }
            key={i}
          >
            <Link
              to={c.pathname || ''}
              style={
                useClassNames
                  ? null
                  : {
                      textDecoration: 'none',
                      fontSize: '16pt',
                      color: '#e1e1e1',
                      ...c.crumbStyle,
                    }
              }
              activeStyle={
                useClassNames
                  ? null
                  : {
                      color: 'white',
                      ...crumbActiveStyle,
                    }
              }
              className="breadcrumb__link"
              activeClassName={
                useClassNames ? 'breadcrumb__link__active' : null
              }
              {...rest}
            >
              {c.crumbLabel}
            </Link>
            <span
              className="breadcrumb__separator"
              style={
                useClassNames ? null : { fontSize: '16pt', ...c.crumbStyle }
              }
            >
              {i === crumbs.length - 1 ? null : c.crumbSeparator}
            </span>
          </div>
        )
      })}
    </div>
  )
}

ClickTrackingCrumb.defaultProps = {
  title: '',
  crumbSeparator: ' / ',
  crumbWrapperStyle: {},
  crumbStyle: {},
  crumbActiveStyle: {},
}

ClickTrackingCrumb.propTypes = {
  location: Proptypes.shape().isRequired,
  crumbLabel: Proptypes.string.isRequired,
  title: Proptypes.string,
  crumbSeparator: Proptypes.string,
  crumbWrapperStyle: Proptypes.shape(),
  crumbActiveStyle: Proptypes.shape(),
  crumbStyle: Proptypes.shape(),
}

export default ClickTrackingCrumb
