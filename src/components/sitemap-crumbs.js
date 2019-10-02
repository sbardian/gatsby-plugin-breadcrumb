// eslint-disable-next-line
import React from 'react'
import AutoGenCrumb from './auto-gen-crumb'

// TODO: delete component after next major release
const SitemapCrumbs = props => {
  // eslint-disable-next-line
  console.warn(
    `Warning: <SitemapCrumbs /> has been deprecated.  Please update your code to use <Breadcrumb /> component. See docs https://github.com/sbardian/gatsby-plugin-breadcrumb for details.`,
  )
  return <AutoGenCrumb {...props} />
}

export default SitemapCrumbs
