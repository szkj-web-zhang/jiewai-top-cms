import { Login } from "../interface";
import { PORT1 } from "@/api/config/index";
import http from "@/api";
import qs from "qs";

// 获取手机验证码
export const verifyCode_get_url = (params: Login.VerifyCodeFrom) => {
  return http.post(
    PORT1 + `/cms-system/account/regCaptcha`,
    qs.stringify(params),
    {
      loading: false
    }
  );
};

// 验证码登录
export const verifyCode_login_url = (params: Login.VerifyCodeReq) => {
  return http.post(
    PORT1 +
      `/cms-system/account/loginByCode?account=${params.account}&varificationCode=${params.varificationCode}`,
    {},
    { loading: false }
  );
};

// 账号密码登录
export const password_login_url = (params: Login.PasswordLoginFrom) => {
  return http.post(
    PORT1 + `/cms-system/account/loginByPassword`,
    qs.stringify(params),
    {
      loading: false
    }
  );
};

// 获取用户信息
export const user_info_get = () => {
  return http.post<Login.UserInfoRes>(PORT1 + `/cms-system/account/getInfo`);
};

// 退出登录
export const user_logout = () => {
  return http.post(PORT1 + `/cms-system/account/logout`, { loading: false });
};
