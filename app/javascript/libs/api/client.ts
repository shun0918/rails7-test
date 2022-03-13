type ResponseBase<T> = {
    errors?: unknown;
    data?: T | null;
}

type FetchProps = {
    method: string;
    url: string;
    body: any;
}

const HttpStatusCode = {
    NO_CONTENT: 204,
} as const;

export const apiClient = {
    async fetch<T>({method, url, body}: FetchProps): Promise<ResponseBase<T>> {

        const res = await fetch(url, {
            method,
            mode: 'same-origin',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            credentials: "same-origin",
            body: JSON.stringify(body),
        });
        console.log('res:', res)
        if(res.status === HttpStatusCode.NO_CONTENT) {
            return {data: null};
        }
        const data = await res.json() as T;
        console.log('res:', data);
        return { data };
    },
    async get<T = any>(url: string, body?: any) {
        return (await this.fetch<T>({method: 'GET', url, body}));
    },
    async post<T = any>(url: string, body: any) {
        return (await this.fetch<T>({method: 'POST', url, body}));
    }
};