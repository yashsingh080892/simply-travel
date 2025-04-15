import api from "../api/instance";
import {SignUp} from "../models/sign-up.model";
import {signUp} from "../environment/env.local";

const nameSpace = "/users"

const add =(data: SignUp)=>{
    return api.post(signUp,data).then(res => new SignUp().deserialize(res))
}

const SignupService = {
    add
}
export default SignupService;
