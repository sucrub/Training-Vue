<template>
  <div id="app">
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <nav>
      <router-link to="/web/vue3">Home</router-link>
      <router-link to="/web/vue3/hello">Hello</router-link>
      <router-link to="/web/vue3/blog">Blog</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>
nav {
  display: flex;
  gap: 16px;
}
</style>
