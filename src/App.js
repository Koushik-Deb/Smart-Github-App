import React from "react";
import {
  Dashboard,
  Login,
  MyRepoList,
  PrivateRoute,
  AuthWrapper,
  Error,
  CreateCollection,
  CollectionList,
  SingleRepoCommitHistoryPage,
  EditCollection,
} from "./pages";
import { Navbar } from "./components";

import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const { user } = useAuth0();
  return (
    <AuthWrapper>
      <Router>
        {user ? <Navbar /> : null}
        <Switch>
          <PrivateRoute exact path="/">
            <Dashboard></Dashboard>
          </PrivateRoute>
          <PrivateRoute path="/createcollection">
            <CreateCollection></CreateCollection>
          </PrivateRoute>
          <PrivateRoute path="/collectionlist">
            <CollectionList></CollectionList>
          </PrivateRoute>
          <PrivateRoute path="/:id/edit">
            <EditCollection></EditCollection>
          </PrivateRoute>

          <PrivateRoute path="/myrepolist">
            <MyRepoList />
          </PrivateRoute>
          <PrivateRoute path="/:name/:repo/commit">
            <SingleRepoCommitHistoryPage></SingleRepoCommitHistoryPage>
          </PrivateRoute>

          <Route path="/login">
            <Login />
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </Router>
    </AuthWrapper>
  );
}

export default App;
