export interface PassengerFormValidationProps{
    firstName:string,
    lastName:string,
    gender:string,
    dob: {
        date : string,
        month : string,
        year : string,
    },
    passport:{
        number : string,
        nationality : string,
        issueCountry : string,
        expiryDate : {
            date : string,
            month : string,
            year : string
        }
    }
}