<script setup lang="ts">
import "./assets/App.css";
import AddNewAccount from "./components/AddNewAccount.vue";
import Alert from "./components/Alert.vue";
import Form from "./components/Form.vue";
</script>

<template>
  <div class="app__content">
    <AddNewAccount />
    <Alert />
    <Form />
  </div>
</template>
