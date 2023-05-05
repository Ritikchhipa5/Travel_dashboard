export const API = "https://testing.thernloven.com/tickets-api-new/public/api";

export const fetcher =
  <T, U>(endpoint: string, map?: (data: T) => U) =>
  async () => {
    const res = await fetch(`${API}${endpoint}`);
    const data = await res.json();

    return map ? map(data) : data;
  };

export const poster =
  (endpoint: string, method: "POST" | "PUT" | "DELETE" = "POST") =>
  async (data: Object) => {
    return await fetch(`${API}${endpoint}`, {
      method: method,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors.length) {
          throw new Error(JSON.stringify(data.errors), data.errors);
        }
      });
  };

export const filePoster = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return await fetch(`${API}/images`, {
    method: "POST",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};
