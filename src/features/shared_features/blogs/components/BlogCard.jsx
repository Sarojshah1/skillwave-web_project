import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaUser,
  FaArrowRight,
  FaClock,
  FaImage,
} from "react-icons/fa";
import { formatDate } from "@/lib/utils";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Blog clicked:", blog._id);
    navigate(`/blogs/${blog?._id}`);
  };

  const readingTime = Math.ceil(blog?.title.length / 200) || 1;

  return (
    <div
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden max-w-2xl w-full border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2 hover:scale-[1.02]"
      onClick={handleClick}
    >
      <div className="relative p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {blog?.tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border border-blue-200"
            >
              {tag}
            </span>
          ))}
          {blog?.tags.length > 2 && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
              +{blog.tags.length - 2} more
            </span>
          )}
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
          {blog?.title}
        </h2>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4 whitespace-nowrap overflow-hidden">
          <div className="flex items-center space-x-4 overflow-hidden">
            <div className="flex items-center">
              <FaUser className="w-3 h-3 mr-1 flex-shrink-0" />
              <span className="max-w-36">
                {blog?.user_id?.name || "Unknown"}
              </span>
            </div>
            <div className="flex items-center flex-shrink-0">
              <FaCalendarAlt className="w-3 h-3 mr-1" />
              <span>{formatDate(blog?.created_at)}</span>
            </div>
          </div>
          {/* <div className="flex items-center flex-shrink-0 ml-2">
            <FaClock className="w-3 h-3" />
            <span>{readingTime} min read</span>
          </div> */}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-blue-600 font-medium text-sm group-hover:text-blue-700 transition-colors duration-300">
            <span>Read Article</span>
            <FaArrowRight className="w-3 h-3 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300 pointer-events-none" />
    </div>
  );
};

export default BlogCard;
