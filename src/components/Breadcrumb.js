import React from 'react';
import { Link } from 'gatsby';
// import { connect } from 'react-redux';
import { BreadcrumbContext } from './BreadcrumbContext';

const Breadcrumb = ({ location, crumbLabel }) => {
  const { crumbs, updateCrumbs } = React.useContext(BreadcrumbContext);

  React.useEffect(() => {
    updateCrumbs(location, crumbLabel);
  }, [location, crumbLabel]);

  return (
    <div>
      <span>Breadcrumbs: </span>
      {crumbs.map(c => {
        return (
          <div style={{ display: 'inline' }} key={Math.random()}>
            <Link
              to={c.pathname}
              state={{
                crumbClicked: true,
              }}
            >
              {c.crumbLabel} :
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
