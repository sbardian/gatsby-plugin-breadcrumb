/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
import React from 'react'
import Proptypes from 'prop-types'
import { Link } from 'gatsby'

const AutoGenCrumb = ({
  title,
  crumbs: autoGenCrumbs,
  crumbLabel: crumbLabelOverride,
  crumbSeparator,
  disableLinks,
  hiddenCrumbs,
  ...rest
}) => (
  <>
    {title && <span className="breadcrumb__title">{title}</span>}
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol className="breadcrumb__list">
        {autoGenCrumbs.map((c, i) => {
          if (hiddenCrumbs.includes(c.pathname)) {
            return null
          }
          return (
            <React.Fragment key={`${i}-${c.pathname}`}>
              {!disableLinks.includes(c.pathname) && (
                <li className="breadcrumb__list__item">
                  <Link
                    to={c.pathname}
                    className="breadcrumb__link"
                    activeClassName="breadcrumb__link__active"
                    aria-current={
                      i === autoGenCrumbs.length - 1 ? 'page' : null
                    }
                    {...rest}
                  >
                    {crumbLabelOverride && i === autoGenCrumbs.length - 1
                      ? crumbLabelOverride
                      : c.crumbLabel}
                  </Link>
                </li>
              )}
              {disableLinks.includes(c.pathname) && (
                <li className="breadcrumb__list__item">
                  <span className="breadcrumb__link__disabled" {...rest}>
                    {crumbLabelOverride && i === autoGenCrumbs.length - 1
                      ? crumbLabelOverride
                      : c.crumbLabel}
                  </span>
                </li>
              )}
              {i === autoGenCrumbs.length - 1 ? null : (
                <span className="breadcrumb__separator" aria-hidden="true">
                  {crumbSeparator}
                </span>
              )}
            </React.Fragment>
          )
        })}
      </ol>
    </nav>
  </>
)

AutoGenCrumb.defaultProps = {
  title: '',
  crumbSeparator: ' / ',
  crumbLabel: null,
  disableLinks: [],
  hiddenCrumbs: [],
}

AutoGenCrumb.propTypes = {
  title: Proptypes.string,
  crumbSeparator: Proptypes.oneOfType([Proptypes.string, Proptypes.element]),
  crumbs: Proptypes.arrayOf(
    Proptypes.shape({
      location: Proptypes.shape(),
      pathname: Proptypes.string.isRequired,
    }),
  ).isRequired,
  crumbLabel: Proptypes.string,
  disableLinks: Proptypes.arrayOf(Proptypes.string),
  hiddenCrumbs: Proptypes.arrayOf(Proptypes.string),
}

export default AutoGenCrumb
