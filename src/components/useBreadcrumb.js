import React from 'react';
import { BreadcrumbContext } from './BreadcrumbContext';

const useBreadcrumb = ({ location, crumbLabel, crumbSeparator }) => {
  const { crumbs, updateCrumbs } = React.useContext(BreadcrumbContext);

  React.useEffect(() => {
    updateCrumbs(location, crumbLabel);
  }, [location, crumbLabel, crumbSeparator]);

  return {
    crumbs,
    updateCrumbs,
  };
};

export default useBreadcrumb;
