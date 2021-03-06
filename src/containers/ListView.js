import React, {Component} from 'react';
import  {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ListAction from '../actions/ListAction';
import WeatherDiv from './WeatherDiv';
import UserPackingListAction from '../actions/UserPackingListAction';
import $ from 'jquery';

class ListView extends Component{
	constructor(props) {
		super(props);
		this.state = {
			listArray: [],
			token: '',
			surveyId: '',
			showDelete: false
		}

		this.deleteToggle = this.deleteToggle.bind(this);

	}


	componentWillMount() {
		if(this.props.loginInfo.token !== undefined){
			this.props.listAction({
				token: this.props.loginInfo.token,
				surveyId: this.props.surveyId
			})
		}
	}


	componentDidMount() {
		this.setState({
			token:this.props.loginInfo.token,
			surveyId: this.props.surveyId
		})
	}


	componentWillReceiveProps(nextProps) {
		// console.log("NEXT PROPS")
		// console.log(nextProps)

		var listData = []
		var lastCategory = "";
		// var categoryArray = [];

		var newItemIndex = 1;

		nextProps.listView.map((listItem, index)=>{

			if(lastCategory == ""){
				listData.push(
					<div className="row" key={listItem.id}>
						<div className="col-xs-offset-1 col-xs-11">
							<h3 className="category-title">{listItem.itemCategory}</h3>
						</div>
					</div>
				)

				// categoryArray.push(listItem.itemCategory)
			}

			else if(listItem.itemCategory !== lastCategory){
				listData.push(
					<div className='row add-item-row'>
						<div className='col-xs-6 col-xs-offset-3'>
							<input className='add-item-input current-input' placeholder="Add Item" />
						</div>
						<div className='col-xs-3'>
							<img className='add-item-button' src="../images/plus.png" onClick={ () => {this.addNewItem(newItemIndex, listItem.itemCategory)}} />
						</div>
					</div>,
					<div className="row" key={listItem.id}>
						<div className="col-xs-offset-1 col-xs-11">
							<h3 className="category-title">{listItem.itemCategory}</h3>
						</div>
					</div>
				)
				$('.current-input').addClass(listItem.itemCategory);
				// console.log(listItem.itemCategory)
				// $('.current-input').addClass(listItem.itemCategory);
				$('.add-item-input').removeClass('.current-input');

				// categoryArray.push(listItem.itemCategory)
			}

			lastCategory = listItem.itemCategory;

			listData.push(
				<div className="row" key={listItem.id}>
                	<div className="col-xs-3 text-right">
                		<div className="">
							<input type="checkbox" className="list-checkbox" />
							<label htmlFor="list-checkbox"></label>
						</div>
					</div>
                	<div className= 'col-xs-8 item'>{listItem.item}</div>
                	<div className='col-xs-1'>
                		<img className='not-visible delete-button' onClick={ ()=> {this.deleteItem(listItem.item, listItem.itemCategory)}} src="../images/delete.png" />
                	</div>
                </div> 
			)
		})

		this.setState({
			listArray: listData
		})
	}



	addNewItem(item, itemCategory){
		this.props.userPackingListAction({
			token: this.state.token,
			tripId: this.state.surveyId,
			item: item,
			itemCategory: itemCategory,
			query: 'INSERT INTO userListItems (tripId, item, itemCategory) VALUES (?, ?)' 
		})
	}



	deleteItem(item, itemCategory){
		this.props.userPackingListAction({
			token: this.state.token,
			tripId: this.state.surveyId,
			item: item,
			itemCategory: itemCategory,
			query: 'DELETE FROM userListItems WHERE tripId=(?) AND item=(?) AND itemCategory=(?)'
		})
	}


	renderDeleteButton(){
		if (this.state.deleteToggle == false) {
			return(
				<div className="delete-toggle col-md-offset-3 col-md-1 col-sm-offset-2 col-sm-1 col-xs-1 text-right" onClick={this.deleteToggle}>
					<h5>Remove Items</h5>
				</div>
			)
		}
		else if (this.state.deleteToggle == true) {
			return(
				<div className="delete-toggle col-md-offset-3 col-md-1 col-sm-offset-2 col-sm-1 col-xs-1 text-right" onClick={this.deleteToggle}>
					<h5>Done</h5>
				</div>
			)
		}
	}


	deleteToggle(){
		if (this.state.showDelete) {
			$('.delete-button').addClass('not-visible');
			this.setState({ showDelete: false })
		}
		else {
			$('.delete-button').removeClass('not-visible');
			this.setState({ showDelete: true })
		}
	}

	render(){

		// console.log(this.reduxState)
		console.log(this.state)

		return(
			<div>
				<WeatherDiv />
				<div className="listview-page">
					<div className="listview-section col-md-offset-4 col-md-4 col-sm-offset-3 col-sm-6 col-xs-offset-1 col-xs-10">
						<h1 className="text-center">Packing Recommendations</h1>
						{this.state.listArray}
					</div>
					{this.renderDeleteButton}
				</div>
			</div>
		)
	}
}

function mapStateToProps(state){
	return{
		listView: state.listReducer,
		loginInfo: state.registerReducer,
		surveyId: state.surveyReducer
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		listAction: ListAction,
		userPackingListAction: UserPackingListAction
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ListView);