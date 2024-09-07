"use client";

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from '@/app/page';
import UserForm from '../components/user-form';
import UserProfilePage from '../pages/user-profile';
import LoginPage from "@/pages/login";

function AppRoutes() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/user-form" component={UserForm} />
                <Route path="/user-profile" component={UserProfilePage} />
                <Route path="/login" component={LoginPage} />
            </Switch>
        </Router>
    );
}

export default AppRoutes;