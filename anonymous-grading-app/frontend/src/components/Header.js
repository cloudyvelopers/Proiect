import React,{ Component } from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import  * as actions from '../actions'



 class Header extends Component{
     
     constructor(props){
         super(props)
         this.signOut=this.signOut.bind(this)
     }
     
     signOut(){
         console.log("SignOut was called")
         this.props.signOut()
     }
     
     
    render(){
      return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark " style={{marginBottom:'40px'}}>
            <Link className="navbar-brand" to="/">Anonymous grading App</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/about">Despre</Link>
                    </li>

                </ul>

                <ul className="nav navbar-nav ml-auto">
                
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle"  id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Projects
                         </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a className="dropdown-item" href="/projects">Proiectele mele</a>
                            <a className="dropdown-item" href="/statistics">Rezultate</a>
                         </div>
                    </li>
                    {!this.props.isAuth ?
                    [<li className="nav-item" key="signup">
                      <Link className="nav-link" to="/signup">Inregistrare</Link>
                    </li>,
                    <li className="nav-item" key="signin">
                       <Link className="nav-link" to="/signin">Conecteaza-te</Link>
                    </li>]:null
                        
                    }
                    
                    {this.props.isAuth ? <li className="nav-item">
                       <Link className="nav-link" to="/signout" onClick={this.signOut}>Delogheaza-te</Link>
                    </li>
                       :null 
                    }

                </ul>

            </div>
        </nav>
      );  
    }

}



function mapStateToProps(state){
    return {
        isAuth: state.auth.isAuthenticated
        
    }
}

export default connect(mapStateToProps,actions) (Header)