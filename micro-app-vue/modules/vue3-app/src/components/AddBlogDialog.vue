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
              @click="createData"
            ></Button>
          </div>
        </template>
      </Dialog>
    </div>
  </div>
</template>

<script setup>
import { Dialog, InputText, Textarea } from "primevue";
import { reactive, defineProps, defineEmits, toRaw } from "vue";

const emit = defineEmits(["closeDialog"]);

defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
});

const createData = async () => {
  console.log(toRaw(form));
};

const form = reactive({
  title: "",
  content: "",
});

const closeDialog = () => {
  emit("closeDialog");
};
</script>
