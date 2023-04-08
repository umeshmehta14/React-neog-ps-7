import React,{useState, useEffect} from 'react'
// Create a React component that fetches a list of movies from an API endpoint using useEffect hook and displays the title, year, and rating of each movie on the screen using the useState hook. Add a dropdown which filters the movies by year. You can keep 5 dropdown values - 2005 to 2010.
const fakeFetch = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://example.com/api/movies") {
        resolve({
          status: 200,
          message: "Success",
          data: [
            { title: "The Dark Knight", year: 2008, rating: 9.0 },
            { title: "Inception", year: 2009, rating: 8.8 },
            { title: "Interstellar", year: 2010, rating: 8.6 },
            { title: "Tenet", year: 2009, rating: 7.5 },
            { title: "Real Steal", year: 2007, rating: 7.5 },
          ],
        });
      } else {
        reject({
          status: 404,
          message: "Movies list not found.",
        });
      }
    }, 2000);
  });
};

const Question3 = () => {
    const [movieData, setMovieData] =  useState([]);
    const [movieData2, setMovieData2] =  useState([]);
    const [loading, setLoading] =  useState(true);
    const yearList = ["All",...new Set(movieData2.map(({year})=> year))];
    const getData = async()=>{
        try {
            const response = await fakeFetch("https://example.com/api/movies")
            setMovieData(response.data);
            setMovieData2(response.data);
            setLoading(false)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(()=>{
        getData();
    },[])

    const SortByYear = (event)=>{

        const choosedYear = parseInt(event.target.value);
        if(choosedYear === "All")
        {
            setMovieData(movieData2);
        }
        else{
            const filterYear = movieData2.filter(({year})=> year === choosedYear)
            setMovieData(filterYear);
        }

    }
  return (
    <div>
      <p>{loading && "...Loading"}</p>
      <h1>Movies</h1>
      <span>Filter By Year:</span>
      <select onChange={SortByYear}>
        {
            yearList.map((year)=> <option value={year}>{year}</option>)
        }
      </select>
      <ul>
        {
            movieData.map(({title, year, rating})=>{
                return <li>
                    <p>Title:{title}</p>
                    <p>Year:{year}</p>
                    <p>Rating:{rating}</p>
                </li>
            })
        }
      </ul>
    </div>
  )
}

export default Question3
