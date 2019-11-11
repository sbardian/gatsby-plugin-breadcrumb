/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import PropTypes from 'prop-types'

export const BreadcrumbContext = React.createContext('Breadcrumb')

export const BreadcrumbProvider = ({ children, setHome = null }) => {
  let defaultCrumb = {}
  if (setHome) {
    defaultCrumb = {
      ...setHome.location,
      crumbLabel: setHome.crumbLabel,
      crumbStyle: setHome.crumbStyle,
      crumbActiveStyle: setHome.crumbActiveStyle,
      crumbSeparator: setHome.crumbSeparator,
    }
  }
  const [crumbs, setCrumbs] = React.useState([{ ...defaultCrumb }])

  const updateCrumbs = ({
    location,
    crumbLabel,
    crumbSeparator,
    crumbStyle,
    crumbActiveStyle,
  }) => {
    const indexOfFirstOccurrenceOfCurrentPath = crumbs.findIndex(
      crumb => crumb.pathname === location.pathname,
    )

    if (
      indexOfFirstOccurrenceOfCurrentPath > -1 &&
      indexOfFirstOccurrenceOfCurrentPath < crumbs.length - 1
    ) {
      setCrumbs(crumbs.slice(0, indexOfFirstOccurrenceOfCurrentPath))
    }

    if (indexOfFirstOccurrenceOfCurrentPath === -1) {
      setCrumbs([
        ...crumbs,
        {
          ...location,
          crumbLabel,
          crumbSeparator,
          crumbStyle,
          crumbActiveStyle,
        },
      ])
    }
  }

  const crumb = {
    crumbs,
    updateCrumbs,
  }

  return (
    <BreadcrumbContext.Provider value={crumb}>
      {children}
    </BreadcrumbContext.Provider>
  )
}

export const BreadcrumbConsumer = BreadcrumbContext.Consumer

BreadcrumbProvider.defaultProps = {
  setHome: {},
}

BreadcrumbProvider.propTypes = {
  children: PropTypes.node.isRequired,
  setHome: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    crumbLabel: PropTypes.string,
    crumbSeparator: PropTypes.string,
    crumbStyle: PropTypes.shape(),
    crumbActiveStyle: PropTypes.shape(),
  }),
}
