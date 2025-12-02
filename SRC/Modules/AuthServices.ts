import api from "../../api/api";
import { LoginPayload, RegisterPayload } from "./types";

export const loginService = (data: LoginPayload) =>
  api.post("/api/v1/auth/login", data);

export const registerService = (data: RegisterPayload) =>
  api.post("/api/v1/auth/register", data);
