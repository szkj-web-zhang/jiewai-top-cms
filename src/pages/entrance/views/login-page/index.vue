<script lang="ts" setup>
import normalLogo from "@/assets/images/logo_normal.png";
import { phoneNumberVerify } from "@/utils/verify-rules";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/modules/user";

const userStore = useUserStore();
const router = useRouter();
const phoneNumber = ref("");
const verifyCode = ref("");
const phoneCheck = ref<boolean | null>(null);
const second = ref<number>(0);

const handlePhoneVerify = () => {
  const res = phoneNumberVerify(phoneNumber.value);
  if (res || !!phoneNumber.value) phoneCheck.value = res;
};

const handleStartTimer = () => {
  second.value = 60;
  const timer = setInterval(() => {
    if (second.value > 0) {
      second.value--;
    } else {
      clearInterval(timer);
    }
  }, 1000);
};

const handleLogin = () => {
  userStore.setToken("123");
  router.push("/entry");
};
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
          <el-input
            style="color: #fff"
            placeholder="请输入手机号"
            maxlength="11"
            v-model.number="phoneNumber"
            @blur="handlePhoneVerify"
          />
          {{ phoneCheck }}
          <div class="login-verifyContent flex-justify-between">
            <el-input
              placeholder="请输入验证码"
              maxlength="6"
              v-model.number="verifyCode"
            />
            <el-button
              color="#F0F4FA"
              :disabled="second > 0"
              type="info"
              @click="handleStartTimer"
              >{{ second > 0 ? `重新发送(${second}s)` : "获取验证码" }}
            </el-button>
          </div>
          <el-button
            class="login-button"
            type="primary"
            color="#1A7DFF"
            @click="handleLogin"
            >登录</el-button
          >
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
@import "./style.scss";
</style>
