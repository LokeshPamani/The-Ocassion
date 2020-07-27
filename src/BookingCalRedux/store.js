import {createStore , applyMiddleware} from 'redux'
import BookingReducer from './BookingCalender/BookingCalenderReducer';
import thunk from 'redux-thunk'


const store = createStore(BookingReducer ,applyMiddleware(thunk))

export default store