/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/prop-types */
import React from 'react'
import { BreadcrumbProvider } from './components/BreadcrumbContext'

export const wrapRootElement = ({ element }, pluginOptions) => {
  const { defaultCrumb, useClassNames, useAutoGen } = pluginOptions

  return (
    <BreadcrumbProvider
      setHome={defaultCrumb || null}
      useAutoGen={useAutoGen || false}
      useClassNames={useClassNames || false}
    >
      {element}
    </BreadcrumbProvider>
  )
}
