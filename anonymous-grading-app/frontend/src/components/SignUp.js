import React, {Component} from 'react'
import {reduxForm, Field} from 'redux-form'
import {Button} from 'primereact/button'
import {connect} from 'react-redux'
import {compose} from 'redux'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login'

import * as actions from '../actions';
import CustomInput from './CustomInput'

import 'primereact/resources/themes/rhea/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

class SignUp extends Component{
    constructor(props){
        super(props);
        this.onSubmit=this.onSubmit.bind(this);
        this.responseGoogle=this.responseGoogle.bind(this)
        this.responseFacebook=this.responseFacebook.bind(this)

    }
    
    async onSubmit(formData){
        console.log('onSubmit() got called')
        console.log('formData',formData)
        await this.props.signUp(formData)
        if(!this.props.errorMessage){
            this.props.history.push('./dashboard')
        }
    }
    
    async responseGoogle(res){
        console.log('responseGoogle',res)
        console.log('typeof res', typeof res)
        await this.props.oauthGoogle(res.accessToken)
        if(!this.props.errorMessage){
            this.props.history.push('./dashboard')
        }
    }
    
    async responseFacebook(res){
        console.log('responseFacebook',res)
        await this.props.oauthFacebook(res.accessToken)
        if(!this.props.errorMessage){
            this.props.history.push('./dashboard')
        }
    }
    
    render(){
        const{handleSubmit }=this.props;
        return (
            
            <div className="row">
                <div className='col' style={{marginLeft:'30px'}}>
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <fieldset>
                            <Field
                                name="email"
                                type="text"
                                id="email"
                                label="Enter your email"
                                placeholder="e.g:example@example.com"
                                component={CustomInput}/>
                        </fieldset>
                         <fieldset>
                            <Field
                                name="password"
                                type="password"
                                id="password"
                                label="Enter your password"
                                placeholder="e.g:pAssWoRd123"
                                component={CustomInput}/>
                        </fieldset>
                    
                        {   this.props.errorMessage ? 
                            <div class ="alert alert-danger">
                                {this.props.errorMessage}
                            </div> : null
                        }
                    
                        <Button type="submit" className="btn p=button-primary " label="SignUp" style={{marginTop:'25px'}}  />
                    </form>
                </div>
                
                <div className="col" style={{marginLeft:'40px'}}>
                    <div className="text-center">
                        <div className="alert alert-primary">Sign up using Google or Facebook </div>

                            <GoogleLogin
                                clientId="5234951740-453oq5l5hrmcup7htufibmq8uc4ard3e.apps.googleusercontent.com"
                                buttonText="Google"
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                                className="btn btn-outline-danger  mr-5"
                            />
                            
                            
                          <FacebookLogin
                                appId="2673188529429267"
                                textButton="Facebook"
                                fields="name,email,picture"
                                callback={this.responseFacebook}
                                cssClass="btn btn-outline-primary "
                                />
                    
                    </div>
                </div>
        </div>
        );
    }
}

function mapStateToProps(state){
    return{
        errorMessage:state.auth.errorMessage
    }
}

export default compose(
    connect(mapStateToProps,actions),
    reduxForm({form: 'signup' })
    )(SignUp)