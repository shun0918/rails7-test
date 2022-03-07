type FetchProps = {
    method: string;
    url: string;
    body: any;
}

const HttpStatusCode = {
    NO_CONTENT: 204,
} as const;

export const apiClient = {
    async fetch<T>({method, url, body}: FetchProps): Promise<T | null> {
        const res = await fetch(url, {
            method,
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'manual',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(body),
        });
        console.log('res:', res)
        if(res.status === HttpStatusCode.NO_CONTENT) {
            return null;
        }
        const json = await res.json() as T;
        console.log('res:', json)
        return json;
    },
    async get<T = any>(url: string, body?: any) {
        return (await this.fetch<T>({method: 'GET', url, body}));
    },
    async post<T = any>(url: string, body: any) {
        return (await this.fetch<T>({method: 'POST', url, body}));
    }
};