//##########Segundo paso para la creación de componentes # 4,9

// ~~~Jerarquía de IMPORTS~~~
import React, {useState,useReducer} from 'react'; //~~Componentes por defecto de REACT

import {BrowserRouter as Router, Route} from "react-router-dom"; //~~Dependencias

import MoviesContext from './context/MoviesContext';
import moviesReducer from './reducers/moviesReducer';

import FavsContext from './context/FavsContext';
import favsReducer from './reducers/favsRecuder';

import MoviesList from './components/MoviesList';  //~~Componentes propios. Se usa {} ya que no es una exportación por defecto y se llama a un item específico
import MoviesFavs from './components/MoviesFavs';

import 'semantic-ui-css/semantic.min.css';

const initMovies=()=>{ //valor dado a la esctructura de abajo 
  return {titulo:"Avengers",movieslist:[]};
}

const initFavs=()=>{ //valor dado a la esctructura de abajo 
  return {favslist:[]};
}

//Esctructura del context de App
export const App = () => {
  // const [titulo, setTitulo] = useState("Avengers");
  const [movies, dispatchMovies] = useReducer( //asignación de valores del reducer (Sinppet useReducer)
    moviesReducer,
    {},
    initMovies);

  const [favs, dispatchFavs] = useReducer(favsReducer, {}, initFavs);

  return (
  <>

  <MoviesContext.Provider value={{movies,dispatchMovies}}> {/*Lo que esta dentro es dodne podra ser compartido el estado global*/}
  <FavsContext.Provider value={{favs, dispatchFavs}}> {/*Dobles llaves por que es un objeto dentro de una variable*/}
    <Router>
      <Route path="/" exact component={MoviesList}></Route> {/*path= Nombre que queramos para el url; exact=Para que solo muestre el compoennte especificado; componente=El componente especificado*/}
      <Route path="/favs" exact component={MoviesFavs}></Route> {/*Tanto esta linea como la de arriba se usan en NavBar.js #14 */}
    </Router>
  </FavsContext.Provider>
    </MoviesContext.Provider>
  </>
  );
};
