const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export async function apiRequest(path, options = {}) {
    const response = await fetch(`${API_BASE}${path}`, {
        ...options,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong. Please try again.');
    }
    return data;
}