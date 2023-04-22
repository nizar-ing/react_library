import React from "react";
import { Navbar } from "./layouts/navbarAndFooter/Navbar";
import { Footer } from "./layouts/navbarAndFooter/Footer";

import "./App.css";
import { HomePage } from "./layouts/homePage/HomePage";
import { SearchBooksPage } from "./layouts/searchBooksPage/SearchBooksPage";
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import { BookCheckoutPage } from "./layouts/bookCheckoutPage/BookCheckoutPage";
import {oktaConfig} from "./lib/oktaConfig";
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import {LoginCallback, SecureRoute, Security} from "@okta/okta-react";
import LoginWidget from "./Auth/LoginWidget";
import {ReviewListPage} from "./layouts/bookCheckoutPage/reviewListPage/ReviewListPage";
import {ShelfPage} from "./layouts/shelfPage/ShelfPage";
import {MessagesPage} from "./layouts/messagesPage/MessagesPage";
import {ManageLibraryPage} from "./layouts/manageLibraryPage/ManageLibraryPage";

const oktaAuth = new OktaAuth(oktaConfig);

export const App = () => {

  const customAuthHandler = () => {
    history.push('/login');
  };
  const history = useHistory();

  const restoreOriginalUri = async(_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };
  return (
    <div className="d-flex flex-column min-vh-100">
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
        <Navbar />
        <div className="flex-grow-1">
          <Switch>
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>
            <Route path="/home">
              <HomePage />
            </Route>
            <Route path="/search">
              <SearchBooksPage />
            </Route>
            <Route path='/reviewlist/:bookId'>
              <ReviewListPage />
            </Route>
            <Route path="/checkout/:bookId">
              <BookCheckoutPage />
            </Route>
            <Route path='/login' render={() => <LoginWidget config={oktaConfig} />} />
            <Route path='/login/callback' component={LoginCallback} />
            <SecureRoute path='/shelf'><ShelfPage /></SecureRoute>
            <SecureRoute path="/messages"><MessagesPage /></SecureRoute>
            <SecureRoute path="/admin"><ManageLibraryPage /></SecureRoute>
          </Switch>
        </div>
        <Footer />
      </Security>
    </div>
  );
};
