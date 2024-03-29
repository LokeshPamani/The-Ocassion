import {getCall,postCall,putCall} from '../APICalls'

// fetch(`https://api.parse.com/1/users?foo=${encodeURIComponent(data.foo)}&bar=${encodeURIComponent(data.bar)}`, {
//   method: "GET",
//   headers: headers,   
// })

export const bookingStatus=data=>{
    return getCall(`api/bookings/isbooked?day=${encodeURIComponent(data.day)}&month=${encodeURIComponent(data.month)}&year=${encodeURIComponent(data.year)}`)
}

export const newBookings=data=>{
    return postCall(`api/bookings`,data)
}

export const getBookingByBookingID=id=>{
    return getCall(`api/bookings/${id}`)
}

export const updateBooking=(bookingId,data)=>{
    return putCall(`api/bookings/${bookingId}`,data)
}

export const getAllBookings=(data)=>{
    return getCall(`api/bookings?month=${encodeURIComponent(data.month)}&year=${encodeURIComponent(data.year)}`)
}