import { FormDataModel } from '../../types/utils/object/form-data-model';
import { RailsFormData, railsFormDataFactory } from '../../utils/factory/rails-form-data-factory';
import csrfToken from '../rails/csrf-token';

type ErrorResponse = {
  errors?: {
    message: string;
  };
  // exception?: string;
  // status?: HttpStatusCode;
};
type ResponseBase<T> = {
  data?: T;
  errors?: ErrorResponse;
};
type ResponseData<T = unknown> = T | ErrorResponse;

type FetchProps = {
  method: string;
  url: string;
  body?: string | RailsFormData;
  options?: RequestInit;
};
type UploadProps = {
  url: string;
  body?: string | RailsFormData;
  options?: RequestInit;
};

const HTTP_STATUS_CODE = {
  SUCCESS: 200,
  NO_CONTENT: 204,
  BAD_REQEST: 400,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500,
} as const;
// type HttpStatusCode = typeof HTTP_STATUS_CODE[keyof typeof HTTP_STATUS_CODE];

const hasError = (res: ResponseData<any>): res is ErrorResponse => {
  return 'errors' in res;
};

const BASE_OPTIONS: RequestInit = {
  mode: 'same-origin',
  cache: 'no-cache',
  redirect: 'follow',
  credentials: 'same-origin',
};

const doFetch = async <T>(url: string, options: RequestInit): Promise<ResponseBase<T>> => {
  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'X-CSRF-Token': csrfToken() || '',
    },
  });
  console.log('res:', res);
  if (res.status === HTTP_STATUS_CODE.NO_CONTENT) {
    return {};
  }
  const data = (await res.json()) as ResponseData<T>;
  console.log('data:', data);
  if (hasError(data)) {
    return { errors: data };
  }
  return { data };
};

const uploadApi = async <T>({ url, body }: UploadProps): Promise<ResponseBase<T>> => {
  const requestOptions = {
    ...BASE_OPTIONS,
    method: 'POST',
    body,
  };
  return await doFetch(url, requestOptions);
};

const fetchApi = async <T>({ method, url, body }: FetchProps): Promise<ResponseBase<T>> => {
  const requestOptions: RequestInit = {
    ...BASE_OPTIONS,
    headers: {
      'Content-Type': 'application/json',
    },
    method,
    body,
  };
  return await doFetch<T>(url, requestOptions);
};

export const apiClient = {
  async get<T = any>(url: string, body?: any) {
    return await fetchApi<T>({ method: 'GET', url });
  },
  async post<T = any>(url: string, body: any = {}) {
    return await fetchApi<T>({ method: 'POST', url, body: JSON.stringify(body ?? {}) });
  },
  async delete<T = any>(url: string, body: any = {}) {
    return await fetchApi<T>({ method: 'DELETE', url, body: JSON.stringify(body ?? {}) });
  },
  async upload<T = any>(url: string, models: FormDataModel[]) {
    const formData = railsFormDataFactory(models);
    return await uploadApi<T>({ url, body: formData });
  },
};
