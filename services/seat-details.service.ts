import api from "../api/instance";
import {seat} from "../environment/env.local";


const showSeatById = (flightId: number) => {
    const seatDetailsEndpoint = `${seat}/?flightId=${flightId}`;

    return api
        .get(seatDetailsEndpoint)
        .then((response: any) => response)
        .catch((error) => {
            console.error("Error fetching seatDetails:", error);
        });
};


const SeatDetailsService={
    showSeatById
};

export default SeatDetailsService;
