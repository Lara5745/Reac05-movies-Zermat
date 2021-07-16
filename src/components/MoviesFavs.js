import React, {useContext} from 'react';

import FavsContext from '../context/FavsContext';

import NavBar from './NavBar';

import ItemMovie from './ItemMovie';
import { Segment,Card } from 'semantic-ui-react';

const MoviesFavs=()=> {
    const {favs} = useContext(FavsContext);

    const CreateItems = () =>{
        return favs.favslist.map((movie)=>
        
        <ItemMovie
            Poster={movie.Poster}
            Title={movie.Title}
            Year={movie.Year}
            imdbID={movie.imdbID}
            Movie={movie}
        />
            
        );
    };


    return (
        <>
        <NavBar name="favorites"/>
        <h1>Mis favoritos</h1>
        <Segment raised>
         <Card.Group> {CreateItems()} </Card.Group>
         </Segment>   
        </>
    );
};

export default MoviesFavs;