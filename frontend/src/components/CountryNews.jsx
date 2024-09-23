import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EverythingCard from './EverythingCard';
import Loader from './Loader';

function CountryNews() {
  const params = useParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function handlePrev() {
    setPage(page - 1);
  }

  function handleNext() {
    setPage(page + 1);
  }

  const pageSize = 6;

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      setError(null);

      // Ensure the URL is correctly formatted
      const url = `https://newsapi.org/v2/top-headlines?country=${params.iso}&page=${page}&pageSize=${pageSize}&apiKey=b7959c3319c0476e84df4e535f957291`;

      try {
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        
        const myJson = await response.json();
      
        // Check if the response status is 'ok'
        if (myJson.status === 'ok') {
          setTotalResults(myJson.totalResults);
          setData(myJson.articles);
        } else {
          setError(myJson.message || 'An error occurred');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setError('Failed to fetch news. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [page, params.iso, pageSize]);


  return (
    <>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3">
        {!isLoading ? (
          data.length > 0 ? (
            data.map((element, index) => (
              <EverythingCard
                key={index}
                title={element.title}
                description={element.description}
                imgUrl={element.urlToImage}
                publishedAt={element.publishedAt}
                url={element.url}
                author={element.author}
                source={element.source.name}
              />
            ))
          ) : (
            <p>No news articles found for this criteria.</p>
          )
        ) : (
          <Loader />
        )}
      </div>
      {!isLoading && data.length > 0 && (
        <div className="pagination flex justify-center gap-14 my-10 items-center">
          <button
            disabled={page <= 1}
            className="pagination-btn"
            onClick={handlePrev}
          >
            Prev
          </button>
          <p className="font-semibold opacity-80">
            {page} of {Math.ceil(totalResults / pageSize)}
          </p>
          <button
            disabled={page >= Math.ceil(totalResults / pageSize)}
            className="pagination-btn"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}

export default CountryNews;
