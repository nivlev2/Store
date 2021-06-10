const initState = {
    login:false,
    cart:[],
    products:[]
}

export const reducer = (state = initState,action) =>{
    switch(action.type){
        case "GET_PRODUCTS":
            return {...state,products:action.payload}
        default:
            return state
    }
}