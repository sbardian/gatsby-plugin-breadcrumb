import React from 'react';
import { Link } from 'gatsby';
import { connect } from 'react-redux';

const Breadcrumb = ({ crumbs }) => {
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
              {c.pathname} :
            </Link>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = state => {
  const { crumbs } = state.getCrumbs;
  return {
    crumbs,
  };
};

export default connect(mapStateToProps)(Breadcrumb);
