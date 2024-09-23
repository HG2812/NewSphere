// import { useState, useEffect } from 'react';
// import Card from './EverythingCard';

// const FetchBookmark = () => {
//   const [bookmarks, setBookmarks] = useState([]);

//   useEffect(() => {
//     const fetchBookmarks = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/bookmarks');
//         const data = await response.json();
//         setBookmarks(data);
//       } catch (error) {
//         console.error('Error fetching bookmarks:', error);
//       }
//     };

//     fetchBookmarks();
//   }, []);

//   return (
//     <div>
//       {bookmarks.map((bookmark) => (
//         <Card key={bookmark._id} {...bookmark} />
//       ))}
//     </div>
//   );
// };

// export default FetchBookmark;

import { useState, useEffect } from 'react';
import Card from './EverythingCard';

const FetchBookmark = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await fetch('http://localhost:3000/all-bookmarks', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setBookmarks(data);
        } else {
          console.error('Failed to fetch bookmarks:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      }
    };

    fetchBookmarks();
  }, []);

  return (
    <div>
      {bookmarks.map((bookmark) => (
        <Card key={bookmark._id} {...bookmark} />
      ))}
    </div>
  );
};

export default FetchBookmark;
