import api from "../api/axios";

export const uploadSingleImage = async (file, folder = "idga") => {
  const formData = new FormData();

  formData.append("image", file);
  formData.append("folder", folder);

  const res = await api.post("/uploads/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.image;
};

export const uploadGalleryImages = async (files, folder = "idga") => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("images", file);
  });

  formData.append("folder", folder);

  const res = await api.post("/uploads/gallery", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.images;
};
