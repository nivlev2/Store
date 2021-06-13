import { doApiGet,API_URL, doApiMethod } from "../services/apiSer"

export const Actions ={
     getProds: () => async dispatch =>{
          try {
          let url = API_URL + '/products'
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
               console.log(response);
               dispatch({type:"GET_USER_CART",payload:response.cart})
          } catch (err) {
               console.log(err);
               throw(err)
          }     
     },
     setUserLogin: () => async dispatch =>{
        try {
            let url = API_URL + '/users/userInfo'
            const response = await doApiMethod(url,'GET')
            console.log(response);
            localStorage.setItem('cart', JSON.stringify(response.cart))
            dispatch({type:"LOGGED_IN",payload:response.cart})
       } catch (err) {
            console.log(err);
            throw(err)
       }     
     },
     checkIfLoggedIn: () =>{
        return {type:"CHECK_IF_LOGGED_IN"}
     },
     removeUser: () =>{
          console.log('removed');
          return {type:"REMOVE_USER"}
     }
}