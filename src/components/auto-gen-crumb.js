/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
import React from 'react'
import Proptypes from 'prop-types'
import { Link } from 'gatsby'
import { OptionsContext } from './options-context'

const AutoGenCrumb = ({
  title = '',
  crumbSeparator,
  crumbWrapperStyle,
  crumbActiveStyle,
  crumbStyle,
  crumbs: autoGenCrumbs,
  crumbLabel: crumbLabelOverride = null,
  disableLinks,
  hiddenCrumbs,
  ...rest
}) => {
  const { useClassNames } = React.useContext(OptionsContext)

  return (
    <div>
      <span className="breadcrumb__title">{title}</span>
      {autoGenCrumbs.map((c, i) => {
        if (hiddenCrumbs.includes(c.pathname)) {
          return null
        }
        return (
          <div
            className="breadcrumb"
            style={
              useClassNames ? null : { display: 'inline', ...crumbWrapperStyle }
            }
            key={i}
          >
            {!disableLinks.includes(c.pathname) && (
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
                activeClassName={
                  useClassNames ? 'breadcrumb__link__active' : null
                }
                {...rest}
              >
                {crumbLabelOverride && i === autoGenCrumbs.length - 1
                  ? crumbLabelOverride
                  : c.crumbLabel}
              </Link>
            )}
            {disableLinks.includes(c.pathname) && (
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
            )}
            <span
              className="breadcrumb__separator"
              style={useClassNames ? null : { fontSize: '16pt', ...crumbStyle }}
            >
              {i === autoGenCrumbs.length - 1 ? null : crumbSeparator}
            </span>
          </div>
        )
      })}
    </div>
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
