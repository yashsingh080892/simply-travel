import {serializable} from "serializr";

export class PassengerDetails {
    @serializable
    public firstName: string;

    @serializable
    public gender: string;

    @serializable
    public dateOfBirth: Date;

    @serializable
    public lastName: string;

    @serializable
    public passportNumber: string;

    @serializable
    public nationality: string;

    @serializable
    public issueCountry: string;

    @serializable
    public expiryDate: Date;

    @serializable
    public travellerType: string;


    constructor(firstName: string, gender: string, dateOfBirth: Date, lastName: string, passportNumber: string,
                nationality: string, issueCountry: string, expiryDate: Date, travellerType: string,
                seatAllocated: string) {
        this.firstName = firstName;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.lastName = lastName;
        this.passportNumber = passportNumber;
        this.nationality = nationality;
        this.issueCountry = issueCountry;
        this.expiryDate = expiryDate;
        this.travellerType = travellerType;
    }
}
