import ReactDOM from 'react-dom/client';
import React from "react";
import App from './App';
import "@arco-design/web-react/dist/css/arco.css";
import './index.css';

const rootEl = document.getElementById("root");
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <App></App>
    </React.StrictMode>
  );
}
