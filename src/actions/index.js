import { doApiGet,API_URL, doApiMethod } from "../services/apiSer"

export const Actions ={
     getProds: (page,sortQ,searchQ) => async dispatch =>{
          try {
          let url = API_URL + '/products?page=' + page + '&sort=' + sortQ + '&search=' + searchQ
          const response = await doApiGet(url)
          console.log(response);
          dispatch({type:"GET_PRODUCTS",payload:response})
          } catch (err) {
               dispatch({type:"NETWORK_ERR"})
               console.log(err);
          }
     },
     sortProducts:(sortedAr) =>{
          return {type:"SORT_PRODUCTS",payload:sortedAr}
     },
     searchProducts:(searchQ) =>{
          return {type:"SEARCH_PRODUCTS"}
     },
     getUserCart: () => async dispatch =>{
          try {
               let url = API_URL + '/users/userInfo'
               const response = await doApiMethod(url,'GET')
               let url2 = API_URL + '/users/cart'
               const showCart = await doApiMethod(url2,'GET')
               let num = 0;
               for(let item of showCart){
                    let tempSum = item.price * response.cart[item._id]
                    num +=tempSum
               }
               dispatch({type:"GET_USER_CART",payload:{cart:response.cart,showCart:showCart,total:num}})
          } catch (err) {
               console.log(err);
               throw(err)
          }     
     },
     resetUserCart:() =>{
          return {type:"RESET_USER_CART"}
     },
     setUserLogin: (userName) => {
          return {type:"LOGGED_IN"}
     },
     removeUser: () =>{
          console.log('removed');
          localStorage.removeItem('token')
          return {type:"REMOVE_USER"}
     }
}

// => async dispatch =>{
//      try {
//        //   let url = API_URL + '/users/userInfo'
//        //   const response = await doApiMethod(url,'GET')
//        // ,payload:cartData
//          dispatch({type:"LOGGED_IN"})
//     } catch (err) {
//          console.log(err);
//          throw(err)
//     }     
//   },