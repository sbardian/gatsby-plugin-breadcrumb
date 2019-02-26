import React from 'react';
import { BreadcrumbContext } from './BreadcrumbContext';

const useBreadcrumb = ({
  location,
  crumbLabel,
  title,
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
      title,
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
