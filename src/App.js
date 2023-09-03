import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
 const [movies , setMovies] = useState([]);
 const [isloading , setLoading] = useState(false);

 async function fetchMoviesHandler () {
  setLoading(true);
   const response= await fetch("https://swapi.dev/api/films/");
   const data = await response.json();
   const transformedData = data.results.map((moviedata)=>{
    return {
      id : moviedata.episode_id,
      title : moviedata.title,
      openingText : moviedata.opening_crawl,
      releaseDate : moviedata.release_date,
    }
    
   });

   setMovies(transformedData);
   setLoading(false);

 }

  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>{}Fetch Movies</button>
      </section>
      <section>
        {!isloading && <MoviesList movies={movies} />}
        {isloading && <p>Loading . . .</p>} 
      </section>
    </React.Fragment>
  );
}

export default App;
