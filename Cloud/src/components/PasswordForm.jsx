import React from 'react';
import { useState, useEffect } from 'react';
import { Link, User, KeyRound, Copy } from 'lucide-react';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const API_URL = 'http://localhost:5000/api';

function PasswordForm() {

  const [showPassword, setShowPassword] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    siteUrl: '',
    username: '',
    password: ''
  });
  const [data, setData] = useState([]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.info("Copied to clipboard!");
  };

  const fetchPasswords = async () => {
    try {
      const response = await axios.get(`${API_URL}/passwords`);
      setData(response.data);
    } catch (error) {
      toast.error('Failed to fetch passwords');
    }
  };

  useEffect(() => {
    fetchPasswords();
  }, []);

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await axios.put(`${API_URL}/passwords/${editingId}`, form);
        toast.success('Password updated successfully');
      } else {
        await axios.post(`${API_URL}/passwords`, form);
        toast.success('Password added successfully');
      }
      setForm({ siteUrl: '', username: '', password: '' });
      setEditingId(null);
      fetchPasswords();
    } catch (error) {
      toast.error(editingId ? 'Failed to update password' : 'Failed to add password');
    }
  };

  const handelDelete = async (id) => {
    let dlt = confirm("Are you sure you want to delete this password?");
    if (dlt) {
      try {
        await axios.delete(`${API_URL}/passwords/${id}`);
        toast.success('Password deleted successfully');
        fetchPasswords();
      } catch (error) {
        toast.error('Failed to delete password');
      }
    }
  };

  const handelEdit = async (item) => {
    setForm({
      siteUrl: item.siteUrl,
      username: item.username,
      password: item.password
    });
    setEditingId(item._id);
  };


  return (
    <>
      <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg border border-teal-500/20 max-w-2xl mx-auto">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          theme="dark"
        />
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* SITE URL */}
            <div className="flex-1">
              <label className="block text-gray-300 mb-2 text-sm">Site URL</label>
              <div className="relative">
                <Link className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  className="w-full bg-gray-700 text-gray-100 pl-10 pr-4 py-2 rounded-md border border-gray-600 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all"
                  placeholder="https://example.com"
                  value={form.siteUrl}
                  onChange={(e) => setForm({ ...form, siteUrl: e.target.value })}
                />
              </div>
            </div>
            {/* USERNAME */}
            <div className="flex-1">
              <label className="block text-gray-300 mb-2 text-sm">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  className="w-full bg-gray-700 text-gray-100 pl-10 pr-4 py-2 rounded-md border border-gray-600 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all"
                  placeholder="johndoe"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                />
              </div>
            </div>
          </div>
          {/* PASSWORD */}
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-gray-300 mb-2 text-sm">Password</label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-gray-700 text-gray-100 pl-10 pr-10 py-2 rounded-md border border-gray-600 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit() }}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" onClick={togglePasswordVisibility}>
                  {showPassword ? <MdOutlineRemoveRedEye className="text-gray-400 w-5 h-5 hover:text-teal-400 transition-colors" /> : <FaRegEyeSlash className="text-gray-400 w-5 h-5 hover:text-teal-400 transition-colors" />}
                </div>
              </div>
            </div>
            {/* SAVE BUTTON */}
            <button className="bg-teal-500 hover:bg-teal-400 text-gray-900 px-6 py-2 rounded-md font-medium transition-colors flex items-center gap-2"
              onClick={() => handleSubmit()}>
              <lord-icon
                src="https://cdn.lordicon.com/fjvfsqea.json"
                trigger="hover"
                stroke="bold"
                colors="primary:#121331,secondary:#121331"
                style={{ "width": "21px", "height": "21px" }}>
              </lord-icon>
              Save
            </button>
          </div>
        </div>
      </div>

      {/* -------PASSWORD TABLE---------- */}

      <div className="overflow-x-auto">
        <table className="w-full bg-gray-800 rounded-lg border border-teal-500/20">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="w-1/3 px-6 py-3 text-left text-sm font-medium text-gray-300">Site</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Username</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Password</th>
              <th className="w-1/6 px-6 py-3 text-left text-sm font-medium text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">

            {data.map((item) => {
              return (
                <tr key={item.id} className="hover:bg-gray-700/50 transition-colors group">
                  <td className="px-6 py-4 text-gray-300">
                    <a className='hover:underline' href={item.siteUrl} target='_blank'>{item.siteUrl}</a>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-300">{item.username}</span>
                      <button className="text-gray-400 hover:text-teal-400 transition-colors opacity-0 group-hover:opacity-100">
                        <Copy className="w-4 h-4"
                          onClick={() => { copyText(item.username) }} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-300">{"•".repeat(item.password.length)}</span>
                      <button className="text-gray-400 hover:text-teal-400 transition-colors opacity-0 group-hover:opacity-100">
                        <Copy className="w-4 h-4"
                          onClick={() => { copyText(item.password) }} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* EDIT */}
                      <button className="text-gray-400 hover:text-teal-400 transition-colors"
                        onClick={() => { handelEdit(item) }}>
                        <lord-icon
                          src="https://cdn.lordicon.com/vysppwvq.json"
                          trigger="hover"
                          state="hover-line"
                          stroke="bold"
                          colors="primary:#848484,secondary:#ffffff"
                          style={{ "width": "22px", "height": "22px" }}>
                        </lord-icon>
                      </button>
                      {/* DELETE */}
                      <button className="text-gray-400 hover:text-red-400 transition-colors"
                        onClick={() => { handelDelete(item._id) }}>
                        <lord-icon
                          src="https://cdn.lordicon.com/crxdwbpm.json"
                          trigger="hover"
                          stroke="bold"
                          colors="primary:#848484,secondary:#ffffff"
                          style={{ "width": "22px", "height": "22px" }}>
                        </lord-icon>
                      </button>
                    </div>
                  </td>
                </tr>)
            })}

          </tbody>
        </table>
      </div>

    </>
  );
}

export default PasswordForm;