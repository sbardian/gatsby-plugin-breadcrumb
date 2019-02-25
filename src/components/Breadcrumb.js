import React from 'react';
import { connect } from 'react-redux';

const Breadcrumb = ({ crumbs }) => {
  return (
    <div>
      <span>Breadcrumbs: </span>
      {crumbs.map(c => {
        return (
          <div style={{ display: 'inline' }} key={Math.random()}>
            {`${c.pathname} : `}
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
