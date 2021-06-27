const login = localStorage["login"] ? JSON.parse(localStorage["login"]) : false;
const cartList = localStorage["cart"] ? JSON.parse(localStorage["cart"]): {};
const showCart = localStorage["showCart"] ? JSON.parse(localStorage["showCart"]):[];
const lastOrders = localStorage["lastOrders"] ? JSON.parse(localStorage["lastOrders"]):[]
const user = localStorage["user"] ? JSON.parse(localStorage["user"]):{}
const total = localStorage["total"] ? localStorage["total"]:0
const initState = {
    login:login,
    showCart:showCart,
    total:total,
    cartList:cartList,
    products:[],
    error:false,
    user:user,
    lastOrders:lastOrders
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