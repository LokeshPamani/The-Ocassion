import { FETCH_BOOKING_REQUEST, FETCH_BOOKING_SUCCESS, FETCH_BOOKING_ERROR } from "../actions/Bookings"

const initialState={
    loading : false,
    bookings : [],
    error : ''
}

const bookingReducer = (state=initialState,action) =>{
    switch(action.type){
        case FETCH_BOOKING_REQUEST:
            return {
                ...state,
                loading : true
            }
        case FETCH_BOOKING_SUCCESS:
            return {
                loading : false,
                bookings : action.payload,
                error : ''
            }
        
        case FETCH_BOOKING_ERROR:
            return {
                loading : false,
                bookings : [],
                error : action.payload
            }

        default : return state
    }
}

export default bookingReducer