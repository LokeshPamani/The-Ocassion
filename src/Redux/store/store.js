import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "../Reducers/Root";
import { combineReducers } from 'redux';
import BookingCalenderReducer from '../../BookingCalRedux/BookingCalender/BookingCalenderReducer'
const rootReducer = combineReducers({ reducer,BookingCalenderReducer});

export default preloadedState => (
    createStore(
      reducer,
      //rootReducer,
      preloadedState,
      applyMiddleware(thunk)
    )
  );