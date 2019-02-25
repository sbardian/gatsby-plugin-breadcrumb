import React from 'react';

export const BreadcrumbContext = React.createContext('Breadcrumb');

export const BreadcrumbProvider = ({ children }) => {
  const [crumbs, setCrumbs] = React.useState([]);
  const updateCrumbs = (location, crumbLabel) => {
    if (
      (location.state && location.state.crumbClicked) ||
      crumbs.find(
        crumb => crumb.pathname === location.pathname && crumbs.length > 0,
      )
    ) {
      const removeAfter = crumbs.findIndex(
        crumb => crumb.pathname === location.pathname,
      );
      crumbs.splice(removeAfter + 1);
      setCrumbs([...crumbs]);
    } else {
      setCrumbs([...crumbs, { ...location, crumbLabel }]);
    }
  };

  const crumb = {
    crumbs,
    updateCrumbs,
  };

  return (
    <BreadcrumbContext.Provider value={crumb}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const BreadcrumbConsumer = BreadcrumbContext.Consumer;
