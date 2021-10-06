import React from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import AppLayout from "../components/Layout";
import PageOne from "../containers/PageOne";
import PageTwo from "../containers/PageTwo";
import PageThree from "../containers/PageThree";
import Users from "../containers/Users";
import CreateUser from "../containers/Users/Create";
import EditUser from "../containers/Users/EditUser";

const Routes = () => {
  return (
    <BrowserRouter>
      <AppLayout>
        <Switch>
          <Route path="/users/create" component={CreateUser} />
          <Route path="/users/edit/:id" component={EditUser} />
          <Route path="/users" component={Users} />
          <Route path="/pageone" component={PageOne} />
          <Route path="/pagetwo" component={PageTwo} />
          <Route path="/pagethree" component={PageThree} />
          <Redirect to={"/users"} />
        </Switch>
      </AppLayout>
    </BrowserRouter>
  );
};

export default Routes;
