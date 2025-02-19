<template>
  <div class="container mt-4">
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
          <div class="p-4">
            <div class="d-flex align-items-center gap-3 mb-3">
              <label for="author" class="fw-semibold w-25">Author name</label>
              <InputText
                id="author"
                v-model="blog.author"
                class="flex-grow-1 form-control"
                autocomplete="off"
                :invalid="!blog.author"
              />
            </div>
            <Divider />
            <div class="d-flex align-items-center gap-3 mb-3">
              <label for="title" class="fw-semibold w-25">Title</label>
              <InputText
                id="title"
                v-model="blog.title"
                class="flex-grow-1 form-control"
                autocomplete="off"
                :invalid="!blog.title"
              />
            </div>
            <Divider />
            <div class="d-flex align-items-center gap-3 mb-3">
              <label for="content" class="fw-semibold w-25">Content</label>
              <Textarea
                id="content"
                v-model="blog.content"
                class="flex-grow-1 form-control"
                autocomplete="off"
              />
            </div>
          </div>
        </template>
      </Card>

      <div class="button-group mt-4 mb-4">
        <Button label="Update" severity="info" @click="updateBlogDialog" />
      </div>
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
import { deleteBlog, getBlogById, updateBlog } from "@/services/api";
import { useConfirm } from "primevue/useconfirm";
import { useRouter } from "vue-router";
import { useAlertStore } from "../utils/AlertStore";
import * as Yup from "yup";

const confirm = useConfirm();

const route = useRoute();
const router = useRouter();
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

const updateBlogDialog = () => {
  confirm.require({
    message: "Do you want to update this blog?",
    header: "Update Blog",
    icon: "pi pi-info-circle",
    rejectLabel: "Cancel",
    rejectProps: {
      label: "Cancel",
      severity: "secondary",
      outlined: true,
    },
    acceptProps: {
      label: "Save",
      severity: "info",
    },
    accept: async () => {
      const schema = Yup.object().shape({
        author: Yup.string().required("Author is required."),
        title: Yup.string().required("Title is required."),
        content: Yup.string(),
      });

      try {
        const params = {
          author: blog.value.author,
          title: blog.value.title,
          content: blog.value.content,
        };
        const updateBlogId = blog.value.id;

        schema.validate(params, { abortEarly: false });

        const data = await updateBlog(updateBlogId, params);

        if (data)
          toastAlert.success("Update Success", "Update blog successfully");
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errorMessages = error.inner
            .map((err) => `${err.message}`)
            .join("\n");

          toastAlert.error("Validation Error", errorMessages);
        } else {
          toastAlert.error("Error", "Something went wrong");
        }
      }
    },
    reject: () => {},
  });
};
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
