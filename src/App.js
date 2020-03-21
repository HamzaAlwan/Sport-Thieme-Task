import React from "react";
import "./App.css";
import Repository from "./components/repository";
import SingleIssue from "./components/single_issue";
import { Route, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Repository} />
      <Route path="/issue/:id" component={SingleIssue} />
    </Router>
  );
}

export default App;
