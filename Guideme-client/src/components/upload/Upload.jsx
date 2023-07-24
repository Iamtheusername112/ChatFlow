// import React from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useState } from "react";

function Upload() {
  const [state, setState] = useState({});
  const [photo, setPhoto] = useState("");
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleState = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();

    try {
      let filename = null;

      if (photo) {
        const formData = new FormData();
        filename = crypto.randomUUID() + photo.name;
        formData.append("filename", filename);
        formData.append("image", photo);

        await fetch(`http://localhost:3000/upload/image`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
          body: formData,
        });
      }

      const res = await fetch(`http://localhost:3000/post`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify({ ...state, photo: filename }),
      });
      const data = await res.json();
      console.log(data);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px] bg-white">
          <form
            onSubmit={handleCreatePost}
            className="py-6 px-9"
            action="https://formbold.com/s/FORM_ID"
            method="POST"
          >
            <div className="mb-5">
              <label
                htmlFor="title"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Title:
              </label>
              <input
                type="title"
                name="title"
                id="title"
                placeholder="title"
                onChange={handleState}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="description"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Description:
              </label>
              <input
                type="description"
                name="description"
                id="description"
                placeholder="description"
                onChange={handleState}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="location"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Location:
              </label>
              <input
                type="location"
                name="location"
                id="location"
                placeholder="location"
                onChange={handleState}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-6 pt-4">
              <label className="mb-5 block text-xl cursor-pointer font-semibold text-[#07074D]">
                Upload photo
              </label>

              <div className="mb-8">
                <input
                  type="file"
                  name="photo"
                  id="photo"
                  className="sr-only"
                  style={{ display: "none" }}
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
                <label
                  htmlFor="photo"
                  className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                >
                  <div>
                    <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                      Drop files here
                    </span>
                    <span className="mb-2 block text-base font-medium text-[#6B7280]">
                      Or
                    </span>
                    <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                      Browse
                    </span>
                  </div>
                </label>
              </div>

              <div className="mb-5 rounded-md bg-[#F5F7FB] py-4 px-8">
                <div className="flex items-center justify-between">
                  <span className="truncate pr-3 text-base font-medium text-[#07074D]">
                    banner-design.png
                  </span>
                  <button className="text-[#07074D]">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                        fill="currentColor"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="rounded-md bg-[#F5F7FB] py-4 px-8">
                <div className="flex items-center justify-between">
                  <span className="truncate pr-3 text-base font-medium text-[#07074D]">
                    banner-design.png
                  </span>
                  <button className="text-[#07074D]">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                        fill="currentColor"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
                <div className="relative mt-5 h-[6px] w-full rounded-lg bg-[#E2E5EF]">
                  <div className="absolute left-0 right-0 h-full w-[75%] rounded-lg bg-[#6A64F1]"></div>
                </div>
              </div>
            </div>

            <div>
              <button className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                Send File
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Upload;
