import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ConfigProvider } from "antd";
import { Theme } from "./utils/themeConfig";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ConfigProvider theme={Theme}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
