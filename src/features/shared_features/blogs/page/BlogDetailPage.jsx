import { useParams, useNavigate } from "react-router-dom";
import { useBlogById } from "@/features/shared_features/blogs/hooks/useBlogById";
import PDFViewer from "@/features/shared_features/blogs/components/PdfViewr";
import {
  FaCalendarDay,
  FaTags,
  FaUser,
  FaCommentDots,
  FaArrowLeft,
  FaClock,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaHeart,
} from "react-icons/fa";
import { useState } from "react";
import SimplePDFViewer from "../components/SimplePDFViewr";
import { formatDate } from "@/lib/utils";

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: blog, isLoading, isError } = useBlogById(id);

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(120);
  const [comment, setComment] = useState("");
  const pdfUrl = `http://localhost:3000/uploads/pdfs/${blog?.content}`;

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setComment("");
  };

  const readingTime = Math.ceil((blog?.title?.length || 1000) / 200) || 5;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-gray-600">
        Loading article...
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#49BBBD] via-white to-purple-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Article Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/blogs")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
          >
            Back to Articles
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 mt-10">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <article className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12 bg-[#49BBBD] text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex flex-wrap gap-2 mb-6">
                {blog.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white border border-white/30 backdrop-blur-sm"
                  >
                    <FaTags className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                {blog.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-blue-100">
                <div className="flex items-center space-x-2">
                  <img
                    src={`http://localhost:3000/profile/${blog.user_id?.profile_picture}`}
                    alt={blog.user_id?.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="font-medium">
                    {blog.user_id?.name || "Unknown Author"}
                  </span>
                </div>
                <div className="flex items-center">
                  <FaCalendarDay className="w-4 h-4 mr-2" />
                  <span>{formatDate(blog.created_at)}</span>
                </div>
                <div className="flex items-center">
                  <FaClock className="w-4 h-4 mr-2" />
                  <span>{readingTime} min read</span>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
          </div>
          <div className="p-8 md:p-12">
            {blog.content && (
              <div className="mb-12">
                <div className="bg-gray-50 rounded-2xl p-6 border-2 space-y-4 border-dashed border-gray-200">
                  <SimplePDFViewer pdfUrl={pdfUrl} title={blog.title} />
                  <iframe
                    src={`http://localhost:3000/uploads/pdfs/${blog.content}`}
                    className="w-full h-[600px] md:h-[800px] rounded-xl shadow-lg border border-gray-200"
                    title="Article PDF"
                  />
                </div>
              </div>
            )}
            <div className="flex items-center justify-between py-6 border-y border-gray-100 mb-8">
              <div className="flex items-center space-x-6">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    liked
                      ? "bg-red-50 text-red-600 border border-red-200"
                      : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-red-50 hover:text-red-600"
                  }`}
                >
                  <FaHeart
                    className={`w-4 h-4 ${liked ? "fill-current" : ""}`}
                  />
                  <span className="font-medium">{likeCount}</span>
                </button>
                <div className="flex items-center space-x-2 text-gray-600">
                  <FaCommentDots className="w-4 h-4" />
                  <span className="font-medium">45 Comments</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-gray-600 font-medium">Share:</span>
                <button className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300">
                  <FaFacebook className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-full bg-blue-400 text-white hover:bg-blue-500 transition-colors duration-300">
                  <FaTwitter className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors duration-300">
                  <FaLinkedin className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="bg-white rounded-2xl border-2 border-gray-100 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Join the Discussion
              </h3>
              <form onSubmit={handleCommentSubmit} className="mb-8">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-none"
                  rows="4"
                  placeholder="Share your thoughts about this article..."
                />
                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm text-gray-500">
                    Be respectful and constructive in your comments.
                  </p>
                  <button
                    type="submit"
                    disabled={!comment.trim()}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Post Comment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetailPage;
