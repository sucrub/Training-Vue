<template>
  <div class="d-flex justify-content-center">
    <div class="card p-4">
      <Dialog
        :visible="visible"
        :modal="true"
        header="Add Blog"
        maximizable
        :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        @update:visible="emit('closeDialog')"
      >
        <div class="d-flex align-items-center gap-3 mb-3">
          <label for="author" class="fw-semibold w-25">Author name</label>
          <InputText
            id="author"
            v-model="form.author"
            class="flex-grow-1 form-control"
            autocomplete="off"
            :invalid="!form.author"
          />
        </div>
        <div class="d-flex align-items-center gap-3 mb-3">
          <label for="title" class="fw-semibold w-25">Title</label>
          <InputText
            id="title"
            v-model="form.title"
            class="flex-grow-1 form-control"
            autocomplete="off"
            :invalid="!form.title"
          />
        </div>
        <div class="d-flex align-items-center gap-3 mb-3">
          <label for="content" class="fw-semibold w-25">Content</label>
          <Textarea
            id="content"
            v-model="form.content"
            class="flex-grow-1 form-control"
            autocomplete="off"
          />
        </div>
        <template #footer>
          <div class="d-flex justify-content-end gap-2">
            <Button
              type="button"
              label="Cancel"
              severity="danger"
              @click="closeDialog"
            ></Button>
            <Button
              type="button"
              label="Save"
              severity="success"
              @click="saveData"
            ></Button>
          </div>
        </template>
      </Dialog>
    </div>
  </div>
</template>

<script setup>
import { createBlog } from "@/services/api";
import { useAlertStore } from "@/utils/AlertStore";
import { reactive, toRaw } from "vue";
import { useRouter } from "vue-router";
import * as Yup from "yup";

const emit = defineEmits(["closeDialog"]);
const router = useRouter();
const toastAlert = useAlertStore();

defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
});

const form = reactive({
  author: "",
  title: "",
  content: "",
});

// onBeforeUnmount(() => {
//   alert("onBeforeUnmount");
// });

// onUnmounted(() => {
//   alert("onUnmounted");
// });

const saveData = async () => {
  const schema = Yup.object().shape({
    author: Yup.string().required("Author is required."),
    title: Yup.string().required("Title is required."),
    content: Yup.string(),
  });

  try {
    schema.validate(toRaw(form), { abortEarly: false });
    const data = await createBlog(toRaw(form));

    if (data) {
      router.push(`/blog/${data.id}`);
      closeDialog();
    }
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      const errorMessages = error.inner
        .map((err) => `${err.message}`)
        .join("\n");

      toastAlert.error("Validation Error", errorMessages);
    } else {
      toastAlert.error(
        "Error",
        error.response?.data?.message || "An unexpected error occurred."
      );
    }
  }
};

const closeDialog = () => {
  emit("closeDialog");
};
</script>
