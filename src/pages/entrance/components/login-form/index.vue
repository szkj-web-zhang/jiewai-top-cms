<script lang="ts" setup>
import { computed, inject, reactive, ref, unref } from "vue";
import { FormInstance, FormRules } from "element-plus";
import { phoneNumberVerify } from "@/utils/verify-rules";
import { useCountDown } from "@/hooks/useCountDown";
import { verifyCode_get_url } from "@/api/modules/login";
import { LoginData } from "../../views/login-page/index.vue";

// 手机号校验结果
const phoneCheck = ref<boolean | null>(null);
// 验证码校验结果
const codeCheck = ref<boolean | null>(null);
// ref
const formRef = ref<FormInstance>();
// 接收父组件的传递值
const formData = inject("formData") as LoginData;
const activeTab = inject("activeTab");
// 倒计时hook
const { isStart, currentCount, handleStartTimer } = useCountDown(60);
// 计算验证码button的text
const buttonText = computed(() => {
  return !unref(isStart) ? "获取验证码" : `重新发送(${unref(currentCount)}s)`;
});
// 计算验证码button的颜色
const colorStyle = computed(() => {
  return { color: `${!unref(isStart) ? "#08090a" : "#A3B5CC"}` };
});

// 获取验证码
const handleGetCode = async () => {
  // 调用接口之前对phone校验
  if (!formRef.value) return;
  formRef.value.validateField("phone").catch(() => {
    phoneCheck.value = false;
  });
  if (phoneCheck.value === true) {
    handleStartTimer();
    await verifyCode_get_url({
      account: formData.phone,
      state: 2
    });
  }
};

// 校验手机号
const handlePhoneCheck = (
  _rule,
  value: string,
  callback: (str: Error) => void
) => {
  const passed = phoneNumberVerify(value);
  if (value === "" || !passed) {
    callback(new Error("请输入正确的手机号"));
    phoneCheck.value = false;
  } else {
    phoneCheck.value = true;
  }
};

// 对验证码格式验证
const handleCodeCheck = (
  _rule,
  value: string,
  callback: (str: Error) => void
) => {
  if (value === "") {
    callback(new Error("验证码不能为空"));
  } else if (value.length !== 6) {
    callback(new Error("验证码错误"));
  }
};

// 对密码进行校验
const handlePasswordCheck = (
  _rule,
  value: string,
  callback: (str: Error) => void
) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  }
};

// form的自定义规则
const rules = reactive<FormRules<typeof formData>>({
  phone: [{ validator: handlePhoneCheck, trigger: "blur" }],
  code: [{ validator: handleCodeCheck, trigger: "blur" }],
  password: [{ validator: handlePasswordCheck, trigger: "blur" }]
});
</script>

<template>
  <el-form :model="formData" :rules="rules" ref="formRef">
    <el-form-item prop="phone">
      <el-input
        style="width: 100%; height: 54px"
        maxlength="11"
        placeholder="请输入手机号"
        v-model="formData.phone"
      />
    </el-form-item>
    <el-form-item prop="code" v-if="activeTab === 'code'">
      <el-input
        style="width: 268px; height: 54px"
        maxlength="6"
        placeholder="请输入验证码"
        v-model="formData.code"
      />
      <el-button
        class="code-button"
        color="#F0F4FA"
        type="info"
        :style="colorStyle"
        :disabled="isStart"
        @click="handleGetCode"
      >
        {{ buttonText }}
      </el-button>
    </el-form-item>
    <el-form-item prop="code" v-else>
      <el-input
        style="width: 100%; height: 54px"
        type="password"
        placeholder="请输入密码"
        v-model="formData.password"
      />
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
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

.code-button {
  height: 100%;
  width: auto;
  color: #08090a;
  font-family: PingFangMedium;
  min-width: 120px;
  border-radius: 12px;
  margin-left: 12px;
}
</style>
