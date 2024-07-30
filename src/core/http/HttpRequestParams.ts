import { CryptoUtil } from "@/utils/crypto-util";

export class HttpRequestParams {
  params: any;
  isEncrypt: boolean = true;
  constructor(params: any = {}, encrypt: boolean = true) {
    this.params = params;
    this.isEncrypt = encrypt;
  }

  get realParams(): any {
    if (process.env.VUE_APP_CRYPTO == "1" && this.isEncrypt) {
      if (this.params instanceof Array) {
        return HttpRequestParams.encryptoArray(this.params);
      } else {
        let realParams: any = {};
        Object.keys(this.params).forEach(key => {
          realParams[key] = CryptoUtil.enDES3(this.params[key]);
        });
        return realParams;
      }
    } else {
      return this.params;
    }
  }

  static encryptoArray(arr: any[]): any {
    let enArr = [];
    for (const iterator of arr) {
      if (typeof iterator === "string" || typeof iterator === "number") {
        enArr.push(CryptoUtil.enDES3(iterator as any));
      }
      if (typeof iterator === "object") {
        if (iterator instanceof Array) {
          enArr.push(HttpRequestParams.encryptoArray(iterator));
        }
        if (iterator instanceof Object) {
          let enParams: any = {};
          Object.keys(iterator).forEach(key => {
            if (iterator[key] instanceof Array) {
              enParams[key] = HttpRequestParams.encryptoArray(iterator[key]);
            } else {
              enParams[key] = CryptoUtil.enDES3(iterator[key]);
            }
          });
          enArr.push(enParams);
        }
      }
    }
    return enArr;
  }

  static encryptoFromData(fromData: FormData) {
    if (process.env.VUE_APP_CRYPTO == "1") {
      let enFormData = new FormData();
      for (const iterator of fromData.entries()) {
        if (typeof iterator[1] == "string") {
          enFormData.append(iterator[0], CryptoUtil.enDES3(iterator[1]));
        } else {
          enFormData.append(iterator[0], iterator[1]);
        }
      }
      return enFormData;
    } else {
      return fromData;
    }
  }
}
