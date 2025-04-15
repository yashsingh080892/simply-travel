

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const getMonth = ( monthIndex : number = 0 ):string => {
    return months[monthIndex];
};
export const getDay = ( dayIndex : number = 0 ):string=>{
    return days[dayIndex];
}

const getCurrentDateDetails = (_date?:Date) => {
    const date = _date || new Date();
    return {
        day : getDay(date.getDay()),
        month : getMonth(date.getMonth()),
        date : date.getDate(),
        year : date.getFullYear(),
        data : date
    };
};
export default getCurrentDateDetails;