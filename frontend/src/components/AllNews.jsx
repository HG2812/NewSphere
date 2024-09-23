import { useState, useEffect } from 'react';
import EverythingCard from './EverythingCard';
import Loader from './Loader';

function AllNews () {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
const placeholderImage = 'https://via.placeholder.com/150';
  function handlePrev() {
    setPage(page - 1);
  }

  function handleNext() {
    setPage(page + 1);
  }

  let pageSize = 12;

  const fetchNews = async () => {
    try {
      const response = await fetch(`https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&page=${page}&pageSize=${pageSize}&apiKey=b7959c3319c0476e84df4e535f957291`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('API Response:', data); // Log the response data
      if (data.articles) {
        setData(data.articles);
        setTotalResults(data.totalResults);
      } else {
        console.warn('No articles found:', data); // Log if no articles are found
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Failed to fetch news. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchNews();
  }, [page, pageSize]);

  return (
    <>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className='my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3 '>
        {!isLoading ? data.map((element, index) => (
          <EverythingCard
            title={element.title}
            description={element.description}
            imgUrl={element.urlToImage ? element.urlToImage : placeholderImage}
            publishedAt={element.publishedAt}
            url={element.url}
            author={element.author}
            source={element.source.name}
            key={index}
          />
        )) : <Loader />}
      </div>
      {!isLoading && data.length > 0 && (
        <div className="pagination flex justify-center gap-14 my-10 items-center">
          <button disabled={page <= 1} className='pagination-btn text-center' onClick={handlePrev}>&larr; Prev</button>
          <p className='font-semibold opacity-80'>{page} of {Math.ceil(totalResults / pageSize)}</p>
          <button className='pagination-btn text-center' disabled={page >= Math.ceil(totalResults / pageSize)} onClick={handleNext}>Next &rarr;</button>
        </div>
      )}
    </>
  );
}

export default AllNews;
