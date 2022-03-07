import React from "react";
import ReactDOM from "react-dom";
import Button from '@mui/material/Button';

const App = () => (
    <div>
        <div className="app">Hello Rails!!!</div>
        <Button variant="contained" >clickme</Button>
    </div>
);

document.addEventListener('DOMContentLoaded', () => {
    const rootEl = document.getElementById('root')
    ReactDOM.render(<App />, rootEl)
})