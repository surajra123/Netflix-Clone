import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
import { Link } from "react-router-dom";

const apiKey = "6c72c05e123c510d5caebe553c97971f";
const url = "https://api.themoviedb.org/3";
const popular = "popular";
const imgUrl = "https://image.tmdb.org/t/p/w500";
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const topRated = "top_rated";

const Card = ({ img }) => {
  return (
    <>
      <img className="card" src={img} alt="cover" />
    </>
  );
};

const Row = ({ title, arr = [{}] }) => {
  return (
    <div className="row">
      <h2>{title}</h2>
      <div>
        {arr.map((item) => {
          return <Card key={item.unique} img={`${imgUrl}/${item.poster_path}`} />;
        })}
      </div>
    </div>
  );
};

const Home = () => {
  const [popularMovies, setPopularsMovies] = useState([]);
  const [nowplayingMovies, setnowplayingMovies] = useState([]);
  const [upcomingMovies, setupcomingMovies] = useState([]);
  const [topratedMovies, settopratedMovies] = useState([]);
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    const fetchUpcoming = async () => {
      const { data } = await axios.get(
        `${url}/movie/${upcoming}?api_key=${apiKey}&page=3`
      );
      setupcomingMovies(data.results);
    };
    const fetchNowPlaying = async () => {
      const { data } = await axios.get(
        `${url}/movie/${nowPlaying}?api_key=${apiKey}&`
      );
      setnowplayingMovies(data.results);
    };
    const fetchPopular = async () => {
      const { data } = await axios.get(
        `${url}/movie/${popular}?api_key=${apiKey}&page=6`
      );
      setPopularsMovies(data.results);
    };
    const fetchTopRated = async () => {
      const { data } = await axios.get(
        `${url}/movie/${topRated}?api_key=${apiKey}&`
      );
      settopratedMovies(data.results);
    };

    const getAllGenre = async () => {
      const { data } = await axios.get(
        `${url}/genre/movie/list?api_key=${apiKey}&langauge=en-US&page=1`
      );
      setGenre(data.genres);
      console.log(data.genres);
    };

    fetchUpcoming();
    fetchNowPlaying();
    fetchPopular();
    fetchTopRated();
    getAllGenre();
  }, []);

  return (
    <section className="home">
      <div className="banner" style={{
        backgroundImage:popularMovies[1]?`url(${`${imgUrl}/${popularMovies[1].poster_path}`})` : "rgb(16,16,16);"
      }}>
{/* 
      <h1>{popularMovies[1].original_title}</h1>
        <p>{popularMovies[1].overview}</p> */}
      </div>

      <Row title={"Popular"} arr={popularMovies} />
      <Row title={"Now Playing"} arr={nowplayingMovies} />
      <Row title={"UpComing"} arr={upcomingMovies} />
      <Row title={"Top Rated"} arr={topratedMovies} />

      <div className="genreBox">
        {genre.map((item) => (
          <Link key={item.id} to={`/genre/${item.id}`}>
            {item.name}
          </Link>
        ))}
      </div>
    </section>

    // https://api.themoviedb.org/3/movie/upcoming?api_key=6c72c05e123c510d5caebe553c97971f&langauge=en-US&page=1
    // https://api.themoviedb.org/3/movie/now_playing?api_key=6c72c05e123c510d5caebe553c97971f&langauge=en-US&page=1
    // https://api.themoviedb.org/3/tv/popular?api_key=6c72c05e123c510d5caebe553c97971f
    // https://api.themoviedb.org/3/genre/movie/list?api_key=6c72c05e123c510d5caebe553c97971f&langauge=en-US&page=1
    // https://api.themoviedb.org/3/movie/top_rated?api_key=6c72c05e123c510d5caebe553c97971f&langauge=en-US&page=1
  );
};

export default Home;
