import api from "../api/instance";
import {addons} from "../environment/env.local"
const show = () => {
    // @ts-ignore
    return api.get(`${addons}`).then(res => (res.content));
}

const AddonService = {
    show,
}
export default AddonService;