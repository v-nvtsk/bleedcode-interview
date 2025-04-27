import axios from "axios";
import {createURL} from "../utils/create-url";

export const api = axios.create({
  baseURL: createURL(),
  withCredentials: true,
});
