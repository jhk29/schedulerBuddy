import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/userActions";

import Navbar from "./components/layout/Navbar/Navbar";
import Landing from "./components/pages/Landing/Landing";
import Register from "./components/pages/Register/Register";
import Login from "./components/pages/Login/Login";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import ToDo from "./components/pages/ToDo/ToDo";
import CalendarEvents from "./components/pages/Calendar/Calendar";
import Settings from "./components/pages/Settings/Settings";
// import UnderConstruction from "./components/pages/UnderConstruction/UnderConstruction";

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/todo" component={ToDo} />
            <PrivateRoute exact path="/calendar" component={CalendarEvents} />
            <PrivateRoute exact path="/settings" component={Settings} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
