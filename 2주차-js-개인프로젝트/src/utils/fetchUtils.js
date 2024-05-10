/**
 * GET 요청
 * */
const fetchUtils = {
    get: async (url, setOptions) => {
        const finalOptions = setOptions === undefined ? defaultOptions("get") : setOptions("get");
        return await fetch(url, finalOptions)
            .then(response => response.json())
            .catch(err => console.error(err));
    },
    post: {},
    put: {},
    delete: {}
}

/**
 * fetch option default
 * */
const defaultOptions = (method) => {
    return {
        method: method,
        headers: {
            accept: 'application/json'
        }
    };
}

/**
 * fetch option setup
 * */
const setOptions = (method, accept, authorization) => {
    return {
        method,
        headers: {
            accept,
            Authorization: authorization
        }
    };
}




