import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ActivityFeed from "./components/ActivityFeed";
import ActivityDetail from "./components/ActivityDetail";

const App = () => {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route path="/call/:id" component={ActivityDetail} />
          <Route path="/" component={ActivityFeed} />
        </Switch>
      </Router>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
