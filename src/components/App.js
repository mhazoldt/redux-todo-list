import React, { Component } from 'react';
import logo from '../logo.svg';
import '../styles/App.css';
import { connect } from 'react-redux'
import { addItem } from '../actionCreators/addItem'
import { removeItem } from '../actionCreators/removeItem'
import { toggleItem } from '../actionCreators/toggleItem'
import { filterAll } from '../actionCreators/filterAll'
import { filterActive } from '../actionCreators/filterActive'
import { filterComplete } from '../actionCreators/filterComplete'




class App extends Component {
  constructor() {
    super()
    this.handleClickAdd = this.handleClickAdd.bind(this)
    this.handleClickRemove = this.handleClickRemove.bind(this)
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this)
    this.changeFilter = this.changeFilter.bind(this)
  }


  componentWillMount(){
    this.props.dispatch(addItem("Do the thing"))
    this.props.dispatch(addItem("Do the other thing"))
    

  }

  handleClickAdd() {
    let text = document.querySelector("#todo-text").value
    document.querySelector("#todo-text").value = ""
    console.log("button-got-to-function")
    this.props.dispatch(addItem(text))

  }

  handleClickRemove(idx) {
    console.log("button-got-to-function")
    this.props.dispatch(removeItem(idx))

  }

  handleChangeCheckbox(idx) {
    console.log("checkbox-got-to-function")
    this.props.dispatch(toggleItem(idx))
  }

  changeFilter(filterAction) {
    console.log("filter-button-got-here")
    if(filterAction === 'ALL') {
      this.props.dispatch(filterAll())
    } else if(filterAction === 'ACTIVE') {
      this.props.dispatch(filterActive())
    } else if(filterAction === 'COMPLETE'){
      this.props.dispatch(filterComplete())
    } else {

    }
  }

  render() {

    let todoItems = this.props.items
    let todoHtml = []

    if(this.props.filter === 'SHOW_ALL') {
      todoHtml = todoItems.map((item, idx) => {
        if(!(item.completed)) {
          return  <li key={idx.toString()}><input id={"checkbox" + idx.toString()} className="checkbox new-style" onClick={() => {this.handleChangeCheckbox(idx)}} type="checkbox" /><label htmlFor={"checkbox" + idx.toString()} ></label>{item.text}<button className="btn-floating btn-small waves-effect waves-light red" onClick={() => {this.handleClickRemove(idx)}}>X</button></li>
        } else {
          return  <li key={idx.toString()}><input id={"checkbox" + idx.toString()} className="checkbox new-style" onClick={() => {this.handleChangeCheckbox(idx)}} type="checkbox" checked /><label htmlFor={"checkbox" + idx.toString()} ></label>{item.text}<button className="btn-floating btn-small waves-effect waves-light red" onClick={() => {this.handleClickRemove(idx)}}>X</button></li>
        }
        
      })
    }
    
    if(this.props.filter === 'SHOW_ACTIVE') {
      todoHtml = todoItems.map((item, idx) => {
        if(item.completed === false){
          return  <li key={idx.toString()}><input id={"checkbox" + idx.toString()} className="checkbox new-style" onClick={() => {this.handleChangeCheckbox(idx)}} type="checkbox" /><label htmlFor={"checkbox" + idx.toString()} ></label>{item.text}<button className="btn-floating btn-small waves-effect waves-light red" onClick={() => {this.handleClickRemove(idx)}}>X</button></li>
        } else {
          return ""
        }
        
      })
    }

    if(this.props.filter === 'SHOW_COMPLETED') {
      todoHtml = todoItems.map((item, idx) => {
        if(item.completed === true){
          return  <li key={idx.toString()}><input id={"checkbox" + idx.toString()} className="checkbox new-style" onClick={() => {this.handleChangeCheckbox(idx)}} type="checkbox" checked /><label htmlFor={"checkbox" + idx.toString()} ></label>{item.text}<button className="btn-floating btn-small waves-effect waves-light red" onClick={() => {this.handleClickRemove(idx)}}>X</button></li>
        } else {
          return ""
        }
        
      })
    }
    



    return (
      <div className="container">
        <div className="row">
          <div className="col s6">
            <div className="card-panel">
              <div id="todo-input-container">
                <input type="text" id="todo-text" /><button className="waves-effect waves-light btn" onClick={this.handleClickAdd}>Add</button>
              </div>
              
              <ul>
                {todoHtml}
              </ul>
              
              <button className="waves-effect waves-light btn btn-margin" onClick={() => {this.changeFilter('ALL')}}>All</button>
              <button className="waves-effect waves-light btn btn-margin" onClick={() => {this.changeFilter('ACTIVE')}}>Active</button>
              <button className="waves-effect waves-light btn btn-margin" onClick={() => {this.changeFilter('COMPLETE')}}>Complete</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(appState) {
  console.log({appState})

  return {items: appState.items, filter: appState.filter}
}

export default connect(mapStateToProps)(App);
