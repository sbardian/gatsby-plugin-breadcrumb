/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
import React from 'react'
import AutoGenCrumb from './auto-gen-crumb'
import ClickTrackingCrumb from './click-tracking-crumb'
import { OptionsContext } from './options-context'

const Breadcrumb = props => {
  const { useAutoGen } = React.useContext(OptionsContext)

  return (
    <>
      {useAutoGen && <AutoGenCrumb {...props} />}
      {!useAutoGen && <ClickTrackingCrumb {...props} />}
    </>
  )
}

export default Breadcrumb
