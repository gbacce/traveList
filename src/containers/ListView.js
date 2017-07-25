import React, {Component} from 'react';
import  {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ListAction from '../actions/ListAction';
import $ from 'jquery';
import hostAddress from '../config'

class ListView extends Component{
	constructor(props) {
		super(props);
		this.state = {
			listData: []
		}
		this.getListItems = this.getListItems.bind(this);
	}

	componentDidMount() {
		this.getListItems(this.props);
	}

	getListItems(props){
		const url = hostAddress + '/listview'
		$.getJSON(url,(data)=>{
			this.setState({
				listData: data
			})
			console.log(this.state.listData)
		})
	}

	render(){

		var listArray = [];

		this.state.listData.map((listItem, index)=>{
			listArray.push(
				<tr key={index}>
                	<td className="switch text-center">
						<input type="checkbox" />
						<span className="slider round"></span>
					</td>
                	<td className="text-center">{this.state.listData[index].item}</td>
                    <td className="text-center">{this.state.listData[index].itemCategory}</td>
                </tr> 
				// <div key={index}>
				// 	{this.state.listData[index].item}
				// </div>
			)
		})

		return(
			<div className="">
				<h1>Your Packing List</h1>
				<table className="table">
                    <thead>
	                    <tr>
	                        <th className="text-center">Status</th>
	                        <th className="text-center">Item</th>
	                        <th className="text-center">Category</th>
                       </tr>
                    </thead>
                    <tbody>
                        {listArray}
                    </tbody>
                </table>
			</div>
		)
	}
}

function mapStateToProps(state){
	return{
		listView: state.ListReducer
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		listAction: ListAction
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ListView);