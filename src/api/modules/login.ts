import { Login } from "../interface";
import { PORT1 } from "@/api/config/index";
import http from "@/api";
import qs from "qs";

export const password_login_url = (params: Login.PasswordLoginFrom) => {
  return http.post<string>(
    PORT1 + `/account/loginByPassword`,
    qs.stringify(params)
  );
};

export const verifyCode_get_url = (params: Login.VerifyCodeFrom) => {
  return http.post<string>(PORT1 + `/account/regCaptcha`, qs.stringify(params));
};

export const verifyCode_login_url = (params: Login.VerifyCodeReq) => {
  return http.post<string>(PORT1 + `/account/loginByCode`, {}, { params });
};
