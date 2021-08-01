import { doApiGet,API_URL, doApiMethod } from "../services/apiSer"

export const Actions ={
     getProds: (page,sortQ,searchQ) => async dispatch =>{
          if(searchQ) page = 0
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
          if(!localStorage["NotLog"]){
               return {type:"RESET_USER_CART"}
          }else{
               const cart = JSON.parse(localStorage["cart"])
               const showCart = JSON.parse(localStorage["showCart"])
               let total = 0;
               for(let item of showCart){
                    total += (item.price * cart[item._id])
               }
               return {type:"GET_USER_CART",payload:{cart:cart,showCart:showCart,total:total}}
          }
     },
     setUserLogin: () => {
          localStorage.setItem('login',true)
          localStorage.removeItem('NotLog')
          return {type:"LOGGED_IN"}
     },
     removeUser: () =>{
          localStorage.removeItem("user")
          localStorage.removeItem("lastOrders")
          localStorage.removeItem('login')
          localStorage.removeItem('total')
          localStorage.removeItem('token')
          if(!localStorage["NotLog"]){
               localStorage.removeItem("cart")
               localStorage.removeItem("showCart")
          }
          return {type:"REMOVE_USER"}
     }
}

