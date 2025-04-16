export interface PassengerClassFormProps {
    passengersAndClass:{
        adult: number|null;
        children: number|null;
        classType: number|null;
    },
    onSave:({})=>{},
    handleClose:({})=>{}
};