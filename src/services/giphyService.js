import axios from "axios";
import config from "../config.js";

export default {
  getGiphysBySearchKey: (searchKey) => {
    return axios
      .get(config.getGiphyEndpoint + searchKey + `&api_key=${config.GIPHY_API_KEY}`, { preventLoading: true })
      .then((serverRes) => {
        if (serverRes.data) return serverRes.data;
        return { err: "Problem with the request" };
      });
  }
};
