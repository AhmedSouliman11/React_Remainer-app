import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker";
import { add_Reminder , remove_Reminder , clear_Reminder } from "./actions";
import "./App.css";
class App extends Component {
  state = {
    text: '',
    date: new Date()
  }
  render_Reminders = () => {
    const {reminders} = this.props ; 
    return(
      <ul className="list-group">
        {
          reminders.map(reminder => {
            return (
              <li key={reminder.id} className="list-group-item">
                <div>{ reminder.text }</div>
                <div>{ moment( new Date(reminder.date) ).fromNow() }</div>
                <div className="closeIcon btn btn-danger" onClick={() => this.props.remove_Reminder(reminder.id)}>X</div>
              </li>
            )
          })
        }
      </ul>
    )
  }
  render() {
    console.log(this.props);
    return ( 
        <div className="App">
            <img src="./hi.png" alt="icon"/>
            <div className="remainder-title">
              <h2>What Should U Do ? </h2>
            </div>

            <input type="text" 
            placeholder="Enter What U think" 
            className="form-control" 
            value={this.state.text}
            onChange={(e) => this.setState({ text : e.target.value})}
            />

            {/*<input type="datetime-local"
            className="form-control"
            value={this.state.date}
             onChange={(e) => this.setState({ date : e.target.value})}
    />*/}
             <DatePicker
                className="form-control"
                placeholderText="Enter Date"
                value={this.state.date}
                selected={this.state.date}
                onChange={(date) => this.setState({ date: date })}
                showTimeSelect
                timeFormat="HH:mm"
                dateFormat="MMMM d, yyyy h:mm aa"
                timeCaption="time"
            /> 
             { this.render_Reminders() }
            <button 
            onClick={() =>{
              this.props.add_Reminder(this.state.text , this.state.date) 
              this.setState({ text: '' , date: '' })
            } 
            }
            className="btn btn-primary d-block w-100 mt-2 mb-2"
            >Add Remainder</button>
            <button
             className="btn btn-danger d-block w-100"
             onClick={ () => this.props.clear_Reminder() } 
            >Clear Remainder</button>
        </div>
    );
  }
}
/*function mapDispatchToProps ( dispatch ) {   //take action and send it to reducer and take it as props in the component
  return {
    add_Reminder: () => dispatch( add_Reminder() ) 
  }
}*/
/*function mapStateToProps( state ) {
  return {
    reminders: state
  }
}*/

export default connect(state => {
  return {
    reminders: state //key that you use as a props in the component [App]
  }
} , { add_Reminder , remove_Reminder , clear_Reminder }) (App); //dispatch return action and send it to reducer 

/*
Steps : 
1-action types
2-action creators
3-reducers
4-jsx 
install moment 
npm i moment --save for save ( search moment js on google to see another formate  )
Setup DatePicker and Use it ( search react date picker.com ) 
npm install react-datepicker --save
-sfcookies (search on google)
goto reducer 
*/