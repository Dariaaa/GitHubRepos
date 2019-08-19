import  axios from "axios";

export const AxiosBuilder = axios.create({
    baseURL: 'http://cors-anywhere.herokuapp.com/https://api.github.com/',
    timeout: 60000,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Credentials": "false",
        "Accept": " application/vnd.github.v3+json",
        "Authorization":"Basic xxx",

    },
});

export const AXIOS = (url, method = 'GET') => {
    const params = { url, method};
    let error = null;

    return AxiosBuilder(params)
        .then(response => {
            const { data, status } = response;

            if (status === 200) {
                // SSR
                return data;
            }

            error = { status, message: data.error };
            throw error;
        })
        .catch(({ response: { data, status }, message }) => {
            if (!error) {
                error = { status, message, data };
            }
            return Promise.reject(error);
        });
};
