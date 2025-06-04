import axios from 'axios';

const pendingRequests = new Map<string, AbortController>();

const generateKey = (config: any) => {
  const {method, url, params, data} = config;
  return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&');
};

const api = axios.create();

api.interceptors.request.use((config) => {
  const key = generateKey(config);

  // Cancel if a duplicate request exists
  if (pendingRequests.has(key)) {
    const prevController = pendingRequests.get(key)!;
    prevController.abort();
    pendingRequests.delete(key);
  }

  const controller = new AbortController();
  config.signal = controller.signal;
  pendingRequests.set(key, controller);

  return config;
});

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => {
    const key = generateKey(response.config);
    pendingRequests.delete(key);

    return response;
  },
  (error) => {
    if (error.config) {
      const key = generateKey(error.config);
      pendingRequests.delete(key);
    }

    return Promise.reject(error);
  }
);

export default api;
