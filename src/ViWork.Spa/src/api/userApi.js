import {
    getAsync,
    postAsync,
    putAsync,
    deleteAsync
} from "../helpers/apiHelper";

const endpoint = process.env.VUE_APP_BACKEND + "/Account/Register";

export async function register(form) {
    return await postAsync(endpoint, form);
}