/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/prop-types */
import React from 'react'
import { BreadcrumbProvider } from './components/BreadcrumbContext'
import { OptionsProvider } from './components/options-context'

export const wrapRootElement = ({ element }, pluginOptions) => {
  const { defaultCrumb, useClassNames, useAutoGen } = pluginOptions

  return (
    <OptionsProvider
      useAutoGen={useAutoGen || false}
      useClassNames={useClassNames || false}
    >
      <BreadcrumbProvider setHome={defaultCrumb || null}>
        {element}
      </BreadcrumbProvider>
    </OptionsProvider>
  )
}
