import React, { useState } from 'react';

const QuizForm = ({ initialValues = {}, onSubmit, loading }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    total_marks: '',
    passing_marks: '',
    ...initialValues,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700">Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-500"
          placeholder="Quiz title"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-500"
          placeholder="Quiz description"
          required
        />
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-gray-700">Total Marks</label>
          <input
            name="total_marks"
            type="number"
            value={form.total_marks}
            onChange={handleChange}
            className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-500"
            placeholder="Total marks"
            required
          />
        </div>
        <div className="flex-1">
          <label className="block text-gray-700">Passing Marks</label>
          <input
            name="passing_marks"
            type="number"
            value={form.passing_marks}
            onChange={handleChange}
            className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-500"
            placeholder="Passing marks"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-lg transition duration-200"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save Quiz'}
      </button>
    </form>
  );
};

export default QuizForm; 