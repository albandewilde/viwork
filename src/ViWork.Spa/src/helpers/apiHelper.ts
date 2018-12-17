import AuthService from "../services/AuthService";

function dataFilter(data: any, type: any) {
    if (data === "") { return null; }
    return data;
}

export async function postAsync(url: any, data: any) {
    return await ({
        method: "POST",
        url,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        dataFilter,
        headers: {
            Authorization: `Bearer ${AuthService.accessToken}`,
        },
    });
}

export async function putAsync(url: any, data: any) {
    return await ({
        method: "PUT",
        url,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        dataFilter,
        headers: {
            Authorization: `Bearer ${AuthService.accessToken}`,
        },
    });
}

export async function getAsync(url: any) {
    return await ({
        method: "GET",
        url,
        dataType: "json",
        dataFilter,
        headers: {
            Authorization: `Bearer ${AuthService.accessToken}`,
        },
    });
}

export async function deleteAsync(url: any) {
    return await ({
        method: "DELETE",
        url,
        dataType: "json",
        dataFilter,
        headers: {
            Authorization: `Bearer ${AuthService.accessToken}`,
        },
    });
}
