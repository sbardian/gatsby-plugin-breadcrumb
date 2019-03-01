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

  if (!location || !crumbLabel) {
    return {
      crumbs,
      updateCrumbs,
    };
  }

  React.useEffect(() => {
    updateCrumbs({
      location,
      crumbLabel,
      crumbSeparator,
      crumbStyle,
      crumbActiveStyle,
    });
  }, [location]);

  return {
    crumbs,
    updateCrumbs,
  };
};

export default useBreadcrumb;
