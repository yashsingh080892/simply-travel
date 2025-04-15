export interface TravellerFormProps{
    data:{
        firstName : string,
        lastName : string,
        gender : string,
        dob: {
            date : number,
            month : number,
            year : number
        },
        passport:{
            number : string,
            nationality : string,
            issueCountry : string,
            expiryDate : {
                date : number,
                month : number,
                year : number
            }
        },
        isSaved ?: boolean
    },
    index:number,
    setPassengerDetails:({})=>void,
    setPassengerDetailsError : ({})=>void,
    type:string,
    isSubmitted?:boolean
}