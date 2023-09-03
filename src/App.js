import React,{ useEffect ,useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
 const [movies , setMovies] = useState([]);
 const [isloading , setLoading] = useState(false);
 const [error , setError] = useState(null);


 const fetchMoviesHandler = async () => {
   setLoading(true);
   setError(null);
   try {
   const response= await fetch("https://swapi.dev/api/film/");
   if(!response.ok)
   {
     throw new Error("something went Wrong  Retrying ....");
   }

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
   } catch (error) {
     setError(error.message);
     setTimeout(fetchMoviesHandler, 5000); //Timeout for every 5 sec call of api

   }
   setLoading(false);
 }
 

 const cancelHandler = () => {
  setLoading(false);
  setError(null);
  setMovies([]);
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

  let content = <p>Found no movies.</p>

  if(movies.length > 0)
  {
    content = <MoviesList movies={movies} />
  }
  if(error) {
    content = <p>{error}</p>
  }

  if(isloading)
  {
    content = <p>Loading...</p>
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
        <button onClick={cancelHandler}>Stop</button>
      </section>
      <section>
        {/* {!isloading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isloading && movies.length === 0 && !error && <p>Found no movies</p> }
        {!isloading && error && <p>{error}</p>} 
        {isloading && <p>Loading...</p>} */}

        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
