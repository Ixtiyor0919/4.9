const API_KEY = "72467cc8"

// function getMovies(title) {
//     return fetch(`https://www.omdbapi.com/?=tt3896198&apikey=${API_KEY}&s=${title}`)
//         .then(res => res.json())
// }
function getMovies(title, type) {
    return fetch(`https://www.omdbapi.com/?=&apikey=${API_KEY}&s=${title}&type=${type}`)
        .then(res => res.json())
}