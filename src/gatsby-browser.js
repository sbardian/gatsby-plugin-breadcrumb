import React from 'react';
import { BreadcrumbProvider } from './components/BreadcrumbContext';

export const wrapRootElement = ({ element }, pluginOptions) => {
  if (pluginOptions && pluginOptions.defaultCrumb) {
    const { defaultCrumb } = pluginOptions;
    return (
      <BreadcrumbProvider setHome={defaultCrumb}>{element}</BreadcrumbProvider>
    );
  }
  return <BreadcrumbProvider>{element}</BreadcrumbProvider>;
};
