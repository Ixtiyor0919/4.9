var films = []
var moviesed = [];

var sortType = 1; //Default o'sish tartibida sortlangsn;
var sortBy = 1; //Id bo'yicha sortlangan;
//Sort movies
var sortButtonsEl = document.querySelector('.boxSelects');

//Functions
const moviesOpts = [
    {value:1, text:'Sort by id'},
    {value:2, text:'Sort by title'},
    {value:3, text:'Sort by year'},
];

let sortBySelectEl = document.querySelector('.moviesOpts');
sortBySelectEl.addEventListener('change', (e) => {
    sortBy = e.target.value - 0;
    sortAndRender(sortType, sortBy);
})

const optsGreaterOrLess = [
    {value:1, text:`O'sish`},
    {value:-1, text:`Kamayish`},
]

let typeSortSelectEl = document.querySelector('.optsGreaterOrLess');
typeSortSelectEl.addEventListener('change', (e) => {
    sortType = e.target.value - 0;
    sortAndRender(sortType, sortBy);
})
var todoForm = document.querySelector('.main-container');
var todoInput = document.querySelector('.form-control');

var movieContainer = document.querySelector('.movie-container')
var moviesRow = document.querySelector('[data-element=movie-container]');

var todoListEl = document.querySelector('.todo-list');

var bookmarkedMovie = [];

function createCloneTodo(todo) {
    let templateTodoEl = document.querySelector('#todo-item');
    let cloneTodoItem = templateTodoEl.content.cloneNode(true);
    
    cloneTodoItem.querySelector('.todo-id').textContent = 'id: ' + todo.imdbID;
    cloneTodoItem.querySelector('.todo-title').textContent = todo.Title;
    cloneTodoItem.querySelector('.todo-year').textContent = todo.Year + '-y.';
    
    let deleteBtn = cloneTodoItem.querySelector('.todo-delete-btn');
    deleteBtn.dataset.todoId = todo.imdbID;
    deleteBtn.dataset.task = 'delete';
    return cloneTodoItem;
    
}
renderBookmarkTodos(bookmarkedMovie, todoListEl)

function cloneAndRender(movie) {
    let singleMovieTemplate = document.querySelector('#movie-item');
    let movieItemElClone = singleMovieTemplate.content.cloneNode(true);
    
    let movieImageEl = movieItemElClone.querySelector('[data-element=movie-img]');
    movieImageEl.src = movie.Poster;
    movieImageEl.style.height = '200px';
    movieImageEl.addEventListener('error', () => {
        movieImageEl.src = 'http://picsum.photos/200/200';
        // movieImageEl.src = 'movie.poster';
    })

    // movieItemElClone.querySelector('[data-element=movie-id]').textContent = `id: ` + movie.id;
    // movieItemElClone.querySelector('[data-element=movie-title]').textContent = `Title: ` + movie.title;
    // movieItemElClone.querySelector('[data-element=movie-year]').textContent = `Year: ` + movie.year;

    // movieItemElClone.querySelector('[data-element=movie-id-films]').textContent = `id: ` + movie.imdbID;
    movieItemElClone.querySelector('[data-element=movie-title-films]').textContent = `Title: ` + movie.Title;
    movieItemElClone.querySelector('[data-element=movie-year-films]').textContent = `year: ` + movie.Year;
    // movieItemElClone.querySelector('[data-element=movie-type]').textContent = `type: ` + movie.Type;

    let movieInfoBtn = movieItemElClone.querySelector('[data-element=movie-info]');
    movieInfoBtn.textContent = 'More info';
    movieInfoBtn.dataset.todoId = movie.imdbID
    movieInfoBtn.dataset.task = 'Info'

    let movieBtn = movieItemElClone.querySelector('[data-element=movie-bookmark]');
    movieBtn.textContent = 'Bookmark';
    movieBtn.dataset.todoId = movie.imdbID
    movieBtn.dataset.task = 'bookmark'
    movieBtn.addEventListener("click", (event) => {
        films.forEach((movie) => {
            if(event.target.dataset.todoId == movie.imdbID) {
                bookmarkedMovie.push(movie);
            };
        });
        renderBookmarkTodos(bookmarkedMovie, todoListEl);
    })
    return movieItemElClone;
}
// renderMovies(movies, moviesRow)

// function cloneFilms(film) {
//     let singleMovieTemplate = document.querySelector('#movie-item');
//     let movieItemElClone = singleMovieTemplate.content.cloneNode(true);
    
//     let movieImageEl = movieItemElClone.querySelector('[data-element=movie-img]');
//     movieImageEl.src = film.Poster;
//     movieImageEl.style.height = '200px';
//     movieImageEl.addEventListener('error', () => {
//             movieImageEl.src = 'http://picsum.photos/200/200';
//     })

//     movieItemElClone.querySelector('[data-element=movie-id]').textContent = `id: ` + film.;
//     movieItemElClone.querySelector('[data-element=movie-title]').textContent = `Title: ` + film.Title;
//     movieItemElClone.querySelector('[data-element=movie-year]').textContent = `year: ` + film.Year;
//     movieItemElClone.querySelector('[data-element=movie-type]').textContent = `type: ` + film.Type;
// }
// renderFilms(films, moviesRow)

document.body.addEventListener('click', (event) => {
    let clickedEl = event.target;

    // if(clickedEl.dataset.todoId = movies.id) {
    //     movies.forEach((movie) => {
    //         clickedEl.dataset.todoId == movie.id
    //         bookmarkedMovie.push(movie);
    //     });
    // }//ishlamadi`
    // renderBookmarkTodos(bookmarkedMovie, todoListEl);
    // renderTodos(bookmarkedMovie, todoListEl);
    // renderPagination();
    
    if(clickedEl.dataset.task === 'delete') {
        bookmarkedMovie = bookmarkedMovie.filter(movie => movie.imdbID != event.target.dataset.todoId)
        renderBookmarkTodos(bookmarkedMovie, todoListEl);
    }//ishladi

    if(clickedEl.dataset.task === 'Info') {
        let todoId = clickedEl.dataset.todoId;
        let todo = films.find(item => item.imdbID == todoId)
        let content = createModalInfo(todo);
        let modal = renderModal(content);
        document.body.appendChild(modal)
    }//ishladi

    if(clickedEl.dataset.task === 'delete') {
        let modalEl = document.querySelector('.my-modal');
        modalEl.classList.remove('my-modal--active');
    }//ishladi
})

function createModalInfo(movie) {
    let modalTemplate = document.querySelector('#modal-template');
    let modalEl = modalTemplate.content.cloneNode(true);
    let modalImg = modalEl.querySelector('.movie-modal-img');
    modalImg.src = movie.Poster;
    modalImg.style.width = '100%';
    modalImg.style.height = '300px';
    modalImg.addEventListener('error', () => {
        modalImg.src = 'http://picsum.photos/200/200';
    })
    modalId = modalEl.querySelector('.movie-modal-id').textContent = movie.imdbID;
    modalTitle = modalEl.querySelector('.movie-modal-title').textContent = movie.Title;
    // modalDirector = modalEl.querySelector('.movie-modal-director').textContent = movie.director;
    // modalActors = modalEl.querySelector('.movie-modal-actors').textContent = movie.actors;
    // modalGenres = modalEl.querySelector('.movie-modal-genres').textContent = movie.genres;
    modalDescription = modalEl.querySelector('.movie-modal-description').textContent = movie.Type;
    modalYear = modalEl.querySelector('.movie-modal-year').textContent = movie.Year;
    
    let modalBtn = modalEl.querySelector('.movie-modal-btn');
    modalBtn.dataset.todoId = movie.imdbID
    modalBtn.dataset.task = 'delete';
    return modalEl
}

// Pagination
var itemPerpage = 10;
var currentPage = 1;
   
var paginationEl = document.querySelector('.todo-pagination');
   
paginationEl.addEventListener('click', (event) => {
    if(event.target.dataset.task == 'page') {
        currentPage = event.target.dataset.pageId;
        renderMovies(films, moviesRow)
        renderTodos(films, moviesRow);
        renderPagination()
    }
})
   
renderPagination();
todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    var todoInput = document.querySelector('.form-control');
    let valued = todoInput.value;
    getMovies(valued).then((result) => {
        moviesed = result.Search 
        moviesed.forEach((movie) => {
            films.push(movie)
            todoInput.value = '';
            renderMovies(films, moviesRow)
            renderPagination();
        })
        // moviesed.forEach((movie) => {
        //     films.innerHTML = false;
        //     movie.forEach((move) => {
        //         films.push(move)
        //         todoInput.value = '';
        //         renderMovies(films, moviesRow)
        //         renderPagination();
        //     })
        // })
        renderMovies(films, moviesRow)
    }).catch(err => console.error(err))
})







function renderSortBookmarkedMovies(todosData){
    todoListEl.innerHTML = null
    if(todosData.length > 0){
        todosData.forEach((movie, index) => {
            let todoEl = createCloneTodo(movie)
            todoListEl.appendChild(todoEl)
        })
    }else{
        todoListEl.textContent = "Todos not found";
    }
}

var itemPerpage = 10;
var currentPage = 1;
function renderTodos(todos=[], node) {
    node.innerHTML = null;
    todos.slice(itemPerpage * (currentPage - 1), currentPage * itemPerpage).forEach((todo) => {
        node.appendChild(cloneAndRender(todo));
    });
};
function sortAndRender(sortType = 1, sortBy = 1) {
    films = films.sort((a, b) => {
        switch(sortBy) {
            case 1:
                return sortType * (a.imdbID - b.imdbID);
                case 2: return sortType * (a.Title.charCodeAt() - b.Title.charCodeAt());
                case 3: return sortType * ( a.Year - b.Year);
            default: return sortType *(a.imdbID - b.imdbID);
        }
    })
    renderMovies(films, moviesRow);
}
function renderPagination() {
    paginationEl.innerHTML = null;
    
    for(let i=1; i<= Math.ceil(films.length / itemPerpage); i++) {
        let templatePageItem = document.querySelector('#pagination-item');
        let pageItem = templatePageItem.content.cloneNode(true);
        
        let itemEl = pageItem.querySelector('.page-item');
        if(i == currentPage) {
            itemEl.classList.add('active');
        }else{
            itemEl.classList.remove('active');
        }
        
        let linkEl = pageItem.querySelector('.page-link');
        linkEl.textContent = i;
        linkEl.dataset.pageId = i;
        linkEl.dataset.task = 'page';
        paginationEl.appendChild(pageItem);
    }
}
function renderBookmarkTodos(todos=[], node) {
    node.innerHTML = null;
    todos.forEach((todo) => {
        node.appendChild(createCloneTodo(todo));
    })
}
function renderMovies(films=[], node) {
    node.innerHTML = null;
    
    films.forEach((movie) => {
        let movieItemEl =  cloneAndRender(movie);
        node.appendChild(movieItemEl);
    })
};
function renderModal(modal) {
    let modalEl = document.querySelector('.my-modal');
    let modalContent = modalEl.querySelector('.my-modal-content');
    modalContent.innerHTML = null;
    modalContent.appendChild(modal);    
    modalEl.classList.add('my-modal--active')
    return modalEl
}