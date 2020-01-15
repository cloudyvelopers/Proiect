import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
import {Provider} from 'react-redux'
import reduxThunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import authGuard from './components/HOCs/authGuard'

import App from './components/App'
import Home from './components/Home'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import About from './components/About'
import ProjectEditor from './components/ProjectEditor'
import Statistics from './components/Statistics'
import reducers from './reducers'

//import store from './stores/store'
import 'primereact/resources/themes/rhea/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

// ReactDOM.render(<Provider store={store}><App/></Provider>,document.getElementById('root'))


const jwtToken=localStorage.getItem('JWT_TOKEN')

ReactDOM.render(
    <Provider store={createStore(reducers, {
        auth:{
            token:jwtToken,
            isAuthenticated:jwtToken ? true :false
        }
        
    }, applyMiddleware(reduxThunk))}>
    <BrowserRouter>
    <App>
        <Route exact path="/" component={Home}/>
        <Route exact path="/signup" component={SignUp}/>
        <Route exact path="/sigin" component={SignIn}/>
        <Route exact path="/about" component={authGuard(About)}/>
        <Route exact path="/projects" component={ProjectEditor}/>
    </App>
    </BrowserRouter>
    </Provider>,
    document.querySelector('#root'));
registerServiceWorker();