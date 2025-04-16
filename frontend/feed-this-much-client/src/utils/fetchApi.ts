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
}): object {

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

        if (response.ok) {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const respJson = await response.json();

                return { "response": response, "payload": respJson };
            } else {
                const respText = await response.text();

                return { "response": response, "payload": respText };
            }
        } else {
            const error = await response.json();
            console.error('Error:', error);

            return false;
        }
    } catch (err) {
        console.error('Request failed', err);

        return false;
    }
}

async function postRequest({
    path,
    body
}: {
    path: string;
    body: object;
}): object {

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

        if (response.ok) {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const respJson = await response.json();

                return { "response": response, "payload": respJson };
            } else {
                const respText = await response.text();

                return { "response": response, "payload": respText };
            }
        } else {
            const error = await response.json();
            console.error('Error:', error);

            return false;
        }
    } catch (err) {
        console.error('Request failed', err);

        return false;
    }
}

export { getCookieByName, getRequest, postRequest };
