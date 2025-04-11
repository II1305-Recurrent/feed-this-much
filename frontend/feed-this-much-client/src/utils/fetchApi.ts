function getRequest (
    baseUrl: string,
    path: string,
    csrf: boolean): object {
    
    let headers = {
        'Content-Type': 'application/json',
    };
    
    if (csrf) {
        headers['X-CSRFToken'] = getCookie('csrftoken');
    }

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
            }else {
                return response.text();
            }
            return result;
        } else {
            const error = await response.json();
            console.error('Error:', error);
        }
    } catch (err) {
        console.error('Request failed', err);
    }
}

function postRequest(
    baseUrl: string,
    path: string,
    headers: object,
    body: object || null,
    credentials: string): object {
}

function getCookie(name: string) {
  const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith(name + '='))
    ?.split('=')[1];
  return cookieValue ?? null;
}
