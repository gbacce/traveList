import { combineReducers } from 'redux';
import WeatherReducer from './WeatherReducer';
import RegisterReducer from './RegisterReducer';
import ListReducer from './ListReducer';
import SurveyReducer from './SurveyReducer';
import UserPackingListReducer from './UserPackingListReducer';

// console.log('Survey Reducer')
// console.log(SurveyReducer)

const rootReducer = combineReducers({
	weatherData: WeatherReducer,
	registerReducer: RegisterReducer,
	listReducer: ListReducer,
	surveyReducer: SurveyReducer,
	userPackingList: UserPackingListReducer
});


export default rootReducer;