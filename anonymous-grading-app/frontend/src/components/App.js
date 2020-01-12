import React, {Component} from 'react'
import ProjectEditor from './ProjectEditor'
import Header from './Header'

class App extends Component{
  render(){
    return <ProjectEditor />
  }
}

// export default App

export default (props) => {
  return(
    <div>
      <Header />
      <div className="container">
      {props.children}
      
      </div>
      
  </div>
  );
}
