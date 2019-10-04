/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { BreadcrumbContext } from './BreadcrumbContext'

const useBreadcrumb = ({
  location,
  crumbLabel,
  crumbSeparator,
  crumbStyle = {},
  crumbActiveStyle = {},
}) => {
  const { crumbs, updateCrumbs, useClassNames, useAutoGen } = React.useContext(
    BreadcrumbContext,
  )

  if (!location || !crumbLabel) {
    return {
      crumbs,
      useClassNames,
      useAutoGen,
    }
  }

  React.useEffect(() => {
    updateCrumbs({
      location,
      crumbLabel,
      crumbSeparator,
      crumbStyle,
      crumbActiveStyle,
    })
  }, [location])

  return {
    crumbs,
    useClassNames,
    useAutoGen,
  }
}

export default useBreadcrumb
