const movieUrl = "https://api.themoviedb.org/3/"
const apiKey = "3aed1bfda8d54aa28cc0e174e6f81438"
const imageUrl = "https://image.tmdb.org/t/p/w500/"

const movies = document.querySelector('.movies')
const genreGroup = document.querySelector('.list-group')
let genres = document.querySelectorAll('.genre')
let heading = document.getElementById('heading')

let modal = document.getElementById('movieInfo')
let modalTitle = document.querySelector('.modal-title')
let modalBody = document.querySelector('.modal-body')

fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=" + apiKey)
.then(response => response.json())
.then(data => 
    data.genres.forEach(genre => {
        let listGroupItem = document.createElement('div')
        listGroupItem.classList.add('list-group-item')
        listGroupItem.classList.add('genre')
        listGroupItem.id = genre.id
        listGroupItem.textContent = genre.name
        genreGroup.appendChild(listGroupItem)
    }    
))

function nowPlaying() {
    fetch(movieUrl + "movie/now_playing/?api_key=" + apiKey)
    .then((response) => response.json())
    .then((data) => 
        data.results.forEach(movie => {
            let card = document.createElement('div')
            card.classList.add('card')
            card.style.width = '18rem'
            card.style.display = 'inline-block'
            card.style.margin = '10px'

            let cardImage = document.createElement('img')
            cardImage.classList.add('card-img-top')
            cardImage.alt = movie.title
            cardImage.src = imageUrl + movie.poster_path

            let cardBody = document.createElement('div')
            cardBody.classList.add('card-body')
            
            let cardTitle = document.createElement('h5')
            cardTitle.textContent = movie.title

            let cardText = document.createElement('p')
            cardText.classList.add('card-text')
            cardText.textContent = movie.vote_average + " rating"

            let cardButton = document.createElement('button')
            cardButton.classList.add('btn')
            cardButton.classList.add('btn-primary')
            cardButton.classList.add(movie.id)
            cardButton.id = 'more'
            cardButton.dataset.bsToggle = 'modal'
            cardButton.dataset.bsTarget = '#movieInfo'
            cardButton.textContent = "Read description"

            card.append(cardImage)
            card.append(cardBody)
            cardBody.append(cardTitle)
            cardBody.append(cardText)
            cardBody.append(cardButton)
            movies.appendChild(card)
        })
    )
}

function movieByGenre(genreId) {
    fetch(movieUrl + "genre/"+ genreId +"/movies?api_key=" + apiKey)
    .then((response) => response.json())
    .then((data) => 
        data.results.forEach(movie => {
            let card = document.createElement('div')
            card.classList.add('card')
            card.style.width = '18rem'
            card.style.display = 'inline-block'
            card.style.margin = '10px'

            let cardImage = document.createElement('img')
            cardImage.classList.add('card-img-top')
            cardImage.alt = movie.title
            cardImage.src = imageUrl + movie.poster_path

            let cardBody = document.createElement('div')
            cardBody.classList.add('card-body')
            
            let cardTitle = document.createElement('h5')
            cardTitle.textContent = movie.title

            let cardText = document.createElement('p')
            cardText.classList.add('card-text')
            cardText.textContent = movie.vote_average + " rating"

            let cardButton = document.createElement('button')
            cardButton.classList.add('btn')
            cardButton.classList.add('btn-primary')
            cardButton.classList.add(movie.id)
            cardButton.id = 'more'
            cardButton.dataset.bsToggle = 'modal'
            cardButton.dataset.bsTarget = '#movieInfo'
            cardButton.textContent = "Read description"

            card.append(cardImage)
            card.append(cardBody)
            cardBody.append(cardTitle)
            cardBody.append(cardText)
            cardBody.append(cardButton)
            movies.appendChild(card)
        })
    )
}

genreGroup.addEventListener('click', (e) => {
    heading.textContent = e.target.textContent
    showBygenre(e.target.id, e.target.textContent)
})

movies.addEventListener('click', (e) => {
    let movieId = e.target.classList[2]
    if(e.target.id == "more") {
        allMovies(movieId)
    }
})

async function allMovies(movieId) {
    let movies = []
    movies = await getMovieInfo(movieId)
    modalTitle.innerHTML = movies.title
    modalBody.textContent = movies.overview
}

async function getMovieInfo(movieId) {
    const response = await fetch(movieUrl + "movie/" + movieId + "?api_key=" + apiKey)
    const movies = await response.json()
    return movies
}

function showBygenre(id, genre) {
    if(genre == "Now Playing") {
        movies.textContent = ''
        nowPlaying()
    } else {
        movies.textContent = ''
        movieByGenre(id)
    }
}

nowPlaying()