import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
// Components
import Helmet from "./Common/Helmet";
import Switch from "./Common/Switch";
import Login from './Login/index'
import Cathegories from "./Views/cathegories";
import Dashboard from "./Views/dashboard";
import Products from "./Views/products";

const routes = [
  {
    path: "",
    component: <Login />,
  },
  {
    path: "dashboard",
    component: <Dashboard />,
  },
  {
    path: "productos",
    component: <Products />,
  },
  {
    path: "categorias",
    component: <Cathegories />
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