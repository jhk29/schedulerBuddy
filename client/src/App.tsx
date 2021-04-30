import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar/Navbar";
import Landing from "./components/pages/Landing";
import Register from "./components/pages/Register/Register";
import Login from "./components/pages/Login/Login";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Navbar isLoggedIn={false} />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
