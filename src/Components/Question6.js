import React, {useState, useEffect} from 'react'

// Create a React component that fetches a list of movies from an API endpoint using useEffect hook and displays the title, year, and genre of each movie on the screen using the useState hook. Add a dropdown which filters the movies by genre.

const fakeFetch = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://example.com/api/movies") {
        resolve({
          status: 200,
          message: "Success",
          data: [
            {
              title: "The Godfather",
              year: 1972,
              genre: "Crime"
            },
            {
              title: "The Shawshank Redemption",
              year: 1994,
              genre: "Drama"
            },
            {
              title: "The Dark Knight",
              year: 2008,
              genre: "Action"
            },
            {
              title: "Forrest Gump",
              year: 1994,
              genre: "Comedy"
            },
            {
              title: "The Matrix",
              year: 1999,
              genre: "Science Fiction"
            },
            {
              title: "Jurassic Park",
              year: 1993,
              genre: "Science Fiction"
            },
            {
              title: "Star Wars: Episode IV - A New Hope",
              year: 1977,
              genre: "Science Fiction"
            },
            {
              title: "The Terminator",
              year: 1984,
              genre: "Action"
            },
            {
              title: "Die Hard",
              year: 1988,
              genre: "Action"
            },
            {
              title: "Pulp Fiction",
              year: 1994,
              genre: "Crime"
            }
          ]
        });
      } else {
        reject({
          status: 404,
          message: "Movies list not found."
        });
      }
    }, 2000);
  });
};

const Question6 = () => {
    const [moviesData, setMoviesData] =  useState([]);
    const [moviesData2, setMoviesData2] =  useState([]);
    const [loading, setLoading] =  useState(true);
    const companyList = ["All",...new Set(moviesData2.map(({genre})=> genre))];
    const getData = async()=>{
        try {
            const response = await fakeFetch("https://example.com/api/movies")
            setMoviesData(response.data);
            setMoviesData2(response.data);
            setLoading(false)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(()=>{
        getData();
    },[])

    const SortByGenre = (event)=>{

        const choosedGenre = event.target.value;
        if(choosedGenre === "All")
        {
            setMoviesData(moviesData2);
        }
        else{
            const filterYear = moviesData2.filter(({genre})=> genre === choosedGenre)
            setMoviesData(filterYear);
        }

    }
  return (
    <div>
      <p>{loading && "...Loading"}</p>
      <h1>Movies</h1>
      <span>Filter By Genre:</span>
      <select onChange={SortByGenre}>
        {
            companyList.map((Genre)=> <option value={Genre}>{Genre}</option>)
        }
      </select>
      <ul>
        {
            moviesData.map(({title, year, genre})=>{
                return <li>
                    <p>{title}</p>
                    <p>{year}</p>
                    <p>{genre}</p>
                </li>
            })
        }
      </ul>
    </div>
  )
}

export default Question6
