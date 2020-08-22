import {getAllBookings} from '../../APIS/BookingsAPI/Booking'

export const FETCH_BOOKING_REQUEST="FETCH_BOOKING_REQUEST";
export const FETCH_BOOKING_SUCCESS="FETCH_BOOKING_SUCCESS";
export const FETCH_BOOKING_ERROR="FETCH_BOOKING_ERROR"

export const  fetchBookingRequest=()=>{
    return {
        type : FETCH_BOOKING_REQUEST
    }
}

export const fetchBookingSuccess=(bookings)=>{
    return {
        type : FETCH_BOOKING_SUCCESS,
        payload : bookings
    }
}

export const fetchBookingError=(error)=>{
    return {
        type : FETCH_BOOKING_ERROR,
        payload : error
    }
}

export const fetchBookings=(data)=>{
    return (dispatch)=>{
        dispatch(fetchBookingRequest());
        getAllBookings(data).then(res=>{
            const bookings = res.data;
            dispatch(fetchBookingSuccess(bookings));
        }).catch(err=>{
            const errMessage= err.response.data;
            dispatch(fetchBookingError(errMessage));
        })
    }
}