import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Main from './pages/Main';

export default function routes ({ theme }) {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={() => <Login toggleTheme={theme} />} />
                <Route path="/dev/:id" component={({match}) => <Main loggedUser={match.params.id} toggleTheme={theme} />} />
            </Switch>
        </BrowserRouter>
    )
}
