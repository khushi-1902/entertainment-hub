import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import "./Trending.css";

const Trending = () => {
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const API_KEY = process.env.REACT_APP_API_KEY;

  const fetchTrending = useCallback(async () => {
    if (!API_KEY) {
      setError("API key is missing. Please check your environment variables.");
      return;
    }
    setError(null); // Reset error state before fetching
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${page}`
      );
      setTrending(data.results);
    } catch (error) {
      console.error("Error fetching trending data:", error);
      setError("Failed to fetch trending data. Please try again.");
    }
  }, [API_KEY, page]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchTrending();
  }, [fetchTrending]);

  return (
    <div>
      <span className="pageTitle">Trending</span>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          <div className="trending-list">
            {trending.map((item) => (
              <SingleContent
                key={item.id}
                id={item.id}
                poster={item.poster_path}
                title={item.title || item.name}
                date={item.first_air_date || item.release_date}
                media_type={item.media_type}
                vote_average={item.vote_average}
              />
            ))}
          </div>
          {trending.length > 0 && <CustomPagination setPage={setPage} />}
        </>
      )}
    </div>
  );
};

export default Trending;
