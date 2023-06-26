import React, { useState, useEffect, useCallback } from 'react';

import AddMovie from './components/AddMovie';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovieHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    // async & await를 사용하면 error는 fetch.catch()가 아닌
    // try ~ catch()를 이용해야 한다.
    try {
      // firebase 연결
      const response = await fetch('https://react-guide-http-cde47-default-rtdb.firebaseio.com/movies.json');
      if (!response.ok) {
        throw new Error('something went wrong🔧');
      }

      const data = await response.json();
      console.log(data);
      const loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].release_date,
        });
      }
      /*
      const transformedMovies = data.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
      */
      setMovies(loadedMovies);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMovieHandler();
    // fetchMovieHandler함수가 버튼을 누를 때도 호출되지만
    // 컴포넌트가 재평가될 때도 호출된다(처음 로딩 포함)
    // 의존성을 비워두면 처음 로딩이후론 실행이 안된다
  }, [fetchMovieHandler]);
  // fetchMovieHandler을 의존성으로 넣으면
  // movieList가 변할 때마다 불러오지만
  // 무한루프가 생길 수 있으므로 useCallback을 사용한다

  async function addMovieHandler(movie) {
    // console.log(movie);
    const response = await fetch('https://react-guide-http-cde47-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);
  }

  let content = <p>No datas...</p>;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>

      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
