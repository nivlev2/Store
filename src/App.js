import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import './css_comps/header_nav.css'
import Navbar from './comps/Navbar';
import Home from './comps/Home';
import Page404 from './comps/page404';
import Login from './comps/Login';
import Cart from './comps/cart';
import {reducer} from './reducers/index'
import {Provider} from 'react-redux'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import SignUp from './comps/SignUp';
import Checkout from './comps/Checkout';
import UserInfo from './comps/UserInfo';
import AddProducts from './adminComps/AddProducts';
import EditProducts from './adminComps/EditProduct';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);
const store = createStore(reducer, enhancer);

// let reduxDevTool = window.__REDUX_DEVTOOLS_EXTENSION__() ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
function App() {
  return (
    <Provider store={store}>
    <Router>
      <header className="container-fluid shadow-sm bg-dark ">
        {/* <Navbar /> */}
        <Route  path="/" render={(props)=> <Navbar props={props}/>}/>

      </header>
      <main className="container">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/cart" component={Cart}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/checkout" component={Checkout}/>
          <Route exact path="/userInfo" component={UserInfo}/>
          <Route exact path="/addProd" component={AddProducts}/>
          <Route exact path="/EditProd/:id" render={(props) =><EditProducts urlParam={props.match.params.id}/>}/>
          <Route path="/" component={Page404}/>
        </Switch>
      </main>
      <footer></footer>
      <ToastContainer position="top-left"/>
    </Router>
    </Provider>
  );
}

export default App;