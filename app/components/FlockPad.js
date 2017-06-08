import React from 'react'
import {browserHistory} from 'react-router'
import {Link} from 'react-router'
import axios from 'axios'

class FlockPad extends React.Component {

  constructor(props) {
    super(props);
  
    this.state = {
      jot: ''
    }

    this.printHandler = this.printHandler.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    axios.get('/api/print')
      .then(res => {
        console.log("FROM BACKEND", res.data);
        this.setState({
          jot: res.data.split("----")[0]
        })
      })
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
            console.log("email res", res)
          })
      })
    }
    browserHistory.push('/dashboard')
  }

  render() {
    
    return (
      <div id="centerMe">
      <h1 id="banner">FLOCKPAD</h1>
      <form onSubmit={this.printHandler}>
      {
        this.state.jot.length > 0 ?
        <textarea id="flockpad" name="pad" rows="20" cols="100" value={this.state.jot} onChange={this.handleChange}></textarea> :
        <textarea id="flockpad" name="pad" rows="20" cols="100" >Collaborative Writing!</textarea>
      }
      <br/>
      <button type="submit">PRINT</button>
      </form>
      </div>
      )

  }

}

import {connect} from 'react-redux'

export default connect(
  ({ auth, allPubs }) => ({ 
  	user: auth,
  }), {},
)(FlockPad)
