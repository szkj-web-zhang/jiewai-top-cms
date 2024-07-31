export interface Result {
  code: number;
  msg: string;
}

// 请求响应参数（包含data）
export interface ResultData<T = any> extends Result {
  data: T;
}

export namespace Login {
  export interface PasswordLoginFrom {
    account: string;
    password: string;
  }
  export interface LoginResponse {
    token: string;
  }
  export interface VerifyCodeFrom {
    account: string;
    state: 1 | 2 | 3;
  }
  export interface VerifyCodeReq {
    account: string;
    varificationCode: string;
  }
}
