/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
import React from 'react'
import Proptypes from 'prop-types'
import { Link } from 'gatsby'
import { OptionsContext } from './options-context'
import useBreadcrumb from './useBreadcrumb'

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
    <>
      <span className="breadcrumb__title">{title}</span>
      <nav
        className="breadcrumb"
        aria-label="Breadcrumb"
        style={
          useClassNames ? null : { display: 'inline', ...crumbWrapperStyle }
        }
      >
        <ol
          className="breadcrumb__list"
          style={
            useClassNames
              ? null
              : {
                  display: 'block',
                  listStyle: 'none',
                }
          }
        >
          {crumbs.map((c, i) => {
            return (
              <li
                className="breadcrumb__item"
                key={i}
                style={
                  useClassNames
                    ? null
                    : {
                        display: 'inline',
                        ...crumbWrapperStyle,
                      }
                }
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
                  activeClassName="breadcrumb__link__active"
                  aria-current={i === crumbs.length - 1 ? 'page' : null}
                  {...rest}
                >
                  {c.crumbLabel}
                </Link>
                {i === crumbs.length - 1 ? null : (
                  <span
                    className="breadcrumb__separator"
                    aria-hidden="true"
                    style={
                      useClassNames
                        ? null
                        : {
                            display: 'inline-block',
                            fontSize: '16pt',
                            margin: '0 0.25em',
                            ...c.crumbStyle,
                          }
                    }
                  >
                    {c.crumbSeparator}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
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
