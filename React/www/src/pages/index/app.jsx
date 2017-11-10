import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import myStore from '../../store.js'
import { changeName, updateClickCount } from '../../action.js'
import { myReducer } from '../../reducer/myReducer.js'

// import ClickCount from '../../jsx/clickCount.jsx'

const _store = myStore;


class MyComponent extends React.Component {
	// getInitialState(){
	// 	return {
	// 		myName: '',
	// 		inputValue: ''
	// 	}
	// }
	constructor(){
		super();
		this.state = {
			myName: '',
			inputValue: '',
			tryReducerResult: 0
		}
	}
	clickHandler(){
		// this.setState({
		// 	myName: this.state.inputValue
		// })
		_store.dispatch(changeName(this.state.inputValue))
		_store.dispatch(updateClickCount())
	}
	inputHandler(event){
		this.setState({
			inputValue: event.target.value
		})
	}
	handleClick2(){
    var inputValue2 = this.refs.myTextInput.value;
    // set state
    // this.setState({myName: inputValue2})

    // dispatch -----------
    // _store.dispatch({
    // 	type: 'changeName', 
    // 	demoObj: {
    // 		name: inputValue2
    // 	}
    // })

		// dispatch -----------
    _store.dispatch(changeName(inputValue2))
    _store.dispatch(updateClickCount())
  }
  tryReducer(){
  	var _arr=[
  		{type: "ACTION_TRY_REDUCER", add_to: 5},
  		{type: "ACTION_TRY_REDUCER", add_to: 8},
  		{type: "ACTION_TRY_REDUCER", add_to: 2},
  		{type: "ACTION_TRY_REDUCER", add_to: -10}
  	]
  	var _result = _arr.reduce(myReducer);
  	this.setState({
  		tryReducerResult: _result.add_to
  	})
  }
  componentWillMount(){
  	_store.subscribe(()=> {
  		var newState = _store.getState();
			this.setState({
				myName: newState.demoObj.name,
			})
		})
  	// try{
  	// 	console.log(this.refs.myTextInput.value)
  	// }catch(err){
  	// 	alert(err)
  	// }
  }
  componentDidMount(){
  	// console.log(this.refs.myTextInput.value)
  }

  componentWillUpdate(nextProps, nextState){
  	// console.log("componentWillUpdate")
  	
  }
  componentDidUpdate(prevProps, prevState){
  	// console.log("componentDidUpdate")
  	
  }
  componentWillReceiveProps(nextProps){
  	// console.log("componentWillReceiveProps")
  	
  }
  shouldComponentUpdate(nextProps, nextState){
  	// if(nextState.myName == this.state.myName && nextState.inputValue == this.state.inputValue){
  	// 	console.log('inputValue2 equals name, no need update');
  	// 	return false
  	// }else{
  	// 	return true
  	// }
  	return true
  }
  componentWillUnmount(){
  	console.log("componentWillUnmount")
  	// debugger
  }


	render(){
		let buttonName = "click1";
		let inputStyle = {
		  "display":"inline-block",
		  "lineHeight":"30px",
		  "textAlign":"center",
		  "backgroundColor":"#FF8342",
		  "borderRadius":'3px',
		  "width":"80px",
		  "height":"30px",
		  "cursor":"pointer"
		};

		var showName = this.state.myName || this.props.name
		return (
		  <div>
		    <h1>Hello {showName}!</h1>
		    <p>
		    	<input type="text" value={this.state.inputValue} placeholder="please input something." onChange={this.inputHandler.bind(this)} />
		    	<span className='btn' onClick={this.clickHandler.bind(this)}>{buttonName}</span>
		    </p>

		    <p>
          <input type="text" ref="myTextInput" defaultValue="" placeholder="please input something." />
          <span className='btn' onClick={this.handleClick2.bind(this)}>click2</span>
        </p>

        <p>
        	<span>Try Result: {this.state.tryReducerResult}</span>
        	<span className='btn' onClick={this.tryReducer.bind(this)}>click3</span>
        </p>
		  </div>
		);
	}
}

ReactDOM.render(
  <MyComponent name="World"></MyComponent>,
  document.getElementById('example')
)