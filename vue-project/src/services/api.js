import axios from "axios";

const getBlogs = async (page, limit) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/blogs?page=${page}&limit=${limit}`
    );
    if (res.data) return res.data;
    else throw new Error("Something wrong with the response");
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getBlogById = async (id) => {
  try {
    const res = await axios.get(`http://localhost:8080/blogs/${id}`);
    if (res.data) return res.data;
    else throw new Error("Something wrong with the response");
  } catch (error) {
    console.error(error);
    return null;
  }
};

const createBlog = async (blog) => {
  try {
    const res = await axios.post("http://localhost:8080/blogs", blog);
    if (res.data) return res.data;
    else throw new Error("Something wrong with the response");
  } catch (error) {
    console.error(error);
    return null;
  }
};

const deleteBlog = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:8080/blogs/${id}`);
    if (res.data) return res.data;
    else throw new Error("Something wrong with the response");
  } catch (error) {
    console.error(error);
    return null;
  }
};

const updateBlog = async (id, blog) => {
  try {
    const res = await axios.put(`http://localhost:8080/blogs/${id}`, blog);
    if (res.data) return res.data;
    else throw new Error("Something wrong with the response");
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { getBlogs, getBlogById, createBlog, deleteBlog, updateBlog };
