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

export const createAPI = async (formData: FormData) => {
  try {
    const token = sessionStorage.getItem("token");
    const res = await fetch(BASE_URL + "/products", {
      method: "POST",
      headers: {
        authorization: `Token ${token}`,
      },
      body: formData,
    });

    if (res.status === 200) {
      console.log("Файл загружен");
    } else {
      throw new Error(`Unexpected response code: ${res.status}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProductAPI = async (id: string) => {
  try {
    const token = sessionStorage.getItem("token");
    const res = await fetch(BASE_URL + "/products/" + id, {
      method: "GET",
      headers: {
        authorization: `Token ${token}`,
      },
    });

    if (res.status === 200) {
      return res.json();
    } else {
      throw new Error(`Unexpected response code: ${res.status}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateAPI = async (formData: FormData, id: string) => {
  try {
    const token = sessionStorage.getItem("token");
    const res = await fetch(BASE_URL + "/products/" + id, {
      method: "PATCH",
      headers: {
        authorization: `Token ${token}`,
      },
      body: formData,
    });

    if (res.status === 200) {
      console.log("Ok");
    } else {
      throw new Error(`Unexpected response code: ${res.status}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteAPI = async (id: string) => {
  try {
    const token = sessionStorage.getItem("token");
    const res = await fetch(BASE_URL + "/products/" + id, {
      method: "DELETE",
      headers: {
        authorization: `Token ${token}`,
      },
    });

    if (res.status === 200) {
      console.log("Ok");
    } else {
      throw new Error(`Unexpected response code: ${res.status}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCrumbAPI = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const res = await fetch(BASE_URL + "/random_breadcrumb", {
      method: "GET",
      headers: {
        authorization: `Token ${token}`,
      },
    });

    if (res.status === 200) {
      return res.json();
    } else {
      throw new Error(`Unexpected response code: ${res.status}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
