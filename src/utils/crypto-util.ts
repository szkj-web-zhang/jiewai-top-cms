/*
 * @Author: 申亚芳
 * @Date: 2022-10-24 14:30:53
 * @LastEditors: 申亚芳
 * @LastEditTime: 2024-06-17 18:58:42
 * @Description: file content
 * @FilePath: \did-middle-service\src\utils\crypto-util.ts
 */
/*密码加密工具*/
import CryptoJS from "crypto-js";
// 默认的 KEY 与 iv 如果没有给
const KEY = CryptoJS.enc.Utf8.parse("xugang_yzcm_zhxy@163.com");
const IV = CryptoJS.enc.Utf8.parse("_zhxypt_");
const signkey = "yzcm_egm@163.com";

export class CryptoUtil {
  static enDES3(str: string = "", key = KEY, desIv = IV) {
    if (str != null) {
      let type: string = typeof str;
      if (type != "String") {
        str = str.toString();
      }
    }
    const encrypt = CryptoJS.TripleDES.encrypt(str, KEY, {
      iv: desIv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypt.toString();
  }

  static deDES3(str: string, key = KEY, desIv = IV) {
    const decrypt = CryptoJS.TripleDES.decrypt(str, key, {
      iv: desIv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return decrypt.toString(CryptoJS.enc.Utf8);
  }

  static getSign(data: any) {
    let signKey = CryptoJS.MD5(signkey).toString().toUpperCase();
    let signStr = data + signKey;
    let sign = CryptoJS.MD5(signStr).toString().toLowerCase();
    let encrypt = CryptoUtil.enDES3(sign);
    return encrypt;
  }
}
