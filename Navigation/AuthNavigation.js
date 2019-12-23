import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Signup from "../screens/Auth/SignUp";
import Confirm from "../screens/Auth/Confirm";
import Login from "../screens/Auth/Login";
import AuthHome from "../screens/Auth/AuthHome";

const AuthNavigation = createStackNavigator({
    Signup,
    Confirm,
    Login,
    AuthHome
}, {
    headerMode: "none",
    initialRouteName: "AuthHome"
});

export default createAppContainer(AuthNavigation);