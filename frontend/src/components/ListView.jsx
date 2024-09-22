import React from 'react';

const ListView = ({ title, items, renderItem, buttonLabel, buttonLink }) => {
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>{renderItem(item)}</li>
        ))}
      </ul>
      {buttonLink && <button onClick={() => window.location.href = buttonLink}>{buttonLabel}</button>}
    </div>
  );
};

export default ListView;
