import { Actions } from "../actions";

const initState = {
    login:false,
    showCart:[],
    total:0,
    cartList:{},
    products:[],
    error:false,
    user:{},
    lastOrders:[]
}

export const reducer = (state = {...initState},action) =>{
    switch(action.type){
        case "GET_PRODUCTS":
            return {...state,products:action.payload};
        case "GET_USER_CART":
            return {...state,cartList:action.payload.cart,showCart:action.payload.showCart,total:action.payload.total}
        case "GET_USER_DETAILS":
            return {...state,user:action.payload.user,lastOrders:action.payload.lastOrders}
        case "RESET_USER_CART":
            return{...state,cartList:{},showCart:[]}
        case "LOGGED_IN":
            return {...state,login:true}
        case 'REMOVE_USER':
            return {...state,login:false}
        case "NETWORK_ERR":
            return {...state,error:true}
        default:
            return state
    }
}