import axios = require("axios");

export async function detectNude(url: string) {
  let res: axios.AxiosResponse;
  const options = {
    method: "POST",
    url: "https://nuditysearch.p.rapidapi.com/nuditySearch/image",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Host": "nuditysearch.p.rapidapi.com",
      "X-RapidAPI-Key": "233aeae5ecmshf31da3d9ab8277ap1ddf5bjsn4850f50f1ebc",
    },
    data: `{"objectUrl":"${url}"}`,
  };

  res = await axios.default.request(options);

  return res;
}
