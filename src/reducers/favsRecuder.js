const initialState={ //Estado inicial
    favslist:[],
};

const favsReducer = (state=initialState,action)=>{
    let favUpdated = state.favslist; //respaldfo de estado inicial para sobrescritura indirecta

    switch (action.type) { //action se compone de .type y payload
        case "ADD_FAVSLIST": //en mayus por estandar
            favUpdated.push(action.payload);
            return {...state,favslist:favUpdated};
        case "DELETE_FAVSLIST":
            favUpdated.splice(action.payload,1);
            return {...state,favslist:favUpdated};
        default:
            return state;
    }
}

export default favsReducer;