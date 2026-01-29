import api from "./api";

export const getCommentsByPost = async (postId) => {
  const response = await api.get(`/comments/${postId}`);
  return response.data;
};

export const createComment = async (postId, content) => {
  const response = await api.post(`/comments/${postId}`, {
    content,
  });
  return response.data;
};
