import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Fragment } from "react";
import Layouts from "./layouts/layout";
import { publicRoutes } from "./routes/index";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;

            let Layout = Layouts;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <div className="pageStyle">
                      <Page />
                    </div>
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
