<script lang="ts" setup>
import normalLogo from "@/assets/images/logo_normal.png";
import { TabsPaneContext } from "element-plus";
import { provide, reactive, ref } from "vue";
import methodTab from "~/entrance/components/method-tab/index.vue";
import loginForm from "~/entrance/components/login-form/index.vue";
import {
  password_login_url,
  user_info_get,
  verifyCode_login_url
} from "@/api/modules/login";
import { useUserStore } from "@/stores/modules/user";
import { useRouter } from "vue-router";
export interface LoginData {
  phone: string;
  code: string;
  password: string;
}

const router = useRouter();
// token and user
const userStore = useUserStore();
// 默认的tab
const defaultTab = ref("code");
// 激活的tab
const activeTab = ref("code");
// 验证码登录入口数据
const formData = reactive<LoginData>({
  phone: "",
  code: "",
  password: ""
});
const loading = ref(false);

// 输入透传给el-form
provide("formData", formData);
provide("activeTab", activeTab);

// 切换tab
const handleTabClick = (tab: TabsPaneContext) => {
  activeTab.value = tab.paneName as string;
  formData.code = "";
  formData.phone = "";
  formData.password = "";
};

// 获取用户信息
const handleGetUserInfo = async () => {
  const res = await user_info_get();
  if (res.code === 200) {
    userStore.setUserInfo(res.data);
    router.push("/entry");
  }
};

// 用户验证码登录
const handleCodeLogin = async () => {
  const params = { account: formData.phone, varificationCode: formData.code };
  loading.value = true;
  try {
    const res = await verifyCode_login_url(params);
    if (res.code === 200) {
      userStore.setToken(res.data as string);
      handleGetUserInfo();
    }
  } catch (error) {
  } finally {
    loading.value = false;
  }
};

// 用户账户密码登录
const handlePasswordLogin = async () => {
  const params = { account: formData.phone, password: formData.password };
  try {
    const res = await password_login_url(params);
    if (res.code === 200) {
      userStore.setToken(res.data as string);
      handleGetUserInfo();
    }
  } catch (error) {
  } finally {
    loading.value = false;
  }
};

// 根据tab选择登录方式
const handleLogin = async () => {
  if (activeTab.value === "code") handleCodeLogin();
  else handlePasswordLogin();
};
</script>

<template>
  <div class="login-container">
    <div class="login-center-box">
      <el-image :src="normalLogo" />
      <div class="login-inner-box">
        <p class="inner-title">登陆系统</p>
        <el-row>
          <el-col :span="8" class="inner-qrcode">
            <div class="qrcode-title flex-center">
              <svg-icon
                name="scan"
                style="width: 21px; height: 21px"
                fill="#08090A"
              />
              <span>实名DID登录</span>
            </div>
            <div class="qrcode-print"></div>
            <p class="qrcode-footer">请使用 <span>DID</span> 扫码登录</p>
            <el-button type="primary" plain>刷新二维码</el-button>
          </el-col>
          <el-col :span="16" class="inner-form">
            <method-tab v-model="defaultTab" @tab-click="handleTabClick">
              <template #code v-if="activeTab === 'code'">
                <login-form key="code" />
              </template>
              <template #password v-else>
                <login-form key="password" />
              </template>
            </method-tab>
            <el-button
              class="login-button"
              color="#1a7dff"
              type="primary"
              :loading="loading"
              @click="handleLogin"
            >
              登录
            </el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  min-height: 100%;
  background: url("../../../../assets/images/bg_normal.png") no-repeat center;
  background-size: cover;
  overflow: hidden;
  position: relative;
}

.login-center-box {
  width: 720px;
  min-height: 572px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 158px;
  left: 50%;
  transform: translate(-50%, 0);
  .el-image {
    width: 256px;
    height: 96px;
  }
}

.login-inner-box {
  width: 100%;
  min-height: 444px;
  height: 444px;
  background-color: #ffffff;
  box-shadow: 0px 0px 20px 0px rgba(26, 125, 255, 0.08);
  border-radius: 20px;
  > p {
    width: 100%;
    height: 68px;
    font-family: PingFangMedium;
    font-size: 24px;
    color: #08090a;
    border-bottom: 1px solid #ebedf0;
    line-height: 68px;
    text-align: center;
  }
}

.el-row {
  width: 100%;
  height: calc(100% - 69px);
  padding: 32px 48px 20px 16px;
}

.inner-qrcode {
  text-align: center;
  position: relative;
  &::after {
    content: "";
    width: 1px;
    height: 240px;
    background-color: #ebedf0;
    position: absolute;
    top: 32px;
    right: 0;
  }
  .el-button {
    width: auto;
    height: 40px;
    font-family: PingFangMedium;
    font-size: 16px;
    color: #1a7dff;
    border-radius: 8px;
    background-color: #ffffff;
    transition: all 0.2s;
    &:hover {
      background-color: #c6e2ff;
    }
  }
}

.qrcode-title {
  height: 26px;
  margin-bottom: 18px;
  > span {
    font-family: PingFangMedium;
    font-size: 18px;
    color: #08090a;
    margin-left: 8px;
  }
}

.qrcode-print {
  width: 160px;
  height: 160px;
}

.qrcode-footer {
  height: 22px;
  font-family: PingFangMedium;
  font-size: 14px;
  color: #525b66;
  line-height: 22px;
  text-align: center;
  margin: 8px 0 18px 0;
  > span {
    color: #1a7dff;
  }
}

.inner-form {
  padding-left: 32px;
  :deep(.el-tabs__nav-wrap) {
    &::after {
      background-color: #ffffff !important;
    }
  }
  :deep(.el-tabs__item) {
    color: #08090a;
    font-size: 16px;
    font-family: PingFangMedium;
    &.is-active {
      color: #1a7dff;
      font-size: 16px;
      font-family: PingFangMedium;
    }
  }
  :deep(.el-tabs__header) {
    margin-bottom: 32px !important;
  }
}

.login-button {
  width: 100%;
  height: 56px;
  color: #ffffff;
  font-family: PingFangMedium;
  font-size: 18px;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 32px;
}
</style>
