document.addEventListener("DOMContentLoaded", main);
const jokeURI = 'https://api.chucknorris.io/jokes/random';

function main(){
    checkForSW();
    console.log("I loaded");
    document.querySelector("[value=Joke]").addEventListener("click", fetchJoke);
    document.querySelector("[value=movies]").addEventListener("click", fetchMovies);
    document.querySelectorAll(".joke, .movie").forEach((item) => item.addEventListener("click", displayButtons));
        //.addEventListener("click", displayButtons);
}

// let displayButtons = (e) => {
//     console.log(e.currentTarget);
//     console.log(e.currentTarget.getAttribute("class"));
//     let chosenClass = e.currentTarget.getAttribute("class");
//
//     e.currentTarget.classList =  `${chosenClass}Display`;
// };

let checkForSW = () => {
    if('serviceWorker' in navigator){
        navigator.serviceWorker.register("/sw.js", {scope: '/'})
            .then(reg => console.log('registration succeeded. Scope is ' + reg.scope))
            .catch(err => console.log('Exited with err: ', err))
    }
};

let fetchJoke = function(){
    fetch(jokeURI + categoryLink())
        .then(data => data.json())
        .then(data => data.value)
        .then(data => document.querySelector(".joke").innerHTML = data)
        .catch(err => console.log(err));
};

let fetchMovies = function(){
    fetch('https://api.themoviedb.org/3/discover/movie?with_cast=51576&api_key=8d86f5dc121d85f4a4651ede8a2fca3c')
        .then(data => data.json())
        .then(data => data.results)
        .then(data => {
            //                "<article><h1>" + movie.title
            // + "</h1>" + "<img src='http://image.tmdb.org/t/p/w185/" + movie.poster_path + "' alt=''/>" +
            // "</article>"

            data.forEach((movie) => document.querySelector(".movies").innerHTML +=
                `<figure>
                    <figcaption>${movie.title}</figcaption>
                    <img src='http://image.tmdb.org/t/p/w185/${movie.poster_path}' alt=''/>
                </figure>`);
        })
        .catch(err => console.log(err));
};


let categoryLink = function(){
  let category = document.querySelector('[title=Category]').value;
  if(category == ''){
      return '';
  } else {

      return '?category=' + category;
  }
};