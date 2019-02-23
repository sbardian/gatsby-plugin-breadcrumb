import React from 'react';

export default currentPath => {
  const history = [];
  const value = React.useContext('BreadCrumb');

  console.log('value in useBreadCrumb: ', value);

  React.useEffect(() => {
    history.push(currentPath.pathname);
  }, [currentPath]);

  return history;
};
