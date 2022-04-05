import logo from './logo.svg';
import './App.css';
import Productlist from "./components/Productlist";
import Editproduct from "./components/Editproduct";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddProduct from './components/Addproduct';
function App() {
  return (
    <div className="container body-content">
      <Router>
        <Switch>
          <Route path="/" exact component={Productlist} />
          <Route path="/editproduct/:id" exact component={Editproduct} />
          <Route path="/addProduct" exact component={AddProduct} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;