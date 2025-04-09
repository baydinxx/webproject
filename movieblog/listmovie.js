import {
    API_URL,
    IMG_PATH,
    SEARCH_API,
    home,
    form,
    search,
    now_playing,
    Top_Rank,
  
  } from "./constants.js";


  movielist(API_URL);
  toplistmovie(Top_Rank)
  nowPlayingmovie(now_playing)
  
  async function movielist(url) {
    const res = await fetch(url);
    const data = await res.json();
   


 
    if (document.querySelector("#home")) {
      showNewOneMovie(data.results);
    }
    
    
  }
  
  async function toplistmovie(url) {
    const res = await fetch(url);
    const data = await res.json();
      
    if (document.querySelector("#imdb")) {
      imdbTopMovie(data.results);
    }
  }
   
  async function nowPlayingmovie(url) {
    const res = await fetch(url);
    const data = await res.json();
      
    if (document.querySelector("#now_playing")) {
      nowPlaying(data.results);
    }
  }

  function showNewOneMovie(movies) {
    home.innerHTML = "";
    
    const newonemovie=movies.filter(movie=>movie.release_date)
    .sort((a,b) => new Date(b.release_date)-new Date(a.release_date))
    .slice(0,50);



    newonemovie.forEach((movie) => {

      const { poster_path, title, vote_average, overview,release_date  } = movie;

      

   
  
      const movieEl = document.createElement("div");
      movieEl.classList.add("cart");
  
      movieEl.innerHTML = `<div class=movie-date><h4>${release_date}</h4> </div>
       
             <img src="${IMG_PATH + poster_path}" alt="${title}" />
      
            <div class="movie-info">
              <h3>${title}</h3>
              <span class="${getvoteClass(vote_average)}">${
        Math.round(vote_average * 10) / 10
      }</span>
            
            <div class="overview">
              <h3>Overview</h3>
              <p>${overview}</p>
            </div>`;
            
  
      home.appendChild(movieEl);
    });
  }

  function imdbTopMovie(movies){
    const imdb=document.querySelector("#imdb");
    imdb.innerHTML=""
   

    const topMovies = movies.filter(movie => movie.vote_average > 6.5);


      topMovies.forEach((movie)=>
      {
        const {title,poster_path,vote_average,overview}=movie

        const movieEl=document.createElement("div");

        movieEl.classList.add("cart")

        movieEl.innerHTML=`
             <img src="${IMG_PATH + poster_path}" alt="${title}" />
      
            <div class="movie-info">
              <h3>${title}</h3>
              <span class="${getvoteClass(vote_average)}">${
        Math.round(vote_average * 10) / 10
      }</span>
            
            <div class="overview">
              <h3>Overview</h3>
              <p>${overview}</p>
            </div>`;
            
  
      imdb.appendChild(movieEl);
    });

  }

  
  function nowPlaying(movies){
    const  nowplaying =document.querySelector("#now_playing");
    nowplaying.innerHTML=""
   




      movies.forEach((movie)=>
      {
        const {title,poster_path,vote_average,overview}=movie

        const movieEl=document.createElement("div");

        movieEl.classList.add("cart")

        movieEl.innerHTML=`
             <img src="${IMG_PATH + poster_path}" alt="${title}" />
      
            <div class="movie-info">
              <h3>${title}</h3>
              <span class="${getvoteClass(vote_average)}">${
        Math.round(vote_average * 10) / 10
      }</span>
            
            <div class="overview">
              <h3>Overview</h3>
              <p>${overview}</p>
            </div>`;
            
  
            nowplaying.appendChild(movieEl);
    });

  }

  function getvoteClass(vote) {
    if (vote >= 7) {
      return "green";
    } else if (vote >= 5) {
      return "orange";
    } else {
      return "red";
    }
  }
  