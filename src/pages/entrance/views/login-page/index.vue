<script lang="ts" setup>
import normalLogo from "@/assets/images/logo_normal.png";
import { phoneNumberVerify } from "@/utils/verify-rules";
import { reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/modules/user";
import { verifyCode_get_url, verifyCode_login_url } from "@/api/modules/login";
import customInput from "@/pages/entrance/components/custom-input/index.vue";
import { FormInstance, FormRules } from "element-plus";

const router = useRouter();
const userStore = useUserStore();

const ruleFormRef = ref<FormInstance>();
const phoneCheck = ref<null | boolean>(null);
const codeCheck = ref<null | boolean>(true);
const formData = reactive({
  phone: "",
  code: ""
});

const handlePhoneCheck = (
  _rules: any,
  value: string,
  callback: (str: Error) => void
) => {
  const passed = phoneNumberVerify(value);
  if (value === "") {
    callback(new Error("手机号不能为空"));
  } else if (!passed) {
    callback(new Error("手机号格式错误"));
  } else {
    phoneCheck.value = true;
  }
};

const handleCodeCheck = (
  _rules: any,
  value: string,
  callback: (str: Error) => void
) => {
  if (value === "") {
    callback(new Error("验证码不能为空"));
  } else if (value.length !== 6 && !codeCheck.value !== true) {
    callback(new Error("验证码错误"));
  }
};

const handleLogin = async () => {
  // const { data } = await verifyCode_login_url({
  //   account: phoneNumber.value,
  //   varificationCode: verifyCode.value
  // });
  // userStore.setToken(data);
  // router.push("/entry");
};

const rules = reactive<FormRules<typeof formData>>({
  phone: [{ validator: handlePhoneCheck, trigger: "blur" }],
  code: [{ validator: handleCodeCheck, trigger: "blur" }]
});
</script>

<template>
  <div class="login-container">
    <el-image style="width: 256px; height: 96px" :src="normalLogo" />
    <el-container>
      <el-header height="68px">登录系统</el-header>
      <el-main>
        <div class="login-qrcodeContent">
          <div class="login-scanTips flex-center">
            <svg-icon
              name="scan"
              class="scan-icon"
              style="width: 21px; height: 21px"
              fill="#08090A"
            />
            <span>实名DID登录</span>
          </div>
          <div class="login-qrcodePrint"></div>
          <p class="login-qrcodeWarn">请使用 <span>DID</span> 扫码登录</p>
          <el-button type="primary" color="#ffffff">刷新二维码</el-button>
        </div>
        <div class="login-formContent">
          <div class="login-formTitle">手机号登录</div>
          <div class="input-verify-box">
            <el-form ref="ruleFormRef" :model="formData" :rules="rules">
              <el-form-item prop="phone">
                <el-input
                  style="width: 100%; height: 54px"
                  maxlength="11"
                  placeholder="请输入手机号"
                  v-model="formData.phone"
                />
              </el-form-item>
              <el-form-item class="code-form" prop="code">
                <el-input
                  style="width: 268px; height: 54px"
                  maxlength="11"
                  placeholder="请输入验证码"
                  v-model="formData.code"
                />
                <el-button class="code-button" color="#F0F4FA" type="info"
                  >获取验证码</el-button
                >
              </el-form-item>
            </el-form>
          </div>
          <el-button
            class="login-button"
            type="primary"
            color="#1A7DFF"
            @click="handleLogin"
          >
            登录
          </el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  min-height: 100%;
  background: url("../../../../assets/images/bg_normal.png") no-repeat center;
  background-size: cover;
  display: flex;
  align-items: center;
  flex-flow: column nowrap;
  overflow: hidden;
}

.el-image {
  margin: 158px 0 32px 0;
}

.el-container {
  width: 720px;
  max-height: 444px;
  background-color: #ffffff;
  border-radius: 20px;
  .el-header {
    font-family: PingFangMedium;
    font-size: 24px;
    color: #08090a;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #ebedf0;
  }
  .el-main {
    height: 356px;
    display: flex;
    flex-flow: row nowrap;
    padding: 0 48px;
    .el-button {
      overflow: hidden;
    }
  }
}

.login-qrcodeContent {
  width: 160px;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  align-items: center;
  padding-right: 32px;
  > .el-button {
    width: 96px;
    height: 40px;
    font-family: PingFangMedium;
    font-size: 16px;
    color: #1a7dff;
    border-radius: 8px;
    border: 1px solid #1a7dff;
  }
  &::after {
    content: "";
    width: 1px;
    height: 240px;
    background-color: #ebedf0;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -56%);
  }
}

.login-scanTips {
  margin-bottom: 18px;
  margin-top: 32px;
  > span {
    font-family: PingFangMedium;
    font-size: 18px;
    color: #08090a;
  }
}

.scan-icon {
  width: 22px;
  height: 22px;
  margin-right: 8px;
}

.login-qrcodePrint {
  width: 160px;
  height: 160px;
}

.login-qrcodeWarn {
  height: 22px;
  font-family: PingFangMedium;
  font-size: 14px;
  color: #525b66;
  line-height: 22px;
  margin-bottom: 18px;
  > span {
    color: #1a7dff;
  }
}

.login-formContent {
  width: calc(100% - 192px);
  height: 100%;
  flex-flow: column nowrap;
  align-items: start;
  margin-left: 32px;
}

.login-formTitle {
  width: 96px;
  height: 38px;
  font-family: PingFangMedium;
  color: #1a7dff;
  font-size: 16px;
  border-bottom: 2px solid #1a7dff;
  text-align: center;
  line-height: 38px;
  margin: 32px 0;
}

.input-verify-box {
  width: 100%;
  :deep(.el-input__wrapper) {
    border-radius: 12px;
    border: 1px solid #e1eaf5;
    padding: 0 16px;
    .el-input__inner {
      font-size: 16px;
      font-family: PingFangMedium;
      color: #08090a;
      border-color: var(borderColor);
      &::placeholder {
        font-family: PingFangRegular;
        color: #7a8799;
      }
    }
  }
}

.code-form {
  margin-bottom: 32px;
}

.code-button {
  height: 100%;
  width: auto;
  color: #08090a;
  font-family: PingFangMedium;
  min-width: 120px;
  border-radius: 12px;
  margin-left: 12px;
}

.login-button {
  width: 100%;
  height: 56px;
  font-family: PingFangMedium;
  font-size: 16px;
  color: #ffffff;
  font-size: 18px;
  border-radius: 12px;
}
</style>
