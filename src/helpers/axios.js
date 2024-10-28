import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";


const axiosService = axios.create(
    {
        baseURL: "http://localhost:8000/api",
        headers: {
            "Content-Type": "application/json",
        }
    }
);

// Retira o access token do LocalStorage
axiosService.interceptors.request.use(
    async (config) => {
        const { access } = JSON.parse(localStorage.getItem("auth"));
        console.log(access);

        // Coloca access token no cabeçalho
        config.headers.Authorization = `Bearer ${access}`;

        return config;
    }
);

//  Intercepta a resposta - resolve a promessa se tudo ocorrer bem e mostra erro se não
axiosService.interceptors.response.use(
    (response) => Promise.resolve(response),
    (error) => Promise.reject(error),
);


const refreshAuthLogic = async (failed_request) => {
    const { refresh } = JSON.parse(localStorage.getItem("auth"));

    return axios.post(
        "auth/refresh/",
        null,
        {
            baseURL: "http://localhost:8000/api",
            headers: {
                Authorization: `Bearer ${refresh}`,
            }
         }
    )
    .then((response) => {
            const { access, refresh } = response.data;
            failed_request.response.config.headers.Authorization = "Bearer " + access;
            localStorage.setItem(
                "auth",
                JSON.stringify({ access, refresh })
            );
        }
    )
    .catch(
        () => {
            localStorage.removeItem("auth");
        }
    )

}

createAuthRefreshInterceptor(axiosService, refreshAuthLogic);

export const fetcher = (url) => {
    return axiosService.get(url).then((response) => response.data);
}

export default axiosService;