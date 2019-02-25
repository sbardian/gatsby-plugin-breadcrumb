import React from 'react';
import { BreadcrumbProvider } from './components/BreadcrumbContext';

export const wrapRootElement = ({ element }) => (
  <BreadcrumbProvider>{element}</BreadcrumbProvider>
);
