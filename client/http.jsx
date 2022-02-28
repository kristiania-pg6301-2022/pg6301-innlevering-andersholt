import { useEffect, useState } from "react";

export async function fetchJSON(url) {
  const res = await fetch(url);
  return await res.json();
}

export async function postJSON(url, json) {
  await fetch(url, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(json),
  });
}

export function useLoader(fun) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState();

  async function reload() {
    setError(undefined);
    setLoading(true);
    try {
      setData(await fun());
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(reload, []);

  return { reload, loading, error, data };
}
