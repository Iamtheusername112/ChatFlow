// import React from 'react'
import avatar from "../../assets/images/avatar.jpg";
import { Link } from "react-router-dom";

function ProfileCard() {
  return (
    <div className="mt-14 m-40 shadow-xl overflow-hidden rounded-lg border border-gray-100">
      <a
        href="#"
        className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
      >
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

        <div className="sm:flex sm:justify-between sm:gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
              Welcome to GuideMe.
            </h3>
          </div>

          <div className="hidden sm:block sm:shrink-0">
            <img
              alt="Paul Clapton"
              src={avatar}
              className="h-24 w-24 rounded-lg object-cover shadow-sm"
            />
          </div>
        </div>

        <dl className="flex gap-4 sm:gap-6">
          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium text-gray-600"> Followers:</dt>
            <dd className="text-xs text-gray-500">1231</dd>
          </div>

          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium text-gray-600">Followings:</dt>
            <dd className="text-xs text-gray-500">23456</dd>
          </div>
        </dl>

        <dl className="flex gap-4 mt-6 sm:gap-6">
          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium text-gray-600"> Created At:</dt>
            <dd className="text-xs text-gray-500">31st June, 2021</dd>
          </div>

          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium text-gray-600">Reading time</dt>
            <dd className="text-xs text-gray-500">3 minute</dd>
          </div>

          <div className="flex flex-col-reverse">
            <Link to="/" className="text-emerald-500 hover:text-red-400">
              My Profile
            </Link>
          </div>
        </dl>
      </a>
    </div>
  );
}

export default ProfileCard;
