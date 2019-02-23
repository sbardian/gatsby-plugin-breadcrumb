import React, { createContext } from 'react';

export const BreadcrumbContext = createContext('Breadcrumb');

export const BreadcrumbProvider = ({ children }) => {
  // TODO: create history and return it with provider and a way to update it.

  const [crumb, updateCrumb] = React.useState({});

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
