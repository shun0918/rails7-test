import React from "react";
import ReactDOM from "react-dom";
import RegistrationMain from "../../components/registrations/RegistrationMain";

document.addEventListener('DOMContentLoaded', () => {
    const rootEl = document.getElementById('root')
    ReactDOM.render(<RegistrationMain />, rootEl)
})