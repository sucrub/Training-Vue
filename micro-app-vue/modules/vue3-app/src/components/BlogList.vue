<template>
  <div class="container mt-4">
    <h2 class="text-center mb-4">List of Blog Posts</h2>
    <Button label="Add Blog" @click="openAddDialog" class="mb-4" />
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
                :to="`/web/vue3/blog/${slotProps.data.id}`"
                class="text-decoration-none text-primary"
              >
                {{ slotProps.data.id }}
              </router-link>
            </template>
          </Column>
          <Column field="title" header="Title"></Column>
        </DataTable>
      </template>
    </Card>
    <AddBlogDialog
      v-if="showAddDialog"
      :visible="showAddDialog"
      @closeDialog="closeAddDialog"
    />
  </div>
</template>

<script setup>
import { getBlogs } from "@/service/api";
import { onMounted, ref } from "vue";
import AddBlogDialog from "./AddBlogDialog.vue";

const blogs = ref([]);
const totalRecords = ref(0);
const loading = ref(false);
const page = ref(0);
const limit = ref(10);
const showAddDialog = ref(false);

const openAddDialog = () => {
  showAddDialog.value = true;
};

const closeAddDialog = () => {
  showAddDialog.value = false;
};

const fetchPosts = async (page, limit) => {
  const data = await getBlogs(page.value, limit.value);
  console.log(data);
  blogs.value = data.posts;
  totalRecords.value = data.total;
};

const onPageChange = async (event) => {
  page.value = event.page;
  limit.value = event.rows;
  await fetchPosts(page, limit);
};

onMounted(async () => {
  await fetchPosts(page, limit);
});
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
