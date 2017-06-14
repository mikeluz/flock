import React from 'react'
import {browserHistory, Link} from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper';
import axios from 'axios'
import store from '../store'

const style = {
  height: 'auto',
  width: '100%',
  margin: 'auto',
  textAlign: 'center',
  display: 'inline-block',
  paddingLeft: '40px',
  paddingRight: '40px',
  paddingBottom: '40px',
  paddingTop: '20px',
  backgroundColor: 'rgba(240, 240, 240, 0.8)'
};


class FlockPad extends React.Component {

  constructor(props) {
    super(props);
  
    this.state = {
      jot: ''
    }

    this.printHandler = this.printHandler.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt) {
    this.setState({
      jot: evt.target.value
    })
  }

  printHandler(evt) {
    evt.preventDefault();
    let confirm = window.confirm("Are you sure?");
    if (confirm) {
      axios.post('/api/print', {"input": this.state.jot})
        .then(res => {
          axios.post('/api/print/email', {"email": this.props.user.email})
            .then(res => {
              this.props.getUserSubs(this.props.user.id);
              this.props.getCurrentJot();
            })
        })
        .then(() => {
          browserHistory.push('/dashboard')
        })
    }
  }

  render() {

    return (
      <div id="centerMe">
      {this.props.user && <div>
      <br/>
      <Paper style={style} zDepth={3}>
      <h1 id="banner">FLOCKPAD</h1>
      <form onSubmit={this.printHandler}>
      {
        this.props.currentJot &&
        <textarea id="flockpad" name="pad" rows="20" cols="100" defaultValue={this.props.currentJot} onChange={this.handleChange}></textarea>
      }
      <br/>
      <RaisedButton 
        type="submit"
        label="Print"
        backgroundColor='#000000'
        labelColor='white'
        style={{
          margin: "20px"
        }}
        />
      </form>
      </Paper>
      </div>}
      </div>
    )
  }

}

import {connect} from 'react-redux'
import {getCurrentJot} from 'APP/app/reducers/currentJot'
import {getUserSubs} from 'APP/app/reducers/users/userSubs'

export default connect(
  ({ auth, currentJot }) => ({ 
  	user: auth,
    currentJot: currentJot
  }), {getCurrentJot, getUserSubs},
)(FlockPad)
