import { doApiGet,API_URL, doApiMethod } from "../services/apiSer"

export const Actions ={
     getProds: (page,sortQ,searchQ) => async dispatch =>{
          try {
          let url = API_URL + '/products?page=' + page + '&sort=' + sortQ + '&search=' + searchQ
          const response = await doApiGet(url)
          dispatch({type:"GET_PRODUCTS",payload:response})
          } catch (err) {
               dispatch({type:"NETWORK_ERR"})
          }
     },
     getUserCart: () => async dispatch =>{
          try {
               let url = API_URL + '/users/userInfo'
               const response = await doApiMethod(url,'GET')
               localStorage.setItem("cart",JSON.stringify(response.cart))
               let url2 = API_URL + '/users/cart'
               const showCart = await doApiMethod(url2,'GET')
               localStorage.setItem("showCart",JSON.stringify(showCart))
               let num = 0;
               for(let item of showCart){
                    let tempSum = item.price * response.cart[item._id]
                    num +=tempSum
               }
               localStorage.setItem("total",num)
               dispatch({type:"GET_USER_CART",payload:{cart:response.cart,showCart:showCart,total:num}})
          } catch (err) {
               throw(err)
          }     
     },
     getUserInfo:()=> async dispatch =>{
          try{
               let url = API_URL + '/users/userInfo'
               const response = await doApiMethod(url,'GET')
               let url2 = API_URL + '/users/userOrders'
               const response2 = await doApiMethod(url2,'GET')
               localStorage.setItem("user",JSON.stringify(response))
               localStorage.setItem("lastOrders",JSON.stringify(response2))
               dispatch({type:"GET_USER_DETAILS",payload:{user:response,lastOrders:response2}})
          }catch(e){
               throw e
          }
     },
     resetUserCart:() =>{
          return {type:"RESET_USER_CART"}
     },
     setUserLogin: (userName) => {
          localStorage.setItem('login',true)
          return {type:"LOGGED_IN"}
     },
     removeUser: () =>{
          localStorage.removeItem("user")
          localStorage.removeItem("lastOrders")
          localStorage.removeItem("cart")
          localStorage.removeItem("showCart")
          localStorage.removeItem('login')
          localStorage.removeItem('total')
          localStorage.removeItem('token')
          return {type:"REMOVE_USER"}
     }
}

