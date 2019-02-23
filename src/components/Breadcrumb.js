import React from 'react';

export default ({ breadcrumb }) => {
  return (
    <div>
      {breadcrumb.map(crumb => (
        <span>{crumb}/</span>
      ))}
    </div>
  );
};
