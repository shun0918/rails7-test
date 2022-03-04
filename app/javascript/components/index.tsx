import React from "react";
import ReactDOM from "react-dom";

const App = () => (
    <div className="app">Hello Rails!</div>
);

document.addEventListener('DOMContentLoaded', () => {
    const rootEl = document.getElementById('root')
    ReactDOM.render(<App />, rootEl)
})