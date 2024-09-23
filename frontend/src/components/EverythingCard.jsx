import { useState,useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBookBookmark} from '@fortawesome/free-solid-svg-icons';
import Downloads from './Downloads';
import Bookmark from './Bookmark';
//import Bookmark from "./Bookmark";
const Card = (props)=> {
  console.log(props.imgUrl);
  const cardRef = useRef(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { title, url, articleId } = props;
  
  const cardData = {
    title,
    url,
    articleId,
  };
  
  const handleBookmark = async () => {
    console.log("Bookmarking:", !isBookmarked ? "Saving" : "Removing");
    
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token found");
      return;
    }
    
    console.log("Token:", token);
  
    //setIsBookmarked(!isBookmarked);
  
    const bookmarkData = { title, url, articleId };
  
    if (!isBookmarked) {
      try {
        const response = await fetch('http://localhost:3000/bookmarks/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(bookmarkData),
        });
  
        if (response.ok) {
          console.log('Bookmarked successfully!');
          alert('Bookmarked successfully!');
        } else {
          console.error('Failed to save bookmark:', response.statusText);
        }
      } catch (error) {
        console.error('Error saving bookmark:', error);
      }
    } else {
      try {
        const response = await fetch(`http://localhost:3000/bookmarks/${articleId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        if (response.ok) {
          console.log('Bookmark removed successfully!');
          alert('Bookmark removed successfully!');
        } else {
          console.error('Failed to remove bookmark:', response.statusText);
        }
      } catch (error) {
        console.error('Error removing bookmark:', error);
      }
    }
  };
  

  return (
    <div className="everything-card mt-10" ref={cardRef}>
      <div className="everything-card flex flex-wrap p-5 gap-1 mb-1">
        <b className="title">{props.title}</b>
        <div className="everything-card-img mx-auto">
        <img  className="everything-card-img"  src={props.imgUrl || './assets/back.jpg'} alt="img" />

        </div>
        <div className="description">
          <p className="description-text leading-7">
            {props.description?.substring(0, 200)}
          </p>
        </div>
        <div className="info">
          <div className="source-info flex items-center gap-2">
            <span className="font-semibold">Source:</span>
            <a
              href={props.url}
              target="_blank"
              className="link underline break-words"
            >
              {props.source.substring(0, 70)}
            </a>
            <button
              className="bg-black-500 hover:bg-blue-700 text-white font-bold rounded-full h-16 w-16 flex items-center justify-center"
              onClick={handleBookmark}
            >
              <FontAwesomeIcon icon={faBookBookmark} />
            </button>
            <button 
            className="bg-black-500 hover:bg-blue-700 text-white font-bold rounded-full h-16 w-16 flex items-center justify-center"
          >
     <Downloads cardRef={cardRef}/>
          </button>
          </div>
          <div className="origin flex flex-col">
            <p className="origin-item">
              <span className="font-semibold">Author:</span>
              {props.author}
            </p>
            <p className="origin-item">
              <span className="font-semibold">Published At:</span>(
              {props.publishedAt})
            </p>
          </div>
        </div>
      </div>

      {/* Added the new card content with styles */}
      <div className="flex lg:flex-row">
        <div
          className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          style={{ backgroundImage: `url(${props.imageUrlLeft})` }}
          title={props.imageLeftTitle}
        ></div>
        <div className="border rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            <p className="text-sm text-gray-600 flex items-center">
              {props.memberIcon && (
                <svg
                  className="fill-current text-gray-500 w-3 h-3 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  {props.memberIcon}
                </svg>
              )}
              {props.memberText}
            </p>
            <div className="text-gray-900 font-bold text-xl mb-2">
              {props.cardTitle}
            </div>
            <p className="text-gray-700 text-base">{props.cardDescription}</p>
          </div>
          <div className="flex items-center">
            {props.authorImage && (
              <img
                className="w-10 h-10 rounded-full mr-4"
                src={props.authorImage}
                alt="Avatar"
              />
            )}
            <div className="text-sm">
              <p className="text-gray-900 leading-none">{props.authorName}</p>
              <p className="text-gray-600">{props.publishedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
