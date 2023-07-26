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
