/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
import React from 'react'
import Proptypes from 'prop-types'
import { Link } from 'gatsby'
import { OptionsContext } from './options-context'

const AutoGenCrumb = ({
  title,
  crumbSeparator,
  crumbWrapperStyle,
  crumbActiveStyle,
  crumbStyle,
  crumbs: autoGenCrumbs,
  crumbLabel: crumbLabelOverride,
  disableLinks,
  hiddenCrumbs,
  ...rest
}) => {
  const { useClassNames } = React.useContext(OptionsContext)

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
          {autoGenCrumbs.map((c, i) => {
            if (hiddenCrumbs.includes(c.pathname)) {
              return null
            }
            return (
              <React.Fragment key={`${i}-${c.pathname}`}>
                {!disableLinks.includes(c.pathname) && (
                  <li
                    className="breadcrumb__list__item"
                    style={
                      useClassNames
                        ? null
                        : {
                            display: 'inline',
                          }
                    }
                  >
                    <Link
                      to={c.pathname}
                      style={
                        useClassNames
                          ? null
                          : {
                              textDecoration: 'none',
                              fontSize: '16pt',
                              color: '#e1e1e1',
                              ...crumbStyle,
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
                  <li
                    className="breadcrumb__list__item"
                    style={
                      useClassNames
                        ? null
                        : {
                            display: 'inline',
                          }
                    }
                  >
                    <span
                      style={
                        useClassNames
                          ? null
                          : {
                              textDecoration: 'none',
                              fontSize: '16pt',
                              color: '#e1e1e1',
                              ...crumbStyle,
                            }
                      }
                      className="breadcrumb__link__disabled"
                      {...rest}
                    >
                      {crumbLabelOverride && i === autoGenCrumbs.length - 1
                        ? crumbLabelOverride
                        : c.crumbLabel}
                    </span>
                  </li>
                )}
                {i === autoGenCrumbs.length - 1 ? null : (
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
                            ...crumbStyle,
                          }
                    }
                  >
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
}

AutoGenCrumb.defaultProps = {
  title: '',
  crumbSeparator: ' / ',
  crumbWrapperStyle: {},
  crumbStyle: {},
  crumbActiveStyle: {},
  crumbLabel: null,
  disableLinks: [],
  hiddenCrumbs: [],
}

AutoGenCrumb.propTypes = {
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
  disableLinks: Proptypes.arrayOf(Proptypes.string),
  hiddenCrumbs: Proptypes.arrayOf(Proptypes.string),
}

export default AutoGenCrumb
