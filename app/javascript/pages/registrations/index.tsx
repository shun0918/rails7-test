import React from "react";
import ReactDOM from "react-dom";
import RegistrationMain from "../../components/registrations/RegistrationMain";

const main = () => {
    const rootEl = document.getElementById('root')
    ReactDOM.render(<RegistrationMain />, rootEl)
}

if (document.readyState !== "loading") {
    main();
} else {
    document.addEventListener("DOMContentLoaded", main, false);
}
