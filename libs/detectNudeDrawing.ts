import axios = require("axios");

export async function detectNudeDrawing(url: string) {
  let res: axios.AxiosResponse;
  const options = {
    method: "POST",
    url: "https://nsfw-image-classification1.p.rapidapi.com/img/nsfw",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Host": "nsfw-image-classification1.p.rapidapi.com",
      "X-RapidAPI-Key": "233aeae5ecmshf31da3d9ab8277ap1ddf5bjsn4850f50f1ebc",
    },
    data: `{"url":"${url}"}`,
  };

  res = await axios.default.request(options);

  return res;
}
