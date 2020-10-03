import React from "react";
import MyRoute from "./MyRoute";
import { Provider } from "react-redux";
//import './App.css';
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <MyRoute />
      </div>
    </Provider>
  );
}

export default App;
