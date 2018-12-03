import {
    getAsync,
    postAsync,
    putAsync,
    deleteAsync
} from "../helpers/apiHelper";

const endpoint = process.env.VUE_APP_BACKEND + "/Account/Register";

export async function createSchemaAsync(model) {
    return await postAsync(`${endpoint}/CreateSchema`, model);
}