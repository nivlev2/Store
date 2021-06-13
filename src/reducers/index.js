const userCart = localStorage["cart"] ? JSON.parse(localStorage["cart"]) : {}
const initState = {
    login:false,
    cartList:userCart,
    products:[]
}

export const reducer = (state = {...initState},action) =>{
    switch(action.type){
        case "GET_PRODUCTS":
            return {...state,products:action.payload};
        case "GET_USER_CART":
            return {...state,cartList:action.payload}
        case "LOGGED_IN":
            return {...state,login:true,cartList:action.payload}
        case "CHECK_IF_LOGGED_IN" :
            return {...state,login:true}
        case 'REMOVE_USER':
            localStorage.removeItem('token')
            return {...state,login:false}
        default:
            return state
    }
}