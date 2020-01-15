import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

class About extends Component {
  async componentDidMount() {
   // this.props.getSecret()
  }

  render() {
    return (
      <div>
        Despre 
        <br/>
        //Our secret: <h3>{this.props.secret}</h3>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    secret: state.dash.secret
  }
}

export default connect(mapStateToProps, actions)(About);