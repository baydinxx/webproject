// const API_URL =
//   "https://api.themoviedb.org/3/movie/popular?api_key=31f2eda3adf46022fdb73817fb855968";
// const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
// const SEARCH_API =
//   'https://api.themoviedb.org/3/search/movie?api_key=31f2eda3adf46022fdb73817fb855968&query="';
// const home = document.getElementById("home");
// const form = document.getElementById("form");
// const search = document.getElementById("search");
import {
  API_URL,
  IMG_PATH,
  SEARCH_API,
  home,
  form,
  search,
  now_playing,
  slider,
  
} from "./constants.js";
// Get initial movies
getMovies(API_URL);
getSliderMovies(now_playing)

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.results);
  showmovie(data.results);
  
}
async function getSliderMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.results);
  slidershowmovie(data.results);
  
}

// serch movies
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);
    search.value = "";
  } else {
    window.location.reload();
  }
});

function showmovie(movies) {
  home.innerHTML = "";

  movies.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("cart");

    movieEl.innerHTML = ` <img src="${IMG_PATH + poster_path}" alt="${title}" />
          <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getvoteClass(vote_average)}">${
      Math.round(vote_average * 10) / 10
    }</span>
          </div>
          <div class="overview">
            <h3>Overview</h3>
            <p>${overview}</p>
          </div>`;

    home.appendChild(movieEl);
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




 


function slidershowmovie(movies) {
  slider.innerHTML = "";

 let currentIndex = 0;
 const slidercart = document.getElementById("slider-cart");

 displayslidermovie(movies, currentIndex);

   const rigtbtn = document.querySelector(".fa-circle-chevron-right");
   const leftbtn = document.querySelector(".fa-circle-chevron-left");
  
    rigtbtn.addEventListener("click", () => {

      currentIndex++;

      if (currentIndex >= movies.length) {
        currentIndex = 0;
      }

      slider.innerHTML = "";
      
      displayslidermovie(movies, currentIndex);
    });
 
    leftbtn.addEventListener("click", () => {
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = movies.length - 1;
      }
       slider.innerHTML = "";
      displayslidermovie(movies, currentIndex);
    });

  }

   


function displayslidermovie(movie, startIndex) {

   let limitedmovies = movie.slice(startIndex, startIndex + 5); // 5 film gösterilecek

   console.log(startIndex, limitedmovies);

  limitedmovies.forEach((movie) => {
    const { poster_path, title, vote_average} = movie;

    const parrentcart = document.createElement("div");
    parrentcart.classList.add("slider-track"); // her kart için kapsayıcı

    const sliderEl = document.createElement("div");
    sliderEl.classList.add("slider-cart"); // her kart için kapsayıcı

    sliderEl.innerHTML = `
      <img src="${IMG_PATH + poster_path}" alt="${title}" />
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getvoteClass(vote_average)}">
          ${Math.round(vote_average * 10) / 10}
        </span>
      </div>
      
    `;
    

  
    parrentcart.appendChild(sliderEl);
    slider.appendChild(parrentcart);

  });
}



