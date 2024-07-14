interface IAuthAPI {
  email: string;
  password: string;
}

const BASE_URL = "http://localhost:3002";

export const authAPI = async (data: IAuthAPI) => {
  try {
    const res = await fetch(BASE_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.status === 200) {
      const body = await res.json();
      sessionStorage.setItem("token", body.token);
      return body;
    } else {
      throw new Error(`Unexpected response code: ${res.status}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetcher = (url: string, params?: RequestInit) => {
  const token = sessionStorage.getItem("token");
  return fetch(BASE_URL + url, {
    ...params,
    headers: {
      ...params?.headers,
      authorization: `Token ${token}`,
    },
  }).then((res) => res.json());
};
