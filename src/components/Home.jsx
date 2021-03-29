import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
// Components
import Helmet from "./Common/Helmet";
import Switch from "./Common/Switch";
import Login from './Login/index'
import Dashboard from "./Views/dashboard";

const routes = [
  {
    path: "",
    component: <Login />,
  },
  {
    path: "dashboard",
    component: <Dashboard />,
  },
];

function Home() {
  let { path } = useRouteMatch();

  return (
    <div>
      <Helmet title="POINT OF SALE" />
      {/*  <Header /> */}
      <Switch>
        {routes.map((item, index) => (
          <Route key={index} path={`${path}${item.path}`} exact>
            {item.component}
          </Route>
        ))}
      </Switch>
    </div>
  );
}

export default Home;