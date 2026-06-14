import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateContent = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("blog");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("Draft");
  const [heroImage, setHeroImage] = useState(null);
  const [imageInput, setImageInput] = useState(null);
  const [blocks, setBlocks] = useState([
    {
      id: Date.now(),
      type: "text",
      variant: "heading",
      value: "",
    },
  ]);

  const handleSubmit = () => {
    const newContent = {
      type,
      title,
      date,
      author,
      status,
      heroImage,
      blocks,
    };

    console.log(newContent);

    alert(`${type} created`);
    navigate("/content");
  };

  return (
    <div className="min-h-screen bg-[#071B3A] p-6 text-white space-y-6">
      <h2 className="text-2xl font-bold">Create Content</h2>

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
            type="file"
            accept="image/*"
            id="hero"
            className="hidden"
            onChange={(e) =>
              setHeroImage(URL.createObjectURL(e.target.files[0]))
            }
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
  text-slate-400
  "
          >
            Upload Hero Image
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

        {/* Author */}
        <div>
          <label className="text-slate-400 uppercase text-sm">AUTHOR</label>

          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author"
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
            <option>Draft</option>
            <option>Published</option>
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
                {block.variant === "paragraph" ? (
                  <ReactQuill
                    theme="snow"
                    value={block.value}
                    onChange={(value) => {
                      const updated = [...blocks];
                      updated[index].value = value;
                      setBlocks(updated);
                    }}
                    className="bg-white text-black rounded-xl"
                  />
                ) : (
                  <textarea
                    rows={block.variant === "heading" ? 2 : 3}
                    value={block.value}
                    onChange={(e) => {
                      const updated = [...blocks];
                      updated[index].value = e.target.value;
                      setBlocks(updated);
                    }}
                    placeholder={
                      block.variant === "heading"
                        ? "Heading..."
                        : "Subheading..."
                    }
                    className={`w-full bg-[#132C58] border border-[#1E3A6D] rounded-2xl p-4 text-white ${
                      block.variant === "heading"
                        ? "text-3xl font-bold"
                        : "text-xl font-semibold"
                    }`}
                  />
                )}
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
                    src={URL.createObjectURL(block.image)}
                    className="rounded-xl max-h-60 object-cover"
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
                          src={URL.createObjectURL(block.images[i2])}
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
                images: [null, null, null, null],
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
        <div
          className="h-[250px] flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: heroImage ? `url(${heroImage})` : "none",
          }}
        >
          <div className="text-center">
            <h1 className="text-4xl font-bold">{title || "Post Title"}</h1>

            <p className="mt-4 text-slate-300">
              {date || "Date"} • {author || "Author"}
            </p>
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
                    <h2 className="text-3xl font-bold">{block.value}</h2>
                  )}

                  {block.variant === "subheading" && (
                    <h3 className="text-xl font-semibold">{block.value}</h3>
                  )}

                  {block.variant === "paragraph" && (
                    <div
                      className="text-slate-300 leading-8"
                      dangerouslySetInnerHTML={{ __html: block.value }}
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
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl w-50 h-11.25"
        >
          DRAFT
        </button>
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl w-50 h-11.25  "
        >
          Publish and Save
        </button>
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white text-center px-6 py-3 rounded-2xl w-50 h-11.25  "
        >
          CANCLE
        </button>
      </div>
    </div>
  );
};

export default CreateContent;
