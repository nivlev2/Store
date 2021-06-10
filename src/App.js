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
import {createStore} from 'redux'
import {m} from 'redux-thunk'
let reduxDevTool = window.__REDUX_DEVTOOLS_EXTENSION__() ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
function App() {
  return (
    <Provider store={createStore(reducer,reduxDevTool)}>
    <Router>
      <header className="container-fluid shadow-sm">
        <Navbar />
        <hr/>
      </header>
      <main className="container">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/cart" component={Cart}/>
          <Route path="/" component={Page404}/>
        </Switch>
      </main>
      <footer></footer>
    </Router>
    </Provider>
  );
}

export default App;