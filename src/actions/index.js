import { doApiGet,API_URL, doApiMethod } from "../services/apiSer"

export const Actions ={
     getProds: (page) => async dispatch =>{
          try {
          let url = API_URL + '/products?page=' + page
          const response = await doApiGet(url)
          console.log(response);
          dispatch({type:"GET_PRODUCTS",payload:response})
          } catch (err) {
               console.log(err);
          }
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