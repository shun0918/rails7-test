import React from "react";
import ReactDOM from "react-dom";
import ProileMain from "../../components/users/ProfileMain";

document.addEventListener('DOMContentLoaded', () => {
    const rootEl = document.getElementById('root')
    ReactDOM.render(<ProileMain />, rootEl)
})