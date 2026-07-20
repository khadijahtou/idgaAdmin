import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { uploadSingleImage } from "../../services/uploadService";
import RichTextEditor from "../../components/RichTextEditor";
import { useParams } from "react-router-dom";

const CreateContent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [type, setType] = useState("blog");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const [status, setStatus] = useState("draft");
  const [heroImage, setHeroImage] = useState(null);

  const [blocks, setBlocks] = useState([
    {
      id: Date.now(),
      type: "text",
      variant: "heading",
      value: "",
    },
  ]);
  useEffect(() => {
    if (!id) return;

    const fetchContent = async () => {
      try {
        const res = await api.get(`/content/id/${id}`);

        const item = res.data.content;

        setTitle(item.title);
        setType(item.type);
        setStatus(item.status);
        setHeroImage(item.heroImage);

        if (item.publishedAt) {
          setDate(item.publishedAt.split("T")[0]);
        }

        setBlocks(
          item.blocks.map((block, index) => ({
            id: index + Date.now(),
            type: block.type,
            variant: block.variant || "paragraph",
            value: block.content || "",
            image: block.image || null,
            images: block.gallery || [],
          })),
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchContent();
  }, [id]);
  const handleHeroImage = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const image = await uploadSingleImage(file);

      setHeroImage({
        url: image.url,
        publicId: image.publicId,
        alt: file.name,
      });
    } catch (error) {
      console.error(error);
      alert("Hero image upload failed.");
    }
  };
  const handleSubmit = async (publishStatus) => {
    try {
      const formattedBlocks = blocks.map((block) => {
        if (block.type === "text") {
          return {
            type: "text",
            content: block.value,
          };
        }

        if (block.type === "image") {
          return {
            type: "image",
            image: block.image,
          };
        }

        if (block.type === "gallery") {
          return {
            type: "gallery",
            gallery: block.gallery,
          };
        }

        return block;
      });

      const newContent = {
        title,
        type,
        status: publishStatus,
        heroImage,
        blocks: formattedBlocks,

        excerpt: "",
        category: [],
        tags: [],
        featured: false,

        seoTitle: "",
        seoDescription: "",
        seoKeywords: [],
      };

      const response = id
        ? await api.put(`/content/${id}`, newContent)
        : await api.post("/content", newContent);

      alert(response.data.message);

      navigate("/content");
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Failed to create content.");
    }
  };
  return (
    <div className="min-h-screen bg-[#071B3A] p-6 text-white space-y-6">
      {/* TYPE */}
      <select
        className="w-full bg-[#132C58] border border-[#1E3A6D] p-3 rounded-2xl"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="blog">Blog</option>
        <option value="project">Project</option>
      </select>
      {/* TITLE */}
      <div>
        <label className="text-slate-400 uppercase text-sm">TITLE *</label>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title..."
          className="mt-3 w-full bg-[#132C58] border border-[#1E3A6D] rounded-2xl px-5 py-4 outline-none"
        />
      </div>
      {/* META */}
      <div className="grid md:grid-cols-4 gap-4">
        {/* Hero Image */}
        <div>
          <label className="text-slate-400 uppercase text-sm">HERO IMAGE</label>

          <input
            id="hero"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleHeroImage}
          />

          <label
            htmlFor="hero"
            className="
      mt-3
      flex
      items-center
      justify-center
      h-40
      rounded-2xl
      bg-[#132C58]
      border border-dashed border-[#1E3A6D]
      cursor-pointer
      overflow-hidden
    "
          >
            {heroImage ? (
              <img
                src={heroImage.url}
                alt={heroImage.alt}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-slate-400">Upload Hero Image</span>
            )}
          </label>
        </div>

        {/* Date */}
        <div>
          <label className="text-slate-400 uppercase text-sm">DATE</label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-3 w-full bg-[#132C58] border border-[#1E3A6D] rounded-2xl px-5 py-4"
          />
        </div>

        {/* Status */}
        <div>
          <label className="text-slate-400 uppercase text-sm">STATUS</label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-3 w-full bg-[#132C58] border border-[#1E3A6D] rounded-2xl px-5 py-4"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>
      {/* CONTENT BLOCKS */}
      <div className="space-y-4 mt-6">
        {blocks.map((block, index) => (
          <div
            key={block.id}
            className="bg-[#0D2348] border border-[#1E3A6D] rounded-3xl p-5 relative"
          >
            {/* DELETE BLOCK */}
            <button
              onClick={() =>
                setBlocks((prev) => prev.filter((b) => b.id !== block.id))
              }
              className="absolute top-2 right-2 text-white bg-red-500 px-2 py-1 rounded-md text-xs"
            >
              Delete
            </button>

            {/* TEXT BLOCK */}
            {block.type === "text" && (
              <div>
                {/* TEXT TYPE SELECTOR */}
                <select
                  value={block.variant}
                  onChange={(e) => {
                    const updated = [...blocks];
                    updated[index].variant = e.target.value;
                    setBlocks(updated);
                  }}
                  className="mb-3 bg-[#132C58] border border-[#1E3A6D] rounded-xl p-2 text-white"
                >
                  <option value="heading">Heading</option>
                  <option value="subheading">Subheading</option>
                  <option value="paragraph">Paragraph</option>
                </select>

                {/* TEXT INPUT */}
                {/* TEXT INPUT */}
                <RichTextEditor
                  value={block.value}
                  onChange={(content) => {
                    const updated = [...blocks];
                    updated[index].value = content;
                    setBlocks(updated);
                  }}
                />
              </div>
            )}

            {/* IMAGE BLOCK */}
            {block.type === "image" && (
              <div className="space-y-3">
                <p className="text-slate-400 text-sm">
                  Click to upload an image
                </p>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];

                    setBlocks((prev) =>
                      prev.map((b, i) =>
                        i === index ? { ...b, image: file } : b,
                      ),
                    );
                  }}
                  className="text-white"
                />

                {/* PLACEHOLDER UI */}
                {!block.image && (
                  <div className="h-40 flex items-center justify-center border border-dashed border-[#1E3A6D] rounded-xl text-slate-500">
                    Image Preview Area
                  </div>
                )}

                {/* PREVIEW */}
                {block.image && (
                  <img
                    src={
                      block.image instanceof File
                        ? URL.createObjectURL(block.image)
                        : block.image.url || block.image
                    }
                    className="rounded-2xl w-full object-cover"
                  />
                )}
              </div>
            )}

            {/* GALLERY BLOCK */}
            {block.type === "gallery" && (
              <div className="space-y-3">
                <p className="text-slate-400 text-sm">Upload gallery images</p>

                <div className="grid grid-cols-2 gap-3">
                  {block.images.map((img, i2) => (
                    <div key={i2}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];

                          setBlocks((prev) =>
                            prev.map((b, i) => {
                              if (i !== index) return b;

                              const newImages = [...b.images];
                              newImages[i2] = file;

                              return {
                                ...b,
                                images: newImages,
                              };
                            }),
                          );
                        }}
                        className="text-white"
                      />

                      {/* PREVIEW */}
                      {block.images[i2] && (
                        <img
                          src={
                            img instanceof File
                              ? URL.createObjectURL(img)
                              : img.url || img
                          }
                          className="mt-2 rounded-xl max-h-32 object-cover"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* ADD BUTTONS */}
      <div className="flex gap-4 flex-wrap">
        <button
          onClick={() =>
            setBlocks((prev) => [
              ...prev,
              {
                id: Date.now(),
                type: "text",
                value: "",
              },
            ])
          }
          className="px-6 py-3 rounded-2xl bg-slate-700"
        >
          Add Text
        </button>

        <button
          onClick={() =>
            setBlocks((prev) => [
              ...prev,
              {
                id: Date.now(),
                type: "image",
                image: null,
              },
            ])
          }
          className="px-6 py-3 rounded-2xl bg-slate-700"
        >
          Add Image
        </button>

        <button
          onClick={() =>
            setBlocks((prev) => [
              ...prev,
              {
                id: Date.now(),
                type: "gallery",
                images: [null, null, null],
              },
            ])
          }
          className="px-6 py-3 rounded-2xl bg-yellow-500 text-black"
        >
          Add Gallery
        </button>
      </div>
      {/* LIVE PREVIEW */}
      <div className="sticky top-6 bg-[#0D2348] rounded-3xl overflow-hidden border border-[#1E3A6D]">
        {/* Hero Section */}
        <div className="relative h-125 overflow-hidden rounded-3xl">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: heroImage ? `url(${heroImage.url})` : "none",
            }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-[#071B3A]/85 via-[#071B3A]/60 to-[#071B3A]/80" />

          {/* Content */}
          <div className="relative z-10 flex h-full items-center justify-center text-center px-6">
            <div>
              <h1 className="max-w-5xl mx-auto text-5xl lg:text-6xl font-bold leading-tight">
                {title || "Post Title"}
              </h1>

              <p className="mt-4 text-slate-300">{date || "Date"}</p>
            </div>
          </div>
        </div>

        {/* Content Preview */}
        <div className="p-8 space-y-6">
          {blocks.map((block) => (
            <div key={block.id}>
              {/* TEXT BLOCK */}
              {block.type === "text" && (
                <>
                  {block.variant === "heading" && (
                    <div
                      className="text-3xl font-bold"
                      dangerouslySetInnerHTML={{
                        __html: block.value,
                      }}
                    />
                  )}

                  {block.variant === "subheading" && (
                    <div
                      className="text-xl font-semibold"
                      dangerouslySetInnerHTML={{
                        __html: block.value,
                      }}
                    />
                  )}

                  {block.variant === "paragraph" && (
                    <div
                      className="
    text-slate-300
    leading-8
    [&_ul]:list-disc
    [&_ul]:ml-6
    [&_ol]:list-decimal
    [&_ol]:ml-6
    [&_li]:mb-2
  "
                      dangerouslySetInnerHTML={{
                        __html: block.value,
                      }}
                    />
                  )}
                </>
              )}

              {/* IMAGE BLOCK */}
              {block.type === "image" && block.image && (
                <img
                  src={URL.createObjectURL(block.image)}
                  className="rounded-2xl w-full object-cover"
                />
              )}

              {/* GALLERY BLOCK */}
              {block.type === "gallery" && (
                <div className="grid grid-cols-2 gap-4">
                  {block.images.map(
                    (img, index) =>
                      img && (
                        <img
                          key={index}
                          src={URL.createObjectURL(img)}
                          className="rounded-xl h-48 w-full object-cover"
                        />
                      ),
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* SAVE BUTTON */}
      <div className="flex justify-end gap-4 mt-8">
        <button
          onClick={() => navigate("/content")}
          className="border border-slate-500 hover:bg-slate-700 text-white px-6 py-3 rounded-2xl w-50 h-11.25 transition"
        >
          Cancel
        </button>

        <button
          onClick={() => handleSubmit("draft")}
          className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-2xl w-50 h-11.25 transition"
        >
          {id ? "Update Draft" : "Save Draft"}
        </button>

        <button
          onClick={() => handleSubmit("published")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl w-50 h-11.25 transition"
        >
          {id ? "Update" : "Publish"}
        </button>
      </div>
    </div>
  );
};

export default CreateContent;
