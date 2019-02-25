import React from 'react';
import { BreadcrumbContext } from './BreadcrumbContext';

const useBreadcrumb = ({
  location,
  crumbLabel,
  crumbSeparator,
  crumbStyle = {},
  crumbActiveStyle = {},
  ...rest
}) => {
  const { crumbs, updateCrumbs } = React.useContext(BreadcrumbContext);

  React.useEffect(() => {
    updateCrumbs({
      location,
      crumbLabel,
      crumbSeparator,
      crumbStyle,
      crumbActiveStyle,
    });
  }, [location, crumbLabel, crumbSeparator, crumbStyle, crumbActiveStyle]);

  return {
    crumbs,
    updateCrumbs,
  };
};

export default useBreadcrumb;
