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
  export interface UserInfoRes {
    phoneNumber: string;
    uuid: string;
    password: string;
    payPassword: string;
    headPortrait: string;
    nickName: string;
    registerIp: string;
    registerTime: string;
    recentLoginIp: string;
    recentLoginTime: string;
    isRealName: number;
    blacklist: number;
    createTime: string;
    updateTime: string;
    operateUuid: string;
    realName: string;
    idCard: string;
    identity: number;
    uuidSuffix: string;
    parentUuid: null;
    isBanned: boolean;
    commissionRatio: null;
    douyinOpenid: null;
    weixinOpenid: null;
    promotionLevel: number;
    promotionRebateState: number;
    activeFlag: boolean;
    didSymbol: string;
    peopleId: string;
    signStatus: boolean;
    signUrl: string;
    inviteCode: string;
    headPortraitType: number;
    headPortraitNftId: null;
    showType: number;
    domainNickName: string;
    registrationSource: number;
  }
}

export namespace CMS {
  export interface AllUserInfoReq {
    pages: string;
    pageSize: string;
    type: number; //0===>全部 , 1===>拥有权限的
    keyword: string;
  }
  export interface DynamicMenuItem {
    id: number;
    parentId?: number;
    name: string;
    menuType: number; //菜单类型：1--目录；2-菜单；3-按钮
    state: number; //状态：1-可用；0-不可用
    orderNumber: number; //排序字段
    perms: string; //权限标识
    remark: string | null; //备注
    path: string | null;
    icon: string | null;
    indexId: string;
    children?: DynamicMenuItem[];
  }
}

export namespace Syetem {
  export interface DynamicMenuItem {
    id: number;
    parentId?: number;
    name: string;
    menuType: number; //菜单类型：1--目录；2-菜单；3-按钮
    state: number; //状态：1-可用；0-不可用
    orderNumber: number; //排序字段
    perms: string; //权限标识
    remark: string | null; //备注
    path: string | null;
    icon: string | null;
    indexId: string;
    children?: DynamicMenuItem[];
  }
}
