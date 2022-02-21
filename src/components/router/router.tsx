import React from "react";
import {Switch, Route } from 'react-router-dom';
import App from "../../App";
import Dashboard from "../dashboard/dashboard";
import GameForm from "../gameForm/gameForm";
import JoinGame from "../joinGame/joinGame";
import NotFound from "../notFound/notFound";

const Router = ( ) => {
  
  return (
    <Switch>
         <Route exact path="/" component={App}/>
         <Route exact path="/game/:hash" component={Dashboard}/>
         <Route exact path="/join" component={JoinGame }/>
         <Route exact path="/new" component={GameForm }/>
         <Route component={NotFound}/>
    </Switch>
  );
};

export default Router;