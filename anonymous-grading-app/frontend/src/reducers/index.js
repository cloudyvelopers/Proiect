//exporta reducerii definiti
import { combineReducers } from 'redux'
import project from './project-reducer'
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth-reducer';
import aboutReducer from './about-reducer';

export default combineReducers({
    project,
    form: formReducer,
    auth: authReducer,
    dash: aboutReducer
})
