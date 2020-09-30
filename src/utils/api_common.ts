export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const make_header = (access_token: string) => ({
  headers: {
    Authorization: `Bearer ${access_token}`,
    'X-is-json-only': true,
  },
});

export const unwrapData = (response: any) => {
  const { data } = response;
  return data;
};


export const unwrapErrorData = (response: any) => {
  return response.response.data;
};
