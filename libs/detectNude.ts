import axios = require("axios");

export async function detectNude(url: string) {
  let res: axios.AxiosResponse;
  const options = {
    method: "POST",
    url: "https://nuditysearch.p.rapidapi.com/nuditySearch/image",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Host": "nuditysearch.p.rapidapi.com",
      "X-RapidAPI-Key": "KEY",
    },
    data: `{"objectUrl":"${url}"}`,
  };

  res = await axios.default.request(options);

  return res;
}
