// import React from 'react';

// const ListView = ({ title, items, renderItem, buttonLabel, buttonLink }) => {
//   return (
//     <div>
//       <h2>{title}</h2>
//       <ul>
//         {items.map(item => (
//           <li key={item.id}>{renderItem(item)}</li>
//         ))}
//       </ul>
//       {buttonLink && <button onClick={() => window.location.href = buttonLink}>{buttonLabel}</button>}
//     </div>
//   );
// };

// export default ListView;


// import React from 'react';
// import { Link } from 'react-router-dom';

// const ListView = ({ items, type }) => {
//   return (
//     <ul className="divide-y divide-gray-200">
//       {items.map((item) => (
//         <li key={item.id} className="py-4">
//           <Link to={`/${type}/${item.id}`} className="text-blue-600 hover:underline">
//             {item.title || item.name}
//           </Link>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default ListView;


import React from 'react';
import { Link } from 'react-router-dom';

const ListView = ({ items, type }) => {
  return (
    <ul className="divide-y divide-gray-200">
      {items.map((item) => (
        <li key={item.id} className="py-4">
          <Link to={`/${type}/${item.id}`} className="text-blue-600 hover:underline">
            <div>
              <span className="font-bold">{item.title || item.username }</span>
              { (
                <span className="text-gray-600 ml-2"> ({item.location || item.email})</span>
              )}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ListView;
