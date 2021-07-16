//Estructura del reducer que sera usado en los componentes que lo tendrán compartido

const initialState={
    titulo:"",
    moviesList:[],
};

const moviesReducer =(state=initialState,action)=>{ //Reducer
    console.log(action);
    switch (action.type) {
        case "TITULO":
            return{
                ...state, //Spread
                titulo:action.payload, //payload son los datos enviados por action
            };
        case "MOVIESLIST":
            return{
                ...state, //Spread
                movieslist:action.payload,
            };
        default:
            return state;
    }
};

export default moviesReducer;