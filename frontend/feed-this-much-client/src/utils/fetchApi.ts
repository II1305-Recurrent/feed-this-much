function getRequest (
    baseUrl: string,
    path: string,
    headers: object,
    credentials: string): object {
    
    try {
        const response = await fetch(baseUrl.concat(path), {
            method: 'GET',
            mode: 'cors',
            headers: headers,
            credentials: credentials,
        });

        if (response.ok) {
            const result = await response.json();
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
