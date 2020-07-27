import { FETCH_BOOKINGS_REQUEST, FETCH_BOOKINGS_ERROR, FETCH_BOOKINGS_SUCESS} from "./ReduxType";

const initialState = {
    loading : true,
    users : [],
    error : ''
}

 const BookingReducer = (state=initialState,action)=>{
    switch(action.type){
        case FETCH_BOOKINGS_REQUEST : return{
            ...state,
            loading : true
        }
        case FETCH_BOOKINGS_SUCESS : return{
            loading : false,
            users : action.payload,
            error : ''
        }

        case FETCH_BOOKINGS_ERROR : return {
            loading : false,
            users : [],
            error : action.payload
        }

        default : return state
    }

}

export default BookingReducer