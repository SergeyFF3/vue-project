<template>
  <el-input
    v-model="passwordValue"
    :type="isVisible ? 'text' : 'password'"
    placeholder="Введите пароль"
  >
    <template #suffix>
      <el-icon class="icon" :size="20" @click="toggleVisibility">
        <component :is="isVisible ? View : Hide" />
      </el-icon>
    </template>
  </el-input>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from "vue";
import { View, Hide } from "@element-plus/icons-vue";

const { modelValue } = defineProps<{ modelValue: string | null }>();
const emit = defineEmits<{ (e: "update:modelValue", value: string): void }>();

const passwordValue = ref(modelValue);
const isVisible = ref(false);

const toggleVisibility = () => {
  isVisible.value = !isVisible.value;
};

watch(passwordValue, (newValue) => {
  if (typeof newValue === "string") {
    emit("update:modelValue", newValue);
  }
});

watch(
  () => modelValue,
  (newValue) => {
    passwordValue.value = newValue ?? "";
  }
);
</script>

<style scoped>
.icon {
  cursor: pointer;
}
</style>
