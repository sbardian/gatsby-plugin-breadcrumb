/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/prop-types */
import React from 'react'
import { AppProviders } from './components/app-providers'

export const wrapRootElement = ({ element }, pluginOptions) => {
  return <AppProviders element={element} pluginOptions={pluginOptions} />
}
