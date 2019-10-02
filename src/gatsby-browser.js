/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/prop-types */
import React from 'react'
import { BreadcrumbProvider } from './components/BreadcrumbContext'

export const wrapRootElement = ({ element }, pluginOptions) => {
  if (
    (pluginOptions && pluginOptions.defaultCrumb) ||
    (pluginOptions && pluginOptions.useClassNames)
  ) {
    const { defaultCrumb, useClassNames } = pluginOptions

    return (
      <BreadcrumbProvider
        setHome={defaultCrumb}
        useClassNames={useClassNames || false}
      >
        {element}
      </BreadcrumbProvider>
    )
  }
  return <BreadcrumbProvider>{element}</BreadcrumbProvider>
}
