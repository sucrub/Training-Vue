<script setup>
import router from "@/router";
import {
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  onUpdated,
  ref,
} from "vue";
const count = ref(0);
onBeforeMount(() => {
  // Template được biên dịch, nhưng chưa được vào DOM nên chưa truy cập vào các phần tử được
  alert("On Before Mounted run");
});
onMounted(() => {
  // Template đã được gắn vào DOM, có thể thao tác
  alert("On Mounted run");
});
onBeforeUpdate(() => {
  // Thực hiện trước khi chạy onUpdated, ở đây có thể cập nhật thủ công để tránh vòng lặp update vô hạn
  alert("On Before Update run");
});
onUpdated(() => {
  // Được gọi khi DOM được cập nhật
  alert("On Update run");
});
onBeforeUnmount(() => {
  // Các thành phần chưa bị hủy bỏ hoàn toàn, vẫn có thể thao tác tại đây
  alert("On Before UnMount run");
});
onUnmounted(() => {
  // Các component bị hủy bỏ hoàn toàn
  alert("On Unmounted run");
});

// Ấn để cập nhật giá trị count --> chạy onBeforeUpdate
const addValue = () => {
  count.value++;
};

// Ấn để hiện ra view khác, view hiện tại sẽ mất đi --> chạy onBeforeUnmount
const backHome = () => {
  router.push("/");
};
</script>
<template>
  <h1>Life cycle hook example</h1>
  <br />
  <h1>Value: {{ count }}</h1>
  <br />
  <button @click="addValue">Click</button>
  <br />
  <button @click="backHome">Back home</button>
</template>
