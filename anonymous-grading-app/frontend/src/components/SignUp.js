import React, {Component} from 'react'
import {reduxForm, Field} from 'redux-form'
import {Button} from 'primereact/button'
import {RadioButton} from 'primereact/radiobutton'
import {connect} from 'react-redux'
import {compose} from 'redux'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login'
import {bindActionCreators} from 'redux'



import CustomInput from './CustomInput'
import * as actions from '../actions';

import 'primereact/resources/themes/rhea/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'



class SignUp extends Component{
    constructor(props){
        super(props)
        this.state={registeras:null}
        this.onSubmit=this.onSubmit.bind(this);
        this.responseGoogle=this.responseGoogle.bind(this)
        this.responseFacebook=this.responseFacebook.bind(this)

    }
    
    async onSubmit(formData) {
    await this.props.signUp(formData);
    if (!this.props.errorMessage) {
      this.props.history.push('/about');
    }
  }
    
    async responseGoogle(res) {
        await this.props.actions.oauthGoogle(res.accessToken);
        if (!this.props.errorMessage) {
            this.props.history.push('/about');
    }
  }

     async responseFacebook(res) {
        await this.props.actions.oauthFacebook(res.accessToken);
        if (!this.props.errorMessage) {
            this.props.history.push('/about');
    }
  }
    
    render(){
        const{handleSubmit }=this.props;
        return (
            <div>
            <div className="row">
                <div className='col' style={{marginLeft:'30px'}}>
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <fieldset>
                            <Field
                                name="email"
                                type="text"
                                id="email"
                                label="Introduceti adresa de email:"
                                placeholder="ex: example@example.com"
                                component={CustomInput}/>
                        </fieldset>
                         <i></i>
                         <fieldset>
                            <Field
                                name="password"
                                type="password"
                                id="password"
                                label="Introduceti parola:"
                                placeholder="ex: PaSsWoRd123"
                                component={CustomInput}/>
                            <Field
                                name="confirmpassword"
                                type="password"
                                id="confirmpassword"
                                label="Confirmati parola:"
                                component={CustomInput}
                               />
                        </fieldset>
                    
                        {   this.props.errorMessage ? 
                            <div class ="alert alert-danger">
                                {this.props.errorMessage}
                            </div> : null
                        }
                    
                    </form>
                    <div>Inregistreaza-te ca:</div>
                     <div className="content-section implementation">
                    <div className="p-grid" style={{width:'250px',marginBottom:'10px'}}>
                        <div className="p-col-12">
                            <RadioButton inputId="rb1" name="registeras" value="Profesor" onChange={(e) => this.setState({registeras: e.value})} checked={this.state.registeras === 'Profesor'} />
                            <label htmlFor="rb1" className="p-radiobutton-label">Profesor</label>
                        </div>
                        <div className="p-col-12">
                            <RadioButton inputId="rb2" name="registeras" value="Student" onChange={(e) => this.setState({registeras: e.value})} checked={this.state.registeras === 'Student'} />
                            <label htmlFor="rb2" className="p-radiobutton-label">Student</label>
                        </div>
                        
                    </div>
                            <Button type="submit" icon ="pi pi-user" iconPos="right" className="btn p-button-rounded p-button-info " label="SignUp" style={{marginTop:'25px'}}  />

                </div>
                </div>
                
                <div className="col" style={{marginLeft:'40px'}}>
                    <div className="text-center">
                        <div className="alert alert-primary">Inregistrati-va folosind: </div>

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
              <div className="row"  style={{marginTop:'100px'}}>
                    <a href="/signin" class="badge badge-light">Aveti un cont? Conectati-va la contul deja existent</a>
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