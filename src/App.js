import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import './css_comps/header_nav.css'
import Navbar from './comps/Navbar';
import Home from './comps/Home';
import Page404 from './comps/page404';
import Login from './comps/Login';
import Cart from './comps/cart';

function App() {
  return (
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
  );
}

export default App;