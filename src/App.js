import {useEffect, useState} from "react";
import './App.css';
import SearchIcon from './search.svg'
import MovieCard from './MovieCard'

// Api Key - 698d29c1

const API_URL = 'http://www.omdbapi.com?apikey=698d29c1';

const movie = {
    'Poster': "https://m.media-amazon.com/images/M/MV5BODIyMDdhNTgtNDlmOC00MjUxLWE2NDItODA5MTdkNzY3ZTdhXkEyXkFqcGc@._V1_SX300.jpg",
'Title': "Batman Begins",
'Type': "movie",
'Year': "2005",
'imdbID': "tt0372784"
}

const App = () =>{

    const [movies,setMovies] = useState([]);
    const [searchTerm,setSearchTerm] = useState('');

    const searchMovies = async(title)=>{
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
        console.log(data);
    }
    useEffect(()=>{
        searchMovies("Batman")
    },[]);
    return(
        <div className="app">
            <h1>OneStop Movies</h1>
            <div className="search">
            <input
                placeholder="Search For..."
                value = {searchTerm}
                onChange={(e)=>{
                    setSearchTerm(e.target.value)
                }}
            />
            <img 
            src={SearchIcon}
            alt = 'search'
            onClick={()=>{
                searchMovies(searchTerm);
            }}
            />
            </div>
                {
                    movies.length>0?
                    (
                    <div className="container">
                    {
                        movies.map((movie)=>(
                            <MovieCard movie={movie}/>
                        ))
                    }
                    </div>) : 
                    (
                    <div className="empty">
                        <h2> No movies Found</h2>
                    </div>
                    )
                }
            
        </div>
    ); 
}

export default App;