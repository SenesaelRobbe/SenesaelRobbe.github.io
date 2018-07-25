document.addEventListener("DOMContentLoaded", main);
const jokeURI = 'https://api.chucknorris.io/jokes/random';

//document.querySelectorAll(".joke, .movie").forEach((item) => item.addEventListener("click", displayButtons));
//.addEventListener("click", displayButtons);
// document.querySelectorAll("form").addEventListener("submit", (e) => {
//     e.preventDefault();
// });

function main(){
    //checkForSW();
    console.log("I loaded");
    document.querySelector("[value=Joke]").addEventListener("click", fetchJoke);
    document.querySelector("[value=movies]").addEventListener("click", fetchMovies);
    document.querySelectorAll("form").forEach(item => item.addEventListener("submit", e => e.preventDefault()));
    document.querySelector("#subsc").addEventListener("click", toggleSub);
    document.querySelector("[value=Subscribe]").addEventListener("click", handleSub);
}

let toggleSub = function(e){
    let subs = document.querySelector("#subs");
    subs.getAttribute("class") === "hidden" ? subs.removeAttribute("class") : subs.setAttribute("class", "hidden");
};

// let displayButtons = (e) => {
//     console.log(e.currentTarget);
//     console.log(e.currentTarget.getAttribute("class"));
//     let chosenClass = e.currentTarget.getAttribute("class");
//
//     e.currentTarget.classList =  `${chosenClass}Display`;
// };

let checkForSW = () => {
    if('serviceWorker' in navigator){
        navigator.serviceWorker.register("/sw.js")
            .then(reg => console.log('registration succeeded. Scope is ' + reg.scope))
            .catch(err => console.log('Exited with err: ', err))
    }
};

let fetchJoke = function(){
    fetch(jokeURI + categoryLink())
        .then(data => data.json())
        .then(data => data.value)
        .then(data => document.querySelector(".joke").innerHTML = `<p>"${data}"</p>`)
        .catch(err => console.log(err));
};

let fetchMovies = function(){
    fetch('https://api.themoviedb.org/3/discover/movie?with_cast=51576&api_key=8d86f5dc121d85f4a4651ede8a2fca3c')
        .then(data => data.json())
        .then(data => data.results)
        .then(data => shuffle(data))
        .then(data => {
            document.querySelector(".movies").innerHTML = "";
            //                "<article><h1>" + movie.title
            // + "</h1>" + "<img src='http://image.tmdb.org/t/p/w185/" + movie.poster_path + "' alt=''/>" +
            // "</article>"
            data.forEach((movie) => {
                document.querySelector(".movies").innerHTML +=
                `<figure>
                    <figcaption>${movie.title}</figcaption>
                    <img src='https://image.tmdb.org/t/p/w185/${movie.poster_path}' alt=''/>
                </figure>`
        })

}).catch(err => console.log(err));
};

let shuffle = function(a){
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};
// function shuffle(a) {
//     for (let i = a.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [a[i], a[j]] = [a[j], a[i]];
//     }
//     return a;
// }

let categoryLink = function(){
  let category = document.querySelector('select').value.toLowerCase();
    console.log(category);
  if(category == 'random'){
      return '';
  } else {
      return `?category=${category}`;
  }
};

let handleSub = function(){
    //I'll only show in console what happens
    let name = document.querySelector("#name").value;
    let mail = document.querySelector("#mail").value;
    let string = `User ${name} with emailadress ${mail} subscribed!`;
    alert(string);
};