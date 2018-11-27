import {
    getAsync,
    postAsync,
    putAsync,
    deleteAsync
} from "../helpers/apiHelper";

const endpoint = process.env.VUE_APP_BACKEND + "/api/group";

export async function createGroupAsync(model) {
    return await postAsync(endpoint, model);
}

export async function getGroupListAsync(userId) {   
    return await getAsync(`${endpoint}/GetGroup/${userId}`);
}