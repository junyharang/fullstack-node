/* ====== 공통 요청 옵션 타입 정의 ====== */
export interface RequestOptions extends RequestInit {
    body?: string; // JSON.stringify로 넘기기 위해 string 사용
    headers?: HeadersInit;
}

/* ====== 공통 GET 요청 함수 ====== */
export async function getRequest<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return await response.json() as Promise<T>;
}

/* ====== 공통 POST 요청 함수 ====== */
export async function postRequest<T>(url: string, options?: RequestOptions): Promise<T> {
    const defaultOptions: RequestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    };

    const response = await fetch(url, defaultOptions);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return await response.json() as Promise<T>;
}

/* ====== 공통 PUT 요청 함수 ====== */
export async function putRequest<T>(url: string, options?: RequestOptions): Promise<T> {
    const defaultOptions: RequestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    };

    const response = await fetch(url, defaultOptions);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return await response.json() as Promise<T>;
}

/* ====== 공통 PATCH 요청 함수 ====== */
export async function patchRequest<T>(url: string, options?: RequestOptions): Promise<T> {
    const defaultOptions: RequestOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    };

    const response = await fetch(url, defaultOptions);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return await response.json() as Promise<T>;
}

/* ====== 공통 DELETE 요청 함수 ====== */
export async function deleteRequest<T>(url: string, options?: RequestOptions): Promise<T> {
    const defaultOptions: RequestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    };

    const response = await fetch(url, defaultOptions);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return await response.json() as Promise<T>;
}
