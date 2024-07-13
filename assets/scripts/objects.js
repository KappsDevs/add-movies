/* 
    Object Destructuring -> Used in renderMovies

    Is a JavaScript expression that makes it possible to unpack values from arrays, or properties from objects, into distinct variables. 

    Exemple:
    const obj = { a: 1, b: 2 };
    const { a, b } = obj;
        is equivalent to:
            const a = obj.a;
            const b = obj.b;


    This -> used in newMovie

    When used in an object method, this refers to the object.
    In the example this refers to the person object.

    const person = {
        firstName: "John",
        lastName : "Doe",
        id       : 5566,
        fullName : function() {
            return this.firstName + " " + this.lastName;
        }
    };



*/


const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');

const movies = [];

const renderMovies = (filter = '') => {
    const movieList = document.getElementById('movie-list');

    

    if(movies.length === 0){
        movieList.classList.remove('visible');
        return;
    }else{
        movieList.classList.add('visible');
    }
    movieList.innerHTML = '';

    const filteredMovies = !filter ? movies : movies.filter(movie => movie.info.title.includes(filter));

    filteredMovies.forEach((movie) => {
        const movieEl = document.createElement('li');

        /*  If I want to chck the existence, I could use:

            if( 'info' in movie){} 

            if( !('info' in movie)){} 
        
            if( movie.info === undefine){}

        */

        const { info } = movie;
        /* 
        const { title: movieTitle } = info;
        
        getFormattedTitle = getFormattedTitle.bind(movie);
            Bind() prepare a function to future exeecution and returns a new fuction object in the end
        Call()-> execute the fuction right away, aditional arguments as a comman separeted
        Aplly() -> aditional argument as array
        */
        let {getFormattedTitle} = movie;
        let text = getFormattedTitle.call(movie) + ' - ';
        for(const key in info){ 
            if( key !== 'title'){
                text = text + `${key}: ${info[key]}`;
            }
        }
        movieEl.textContent = text;
        movieList.append(movieEl);
    });
};



const addMovieHandler = () => {
    const title = document.getElementById('title').value;
    const extraName = document.getElementById('extra-name').value;
    const extraValue = document.getElementById('extra-value').value;
    
    if (
        title.trim() === '' || extraName === ' ' || extraValue === ''
    ){
        return;
    }

    const newMovie = {
        info: {
            title,               // como já tem uma variavel como esse mesmo nome, js já interpreta como sendo title:title
            [extraName]: extraValue
        },
        id: Math.random(),
        getFormattedTitle(){
            return this.info.title.toUpperCase();
        }

        /* 
            Another way to be written:
            
            getFormattedTitle: function(){
                return this.info.title.toUpperCase();
        }
        */
    };

    movies.push(newMovie);
    renderMovies();
};

const searchMovieHandler = () => {
    const filterTerm = document.getElementById('filter-title').value;
    renderMovies(filterTerm);
};

addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', searchMovieHandler);

