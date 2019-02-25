import React from 'react';
import { BreadcrumbContext } from './BreadcrumbContext';

const useBreadcrumb = ({ location, crumbLabel, crumbSeparator, ...rest }) => {
  const { crumbs, updateCrumbs } = React.useContext(BreadcrumbContext);

  React.useEffect(() => {
    updateCrumbs({ location, crumbLabel, crumbSeparator });
  }, [location, crumbLabel, crumbSeparator]);

  return {
    crumbs,
    updateCrumbs,
  };
};

export default useBreadcrumb;
