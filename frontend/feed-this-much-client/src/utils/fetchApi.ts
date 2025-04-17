import Cookies from 'js-cookie';

function getBaseUrl(): string {
    const debug = true; // SET TO FALSE WHEN COMMIT TO MAIN
    if (debug) {
        let baseUrl = "http://localhost:8000";
        return baseUrl;
    }
    let baseUrl = "https://api.feedthismuch.com";
    return baseUrl;
}

function getCookieByName(name: string | null) {
    return Cookies.get(name);
}

async function getRequest({
    path
}: {
    path: string;
}): Promise<any> {

    let headers = {
        'Content-Type': 'application/json',
    };

    const csrftoken = getCookieByName('csrftoken');
    if (csrftoken) {
        headers['X-CSRFToken'] = csrftoken;
    }

    let baseUrl = getBaseUrl();

    try {
        const response = await fetch(baseUrl.concat(path), {
            method: 'GET',
            headers: headers,
            credentials: 'include',
        });

        return await constructReturnObj(response);
    } catch (err) {
        console.error('Request failed', err);
        return await constructReturnObj(null);
    }
}

async function postRequest({
    path,
    body
}: {
    path: string;
    body: object;
}): Promise<any> {

    let headers = {
        'Content-Type': 'application/json',
    };

    const csrftoken = getCookieByName('csrftoken');
    if (csrftoken) {
        headers['X-CSRFToken'] = csrftoken;
    }

    let baseUrl = getBaseUrl();
    try {
        const response = await fetch(baseUrl.concat(path), {
            method: 'POST',
            mode: 'cors',
            headers: headers,
            credentials: 'include',
            body: JSON.stringify(body),
        });

        return await constructReturnObj(response);
    } catch (err) {
        console.error('Request failed', err);
        return await constructReturnObj(null);
    }
}

async function getResponsePayload(response: any): Promise<any> {
    const contentType = response.headers.get("content-type");

    try {
        if (contentType && contentType.indexOf("application/json") !== -1) {
            return await response.json();
        } else {
            return await response.text();
        }
    } catch (err) {
        return null;
    }
}

async function constructReturnObj(response: any | null): Promise<any> {

    if (response) {
        const returnObj = {
            ok: response.ok,
            status: response.status,
            payload: await getResponsePayload(response),
        }

        return returnObj;
    }

    return {};
}
export { getCookieByName, getRequest, postRequest };
