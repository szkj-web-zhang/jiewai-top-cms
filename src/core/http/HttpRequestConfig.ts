/*
 * @Author: 申亚芳
 * @Date: 2022-09-01 13:42:49
 * @LastEditors: 申亚芳
 * @LastEditTime: 2022-10-09 17:55:41
 * @Description: file content
 * @FilePath: \smart-campus-web\src\core\http\HttpRequestConfig.ts
 */
import { HttpRequestParams } from "@/core/http/HttpRequestParams";

export type RequestMethodType = "GET" | "POST" | "PUT" | "DELETE";
export type HeaderContentType = "JSON" | "URL-Encode";

export class HttpRequestConfig {
  isEncrypt: boolean = true;

  //请求类型，默认为POST请求
  requestType: RequestMethodType = "POST";

  //header-contentType
  requestContentType: HeaderContentType = "URL-Encode";

  //请求接口路径
  path: string = "";

  //请求参数
  params: HttpRequestParams = new HttpRequestParams(new Map());

  //临时token
  tempToken: string = "";

  formData?: FormData;

  //是否需要loading
  loading: boolean = true;
  loadingMessage: string = "loading...";

  //业务成功 接口state为1时执行
  businessSuccess: Function = (data: any) => {};

  //业务失败 接口state为0时执行
  businessFailed: Function = (data: any) => {};

  //请求失败 网络不通或者服务器报错等会执行
  requestFailed: Function = (err: any) => {};

  //请求结束, 无论成功失败都会执行
  requestFinished?: Function = () => {};

  //超时时长
  timeout: number = 60000;
}
