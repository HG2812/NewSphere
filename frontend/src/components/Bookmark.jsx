import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookBookmark } from '@fortawesome/free-solid-svg-icons';

function Bookmark({ cardData }) {
  const handleBookmark = async () => {
    try {
      const response = await fetch('http://localhost:3000/bookmarks/save', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(cardData),
      });
console.log(response)
      if (response.ok) {
        alert('Bookmarked successfully!');
      } else {
        console.error('Failed to save bookmark:', response.statusText);
      }
    } catch (error) {
      console.error('Error bookmarking:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        className="bg-black-500 hover:bg-blue-700 text-white font-bold rounded-full h-16 w-16 flex items-center justify-center"
        onClick={handleBookmark}
      >
        <FontAwesomeIcon icon={faBookBookmark} />
      </button>
    </div>
  );
}

export default Bookmark;
