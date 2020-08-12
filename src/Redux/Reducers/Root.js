import { combineReducers } from 'redux';
import errors from './errors/errors';
import session from './session/session';
import BookingCalenderReducer from '../../BookingCalRedux/BookingCalender/BookingCalenderReducer'

export default combineReducers({
    session,
    errors,
    BookingCalenderReducer
  });