import { useState } from 'react';
import { useCreateGroup } from '../hooks/useGroupStudy';
import { Users, Image as ImageIcon, Loader2 } from 'lucide-react';

export default function CreateGroupForm({ onSuccess }) {
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [groupImage, setGroupImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const { mutate, isPending, error } = useCreateGroup();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setGroupImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('group_name', groupName);
    formData.append('description', description);
    if (groupImage) formData.append('group_image', groupImage);
    mutate(formData, {
      onSuccess: () => {
        setGroupName('');
        setDescription('');
        setGroupImage(null);
        setPreview(null);
        onSuccess && onSuccess();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-center mb-2 text-[#49BBBD] flex items-center justify-center gap-2">
        <Users className="w-6 h-6" /> Create Study Group
      </h2>
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700 mb-1">Group Name</label>
        <input
          value={groupName}
          onChange={e => setGroupName(e.target.value)}
          placeholder="Enter group name"
          required
          className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-[#49BBBD] focus:outline-none text-gray-800 bg-gray-50"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Describe your group..."
          required
          rows={3}
          className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-[#49BBBD] focus:outline-none text-gray-800 bg-gray-50"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
          <ImageIcon className="w-4 h-4" /> Group Image (optional)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border border-gray-200 rounded-lg p-2 bg-gray-50"
        />
        {preview && (
          <div className="mt-2 flex justify-center">
            <img src={preview} alt="Preview" className="h-24 w-24 object-cover rounded-full border-2 border-[#49BBBD] shadow" />
          </div>
        )}
      </div>
      {error && <div className="text-red-500 text-sm text-center">{error.message || 'Failed to create group'}</div>}
      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#49BBBD] to-[#3da5a7] text-white font-semibold py-3 rounded-xl shadow hover:from-[#3da5a7] hover:to-[#49BBBD] transition disabled:opacity-60"
      >
        {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : '+'} Create Group
      </button>
    </form>
  );
} 