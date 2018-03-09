import React, { Component } from "react";
import PropTypes from "prop-types";
import { get } from "axios";

import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    data: "loading"
  };
  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    const { data, error } = await get(`/api/users`)
      .then(response => {
        return { data: response.data };
      })
      .catch(error => {
        return { error };
      });

    if (!error) {
      this.setState({ data });
    }
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <h2>process.env:</h2>
        <p>{JSON.stringify(process.env, null, 2)}</p>
        <h2>axios.get response</h2>
        <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
      </div>
    );
  }
}

export default App;
