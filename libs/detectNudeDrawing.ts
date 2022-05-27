import axios = require("axios");

export async function detectNudeDrawing(url: string) {
  let res: axios.AxiosResponse;
  const options = {
    method: "POST",
    url: "https://nsfw-image-classification1.p.rapidapi.com/img/nsfw",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Host": "nsfw-image-classification1.p.rapidapi.com",
      "X-RapidAPI-Key": "KEY",
    },
    data: `{"url":"${url}"}`,
  };

  res = await axios.default.request(options);

  return res;
}
