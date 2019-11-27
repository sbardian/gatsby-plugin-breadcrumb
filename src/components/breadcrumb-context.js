/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import PropTypes from 'prop-types'

export const BreadcrumbContext = React.createContext('Breadcrumb')

export const BreadcrumbProvider = ({ children, defaultCrumb = null }) => {
  const [crumbs, setCrumbs] = React.useState(
    defaultCrumb ? [{ ...defaultCrumb }] : [],
  )

  const updateCrumbs = ({
    location,
    crumbLabel,
    crumbSeparator,
    crumbStyle,
    crumbActiveStyle,
  }) => {
    // check to see if the path is already in the breadcrumb
    const indexOfFirstOccurrenceOfCurrentPath = crumbs.findIndex(
      crumb => crumb.pathname === location.pathname,
    )

    // when path exists in breadcrumb we need to remove any crumbs after
    // that pathname
    if (
      indexOfFirstOccurrenceOfCurrentPath > -1 &&
      indexOfFirstOccurrenceOfCurrentPath < crumbs.length - 1
    ) {
      setCrumbs(crumbs.slice(0, indexOfFirstOccurrenceOfCurrentPath))
    }

    // when path does not exist we add it to the end of the breadcrumb
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
  defaultCrumb: {},
}

BreadcrumbProvider.propTypes = {
  children: PropTypes.node.isRequired,
  defaultCrumb: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    crumbLabel: PropTypes.string,
    crumbSeparator: PropTypes.string,
    crumbStyle: PropTypes.shape(),
    crumbActiveStyle: PropTypes.shape(),
  }),
}
