const AUTH_API_BASE = "http://13.203.199.13";

export async function apiRequest(endpoint, method = 'GET', body = null) {
    const headers = {
        'Content-Type': 'application/json',
    };

    const options = {
        method,
        headers,
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${AUTH_API_BASE}${endpoint}`, options);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
}
