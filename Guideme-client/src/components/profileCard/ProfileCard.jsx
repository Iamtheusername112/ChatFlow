// import React from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../../assets/images/avatar.jpg";
import { useState } from "react";
import { updateUser } from "../../redux/authSlice";

function ProfileCard() {
  const { token, user } = useSelector((state) => state.auth);
  const [state, setState] = useState({});

  const handleState = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const dispatch = useDispatch();

  const [photo, setPhoto] = useState("");

  const handleShowForm = () => {
    setShowForm(true);
    setShowModal(false);
  };

  // Handle update Profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
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

    try {
      const res = await fetch(
        `http://localhost:3000/user/updateUser/${user._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "PUT",
          body: JSON.stringify({ ...state, profileImg: filename }),
        }
      );

      const data = await res.json();
      setShowForm(false);
      dispatch(updateUser(data));
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  // If user data is not available, return null (don't render anything)
  if (!user) {
    return null;
  }

  return (
    <div className="mt-14 m-12 shadow-xl overflow-hidden rounded-lg border border-gray-100">
      <a
        href="#"
        className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
      >
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

        <div className="sm:flex sm:justify-between sm:gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
              <span>Hi</span> {user.username} welcome!!
            </h3>
          </div>

          <div className="hidden sm:block sm:shrink-0">
            <img
              alt="Paul Clapton"
              src={avatar}
              className="h-24 w-24 rounded-lg object-cover shadow-sm"
              onClick={() => setShowModal((prev) => !prev)}
            />
            {showModal && (
              <div>
                <span onClick={handleShowForm}>Update Profile</span>
              </div>
            )}
          </div>

          {showForm && (
            <div onClick={() => setShowForm(false)}>
              <div onClick={(e) => e.stopPropagation()}>
                <h2>Update Profile</h2>

                <form
                  onSubmit={handleUpdateProfile}
                  className="py-6 px-9"
                  action="https://formbold.com/s/FORM_ID"
                  method="POST"
                >
                  <div className="mb-5">
                    <label
                      htmlFor="text"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Username:
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="username"
                      onChange={handleState}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>

                  <div className="mb-5">
                    <label
                      htmlFor="email"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      email:
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="email"
                      onChange={handleState}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>

                  <div className="mb-5">
                    <label
                      htmlFor="bio"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      bio:
                    </label>
                    <input
                      type="bio"
                      name="bio"
                      id="bio"
                      onChange={handleState}
                      placeholder="bio"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>

                  <div className="mb-5">
                    <label
                      htmlFor="password"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      bio:
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="password"
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
                      {photo && <p>{photo.name}</p>}
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

                      {/* Error message */}

                      <p className="text-red-600 text-sm mt-2">
                        Please upload a photo!
                      </p>
                    </div>
                  </div>

                  <div>
                    <button className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                      Send File
                    </button>
                  </div>
                </form>
                <div onClick={() => setShowForm(false)}></div>
              </div>
            </div>
          )}
        </div>

        <dl className="flex gap-4 sm:gap-6">
          {user.followers && (
            <div className="flex flex-col-reverse">
              <dt className="text-sm font-medium text-gray-600">Followers:</dt>
              <dd className="text-xs text-gray-500">{user.followers.length}</dd>
            </div>
          )}

          {user.followings && (
            <div className="flex flex-col-reverse">
              <dt className="text-sm font-medium text-gray-600">Followings:</dt>
              <dd className="text-xs text-gray-500">
                {user.followings.length}
              </dd>
            </div>
          )}
        </dl>

        <dl className="flex gap-4 mt-6 sm:gap-6">
          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium text-gray-600">Created At:</dt>
            <dd className="text-xs text-gray-500">{format(user.createdAt)}</dd>
          </div>

          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium text-gray-600">Reading time</dt>
            <dd className="text-xs text-gray-500">3 minute</dd>
          </div>

          <div className="flex flex-col-reverse">
            <Link
              to={`/profileDetail/${user._id}`}
              className="text-emerald-500 hover:text-red-400"
            >
              My Profile
            </Link>
          </div>
        </dl>
      </a>
    </div>
  );
}

export default ProfileCard;
