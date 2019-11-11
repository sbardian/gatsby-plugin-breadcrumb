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
  const { crumbs, updateCrumbs } = React.useContext(BreadcrumbContext)

  React.useEffect(() => {
    updateCrumbs({
      location,
      crumbLabel,
      crumbSeparator,
      crumbStyle,
      crumbActiveStyle,
    })
  }, [location, crumbLabel, crumbSeparator, crumbStyle, crumbActiveStyle])

  return {
    crumbs,
  }
}

export default useBreadcrumb
