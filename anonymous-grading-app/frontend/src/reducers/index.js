//exporta reducerii definiti
import { combineReducers } from 'redux'
import project from './project-reducer'
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth';
import dashboardReducer from './dashboard';

export default combineReducers({
    project,
    form: formReducer,
    auth: authReducer,
    dash: dashboardReducer
})
