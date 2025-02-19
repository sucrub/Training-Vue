<template>
  <div class="container mt-4">
    <h2 class="text-center mb-4">List of Blog Posts</h2>
    <Button label="Add Blog" @click="openDialog" class="mb-4" />
    <Card>
      <template #content>
        <DataTable
          lazy
          :value="blogs"
          :paginator="true"
          :rows="5"
          tableStyle="min-width: 50rem"
          :totalRecords="totalRecords"
          @page="onPageChange"
          :loading="loading"
        >
          <Column header="ID">
            <template #body="slotProps">
              <router-link
                :to="`/blog/${slotProps.data.id}`"
                class="text-decoration-none text-primary"
              >
                {{ slotProps.data.id }}
              </router-link>
            </template>
          </Column>
          <Column field="author" header="Author"></Column>
          <Column field="title" header="Title"></Column>
          <Column header="Action">
            <template #body="slotProps">
              <Button
                label="Update"
                severity="info"
                class="me-2"
                @click="navigateUpdate(slotProps.data.id)"
              />

              <Button
                label="Delete"
                severity="danger"
                @click="deleteBlogDialog(slotProps.data.id)"
              />
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
    <AddBlogDialog
      v-if="showAddDialog"
      :visible="showAddDialog"
      @closeDialog="closeDialog"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { deleteBlog, getBlogs } from "@/services/api";
import AddBlogDialog from "./AddBlogDialog.vue";
import { useAlertStore } from "@/utils/AlertStore";
import { useConfirm } from "primevue";
import { useRouter } from "vue-router";

const blogs = ref([]);
const showAddDialog = ref(false);
const page = ref(0);
const limit = ref(5);
const totalRecords = ref(0);
const toastAlert = useAlertStore();
const confirm = useConfirm();
const loading = ref(false);
const router = useRouter();

const fetchBlogs = async (page, limit) => {
  loading.value = true;
  try {
    const data = await getBlogs(page, limit);
    blogs.value = data?.blogs;
    totalRecords.value = data?.totalItems;
  } catch (error) {
    toastAlert.error("Error", "Something went wrong");
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await fetchBlogs(page.value, limit.value);
});

const onPageChange = async (event) => {
  page.value = event.page;
  limit.value = event.rows;
  await fetchBlogs(page.value, limit.value);
};

const openDialog = () => {
  showAddDialog.value = true;
};

const closeDialog = () => {
  showAddDialog.value = false;
};

const navigateUpdate = (id) => {
  router.push(`/blog/edit/${id}`);
};

const deleteBlogDialog = (id) => {
  confirm.require({
    message: "Do you want to delete this blog?",
    header: "Danger Zone",
    icon: "pi pi-info-circle",
    rejectLabel: "Cancel",
    rejectProps: {
      label: "Cancel",
      severity: "secondary",
      outlined: true,
    },
    acceptProps: {
      label: "Delete",
      severity: "danger",
    },
    accept: async () => {
      try {
        const data = await deleteBlog(id);
        if (data) {
          toastAlert.success("Confirmed", data.message);
          await fetchBlogs(page.value, limit.value);
        }
      } catch (error) {
        toastAlert.error("Error", error.response.data.message);
      }
    },
  });
};
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
}

.card {
  padding: 20px;
}

.text-center {
  text-align: center;
}
</style>
