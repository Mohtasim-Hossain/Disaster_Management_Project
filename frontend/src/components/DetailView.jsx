import React from 'react';

const DetailView = ({ title, details, renderDetails }) => {
  return (
    <div>
      <h2>{title}</h2>
      <div>{renderDetails(details)}</div>
    </div>
  );
};

export default DetailView;
