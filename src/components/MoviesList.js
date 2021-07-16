//##########Primer paso para la creación de componentes *

// ~~~Jerarquía de IMPORTS~~~

import React, { useState,useEffect,useContext } from 'react'; //~~Componentes por defecto de REACT

import { Card,Segment } from 'semantic-ui-react'; //~~Dependencias

import MoviesContext from '../context/MoviesContext';

import Api from '../utils.js/Api'; //~~Componentes propios. Se usa {} ya que no es una exportación por defecto y se llama a un item específico
import ItemMovie from './ItemMovie'; 
import NavBar from './NavBar';



const MoviesList=()=> { //Componente funcional de react RFC
    const {movies,dispatchMovies} = useContext(MoviesContext);

    const [movieslist, setMovieslist] = useState([]); //Hooks, creación de Estado movieslist. Después de set SIEMPRE MAYÚS.

    useEffect(() => { //Hook, detecta el cambio de un estado, pero como el [] esta vacio lo que hace es ejecuatrlo al momento
        fetchData(movies.titulo);
    }, [movies.titulo]);

    const fetchData =(title) =>{
        Api.getMovies(title)
        .then((resp)=>{
            console.log(resp);
            if (resp.data.Response==="True") { //Validación para confirmar que la Api no tenga errores. El valor que se vlaida depende de la API
                // console.log(resp.data);
                // setMovieslist(resp.data.Search);

                dispatchMovies({ //envia estos datos a moviesReducer.js
                    type: "MOVIESLIST", //activs el case
                    payload:resp.data.Search, //activa el return y lo alacena en el movies list de moviesReducer.js
                });
            } else{
            console.log(resp.data.Error);
            }
        })
        .catch((err)=>{
            console.log("error por mí".err);
        });
    };

    const CreateItems =()=>{
        return movies.movieslist.map((movie)=> //Peina los resultados del arreglo y los separa en elementos individuales
        <ItemMovie
            Poster={movie.Poster}
            Title={movie.Title}
            Year={movie.Year}
            imdbID={movie.imdbID}
            Movie={movie}
        />);
    };
    
    return (
        <>
        <NavBar fetchData={fetchData} name="home"/>
         <h1>Lista de Películas</h1>
         <Segment raised>
         <Card.Group> {CreateItems()} </Card.Group>
         </Segment>
        </>
    );
};

export default MoviesList;