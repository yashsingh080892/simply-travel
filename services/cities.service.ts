import api from "../api/instance";
import {Cities} from "../models/cities.model";
import {city} from "../environment/env.local"
const searchCity = (value:string,city_id:number) => {
    return api.get(city+`?query=airportName:*${value}*,name:*${value}*${city_id ? `,id!${city_id}` : ''}`).then((response:any) => {
            return response.content.map((item: any) => new Cities().deserialize(item));
        })
        .catch((error) => {
            console.error("Error fetching cities:", error);
        });
}

const CitiesService = {
    searchCity
}

export default  CitiesService;
