import api from "../api/instance";
import {LoginModel} from "../models/login.model";
import {user} from "../environment/env.local"



const getToken =(login:LoginModel)=>{
    return api.post(user,login).then(res=> (res));
}

const UserService = {
    getToken
}
export default UserService;