import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Erro404 from './components/Errors/404';
import App from './App'
/* 
import Home from './components/Home/Home'
import Login from './components/Login/Login';
import { HOME } from './shared/rotas' 
<Route path="/" component={Login} exact/>
<Route path={HOME} component={Home} exact/>
*/


const AppRoutes = () => (
    <App>
        <Switch>
            <Route component={Erro404}/>
        </Switch>
    </App>
)

export default AppRoutes