import axios from "axios";

const urlLocalhost = "http://localhost:3001";
const urlHeroku = "https://inisblockchain.herokuapp.com"

const db = axios.create({
  baseURL: urlLocalhost,
});



export { db };
