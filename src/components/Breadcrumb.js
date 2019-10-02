/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
import React from 'react'
import AutoGenCrumb from './auto-gen-crumb'
import ClickTrackingCrumb from './click-tracking-crumb'
import useBreadcrumb from './useBreadcrumb'

const Breadcrumb = props => {
  const { useAutoGen } = useBreadcrumb({})

  return (
    <>
      {useAutoGen && <AutoGenCrumb {...props} />}
      {!useAutoGen && <ClickTrackingCrumb {...props} />}
    </>
  )
}

export default Breadcrumb
