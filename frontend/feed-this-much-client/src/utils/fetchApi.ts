function getBaseUrl(void): string {
    let baseUrl = "https://api.feedthismuch.com";
}

function getCookieByName(name: string | null) {
    const cookieString = document.cookie;
    const cookies = cookieString.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

function getRequest (options: {
    path: string }): object {
   
    const csrftoken = getCookieByName('csrftoken');

    let headers = {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
    };
    
    try {
        const response = await fetch(baseUrl.concat(path), {
            method: 'GET',
            mode: 'cors',
            headers: headers,
            credentials: 'include',
        });

        if (response.ok) {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json();
            } else {
                return response.text();
            }
        } else {
            const error = await response.json();
            console.error('Error:', error);
        }
    } catch (err) {
        console.error('Request failed', err);
    }
}

function postRequest(options: {
    path: string,
    body: object }): object {

    const csrftoken = getCookieByName('csrftoken');

    let headers = {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
    };
    
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
                return response.json();
            } else {
                return response.text();
            }
        } else {
            const error = await response.json();
            console.error('Error:', error);
        }
    } catch (err) {
        console.error('Request failed', err);
    }
}

export getCookieByName, getRequest, postRequest;
