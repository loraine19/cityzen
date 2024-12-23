import axios from "axios";
import Cookies from "js-cookie";
import { useToken } from "./useToken";
import { Auth } from "../../types/class";

// On vérifie qu'Axios est chargé via le CDN avant d'utiliser ce module
//let url = "'https://back.imagindev-app.fr";
//const url = import.meta.env.BASE_URL;
//console.log(url);
const url = 'http://localhost:3000';

const accessToken = Cookies.get('accessToken')
const refreshToken = Cookies.get('refreshToken')

if (typeof axios === "undefined") {
    throw new Error("Axios doit être chargé pour utiliser ce module.");
}

export const useApi = () => {
    const headers = {
        'Authorization': 'Bearer ' + accessToken,
    };

    // Création d'une instance Axios
    const api = axios.create({
        baseURL: url,
        headers: headers,
    });

    // Juste avant l'envoi de la requète
    api.interceptors.request.use((config) => {
        // on pourrait ajouter des éléments dans le header
        // ajouter dans le header le token (Authorization)
        //
        return config;
    });

    // tout de suite la reponse de la requète
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            console.log(error);
            if (error.response && error.response.status === 401) {
                // api.post('auth/refresh', { refreshToken });

            }
            if (error.response && error.response.status === 404) {
                console.log("404")
                try {
                    const refresh = async (): Promise<any> => {
                        console.log(refreshToken)


                        const result = await axios.post('http://localhost:3000/auth/refresh', { refreshToken: refreshToken })
                        console.log("cc", result);
                        Cookies.set('accessToken', result.data.accessToken, { expires: 7 });
                        Cookies.set('refreshToken', result.data.refreshToken, { expires: 7 });
                        refresh();
                    }
                }
                catch (error) { console.log('---', error) }

                // saveToken(result.data.accessToken, result.data.refreshToken)



            }
            return Promise.reject(error);
        }
    );

    return api;
};


