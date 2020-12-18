import React from "react";
import ReactDOM from "react-dom";


import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";

import 'semantic-ui-css/semantic.min.css'

import 'react-nice-dates/build/style.css'

import 'main.css'
import { Provider } from "react-redux";
import configStore from "./redux/configStore";
import Main from "main";

const store = configStore();

ReactDOM.render(
  <Provider store={store}>
    <Main/>
  </Provider>,
  document.getElementById("root")
);
