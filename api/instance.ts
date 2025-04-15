const axios = require("axios");

const getBaseUrl = async () => {
    return "http://dev-flash.testsigma.com";
}
function getToken(){
    if(sessionStorage.getItem("jwt_token")){
         return sessionStorage.getItem("jwt_token")
    }
}
const get = <T>(endpoint: string, params?: Record<string, any>): Promise<T> =>
    new Promise(async (resolve, reject) => {
        const baseURL = await getBaseUrl();
        const headers:any = {
            "Content-Type": "application/json"
        };
        const token = getToken();
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
        return axios( baseURL + endpoint, {
            method : "GET",
            params,
            data: {},
            headers: headers,
        })
            .then((response:any) => resolve(response.data))
            .catch((error:any) => {
                reject(error);
            });
    });

const post = <T>(endpoint: string, data: object): Promise<T> =>
    new Promise(async (resolve, reject) => {
        const baseURL = await getBaseUrl();
        const headers:any = {
            "Content-Type": "application/json",
        };
        const token = getToken();
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
        console.log("\n\n normal \n\n",data)
        console.log("\n\n normal \n\n",data)
        axios(baseURL + endpoint, {
            method: 'POST',
            data: data,
            headers: headers,
        })
            .then(async (response:any) => {
                const content = await response.data;
                return typeof content === 'string' ? JSON.parse(content === '' ? JSON.stringify({}) : content): content;
            })
            .then((data:any) => {
                resolve(data);
            })
            .catch((error:any) => {
                reject(error);
            });
    });

const put = <T>(endpoint: string, data: object): Promise<T> =>
    new Promise(async (resolve, reject) => {
        const baseURL = await getBaseUrl();
        const headers:any = {
            "Content-Type": "application/json",
        };
        const token = getToken();
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
        axios(baseURL + endpoint, {
            method: 'PUT',
            data: JSON.stringify(data),
            headers:headers,
        })
            .then(async (response:any) => {
                const content = await response.data;
                return typeof content === 'string' ? JSON.parse(content === '' ? JSON.stringify({}) : content): content;
            })
            .then((data: any) => {
                if (data.error) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
    });

const remove = (endpoint: string): Promise<void> =>
    new Promise(async (resolve, reject) => {
        const baseURL = await getBaseUrl();
        const headers:any = {};
        const token = getToken();
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
        axios(baseURL + endpoint, {
            method: 'DELETE',
            headers: headers,
        })
            .then(() => {
                resolve();
            })
            .catch((error:any) => {
                reject(error);
            });
    });

const Api = {
    get,
    post,
    put,
    remove,
};

export default Api;
