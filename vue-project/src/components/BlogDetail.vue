<template>
  <div class="container mt-4">
    <ConfirmDialog></ConfirmDialog>
    <div v-if="loading" class="text-center">
      <ProgressSpinner />

      <p>Loading blog details...</p>
    </div>

    <div v-else-if="blog" class="blog-detail">
      <div class="mt-4 mb-4">
        <Button
          label="Back to Blog List"
          icon="pi pi-angle-left"
          @click="$router.push('/')"
        />
      </div>

      <Card class="shadow-lg">
        <template #content>
          <h1 class="text-center mb-3">{{ blog.title }}</h1>
          <div class="p-4">
            <p><strong>Author ID:</strong> {{ blog.author }}</p>
            <Divider />
            <p>{{ blog.content }}</p>
          </div>
        </template>
      </Card>
    </div>

    <div v-else class="text-center">
      <h2>Blog not found</h2>
      <p>
        We couldn't find the blog you were looking for. Please try again later.
      </p>
      <Button
        label="Back to Blog List"
        icon="pi pi-arrow-left"
        class="p-button-text"
        @click="$router.push('/')"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getBlogById } from "@/services/api";
import { useAlertStore } from "../utils/AlertStore";

const route = useRoute();
const blog = ref(null);
const loading = ref(true);
const _blogId = ref(null);
const toastAlert = useAlertStore();

onMounted(async () => {
  const blogId = parseInt(route.params.id, 10);

  _blogId.value = blogId;

  try {
    const data = await getBlogById(blogId);
    blog.value = data;
  } catch (error) {
    blog.value = null;
    toastAlert.error("Error", "Something went wrong");
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.blog-detail {
  max-width: 800px;
  margin: 0 auto;
}

.text-center {
  text-align: center;
}

.button-group {
  display: flex;
  gap: 10px;
  justify-content: center;
}
</style>
