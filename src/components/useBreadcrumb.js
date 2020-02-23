/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { BreadcrumbContext } from './breadcrumb-context'

const useBreadcrumb = ({ location, crumbLabel, crumbSeparator }) => {
  const { crumbs, updateCrumbs } = React.useContext(BreadcrumbContext)

  React.useEffect(() => {
    updateCrumbs({
      location,
      crumbLabel,
      crumbSeparator,
    })
  }, [location, crumbLabel, crumbSeparator, updateCrumbs])

  return {
    crumbs,
  }
}

export default useBreadcrumb
