import axios from "axios";

const KEY = "7ef8bb0d";

export default axios.create({
  baseURL: "https://www.omdbapi.com",
  params: {
    apikey: KEY
  },
});
