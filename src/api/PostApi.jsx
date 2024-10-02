import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// get methode
export const getPost = () => {
  return api.get("/posts");
};

// delete methode
export const deletePost = (id) => {
  return api.delete(`/posts/${id}`);
};

// Post methode
export const postDataApi = (post) => {
  return api.post("/posts", post);
};

// put methode

export const updateData = (id,post)=>{
  return api.put(`/posts/${id}`,post)
}