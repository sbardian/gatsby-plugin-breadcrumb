import React from 'react';

export const BreadcrumbContext = React.createContext('Breadcrumb');

export const BreadcrumbProvider = ({ children }) => {
  const crumb = [];
  const updateCrumb = value => {
    crumb.push({ value });
  };

  const history = {
    crumb,
    updateCrumb,
  };

  return (
    <BreadcrumbContext.Provider value={history}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const BreadcrumbConsumer = ({ children: WrappedComponent }) => {
  return (
    <BreadcrumbContext.Consumer>
      {history => {
        return <WrappedComponent {...history} />;
      }}
    </BreadcrumbContext.Consumer>
  );
};
