// src/api/api.js
const BASE_URL = "http://localhost:6868/api";

export async function fetchServices() {
    try {
        const res = await fetch(`${BASE_URL}/services`);
        if (!res.ok) throw new Error(`Ошибка ${res.status}`);
        return await res.json();
    } catch (e) {
        console.error("Ошибка при получении списка услуг:", e);
        return [];
    }
}

export async function fetchMasters() {
    try {
        const res = await fetch(`${BASE_URL}/masters`);
        if (!res.ok) throw new Error(`Ошибка ${res.status}`);
        return await res.json();
    } catch (e) {
        console.error("Ошибка при получении списка мастеров:", e);
        return [];
    }
}
