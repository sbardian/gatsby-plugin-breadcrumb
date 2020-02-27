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
  ...rest
}) => {
  const { usePathPrefix } = React.useContext(OptionsContext)

  const { crumbs = [] } = useBreadcrumb({
    location: {
      ...location,
      pathname: usePathPrefix
        ? location.pathname.replace(new RegExp(`^${usePathPrefix}`), '')
        : location.pathname,
    },
    crumbLabel,
    crumbSeparator,
  })

  return (
    <>
      <span className="breadcrumb__title">{title}</span>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <ol className="breadcrumb__list">
          {crumbs.map((c, i) => {
            return (
              <li className="breadcrumb__item" key={i}>
                <Link
                  to={c.pathname || ''}
                  className="breadcrumb__link"
                  activeClassName="breadcrumb__link__active"
                  aria-current={i === crumbs.length - 1 ? 'page' : null}
                  {...rest}
                >
                  {c.crumbLabel}
                </Link>
                {i === crumbs.length - 1 ? null : (
                  <span className="breadcrumb__separator" aria-hidden="true">
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
}

ClickTrackingCrumb.propTypes = {
  location: Proptypes.shape().isRequired,
  crumbLabel: Proptypes.string.isRequired,
  title: Proptypes.string,
  crumbSeparator: Proptypes.string,
}

export default ClickTrackingCrumb
