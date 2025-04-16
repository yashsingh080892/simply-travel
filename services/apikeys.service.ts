import api from "../api/instance";
import {ApiKeys} from "../models/apikeys.models";
import {ApikeysResponse} from "../models/apikeysResponse.model";
import {apikey} from "../environment/env.local"
const saveApiDetails =  (data :ApiKeys) => {
    return api.post(`${apikey}`, data).then(res => console.log(res))
};

const showApi = (email: String) => {
    return api.get(`${apikey}/${email}`)
        .then((response:any) => {
            return response.map((item: any) => new ApikeysResponse().deserialize(item));
        })
        .catch((error) => {
            console.error("Error ApikeyResponse:", error);
        });
}

const ApiKeysService = {
    saveApiDetails,
    showApi,
}
export default ApiKeysService;