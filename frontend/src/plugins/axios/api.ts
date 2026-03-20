import axios from "axios";
import { configuration } from "@/utilities/index";

export const api = axios.create(configuration.ApiRequestConfig);