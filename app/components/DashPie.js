import React from 'react'
import {Link} from 'react-router'
import Chart from 'chart.js'

const countUserSubs = (subs) => {

    let subsPerStatusArray = [0, 0, 0, 0];

    subs.forEach(sub => {
      if (sub.sub_status === "in process") {
        subsPerStatusArray[0] += 1;
      }
      if (sub.sub_status === "accepted") {
        subsPerStatusArray[1] += 1; 
      }
      if (sub.sub_status === "rejected") {
        subsPerStatusArray[2] += 1;        
      }
      if (sub.sub_status === "withdrawn") {
        subsPerStatusArray[3] += 1;        
      }
    })

    return subsPerStatusArray;

  }

class DashPie extends React.Component {
  
  constructor(props) {
    super(props)

  }

  componentDidUpdate() {

    if (this.props.userSubs.length > 0) {
      let subStatusData = countUserSubs(this.props.userSubs);
      let ctx = document.getElementById("myChart").getContext('2d');
      let chart = new Chart(ctx, {
      type: 'pie',
      data: {
          labels: ["In Process", "Accepted", "Rejected", "Withdrawn"],
          datasets: [{
              label: `${this.props.user.name}`,
              backgroundColor: ['blue', 'green', 'red', 'black'],
              borderColor: 'rgb(255, 99, 132)',
              data: countUserSubs(this.props.userSubs),
          }]
      },
      options: {}
      });
    }

  }

  render() {
    return (
      <div id="pie">
      <h2 id="centerMe">Your Submissions</h2>
      <canvas id="myChart"></canvas>
      </div>
    )}
}

import {connect} from 'react-redux'

export default connect(
  ({ auth, userSubs, closingCalls }) => ({ 
  	user: auth,
    userSubs: userSubs
  }), {}
)(DashPie)