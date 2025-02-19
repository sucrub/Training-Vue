<template>
  <div class="container" ref="root">
    <p>{{ val }} : editor {{ count }} times</p>
    <button @click="val = Math.random(0, 100)">Click to Change</button>
  </div>
</template>

<script>
import { ref, onUpdated, onBeforeUpdate } from "vue";

export default {
  setup() {
    const count = ref(0);
    const val = ref(0);
    onBeforeUpdate(() => {
      alert("Before update");
      count.value += 1; // make change to the value without activate the update state
      console.log(count.value);
      console.log(val.value);
    });
    onUpdated(() => {
      alert("Updated");
      console.log(val.value);
    });
    return {
      count,
      val,
    };
  },
};
</script>
