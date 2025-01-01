import React from 'react';
import { useState, useEffect } from 'react';
import { Link, User, KeyRound, Copy } from 'lucide-react';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';

function PasswordForm() {

  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);
  const notifyInfo = (msg) => toast.info(msg);

  const [showPassword, setShowPassword] = useState(false);
  const [siteUrl, setSiteUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState(localStorage.getItem("passwords") ? JSON.parse(localStorage.getItem("passwords")) : []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    notifyInfo("Copied to clipboard!");
  };

  useEffect(() => {
    localStorage.setItem("passwords", JSON.stringify(data));
  }, [data]);

  const handleSubmit = () => {
    if (!siteUrl || !username || !password) return notifyError('Please fill all fields');
    setData([...data, { "id": uuidv4(), "siteUrl": siteUrl, "username": username, "password": password }]);
    setSiteUrl('');
    setUsername('');
    setPassword('');
    notifySuccess('Password saved!');
  };

  const deleteHandle = (id) => {
    let dlt = confirm("Are you sure you want to delete this password?");
    if (dlt) {
      setData([...data.filter((item) => item.id !== id)]);
      notifySuccess('Password deleted!');
    }
  };

  const editHandle = (id) => {
    const item = data.find((item) => item.id === id);
    setSiteUrl(item.siteUrl);
    setUsername(item.username);
    setPassword(item.password);
    setData([...data.filter((item) => item.id !== id)]);
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
                  value={siteUrl}
                  onChange={(e) => setSiteUrl(e.target.value)}
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
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit() }}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" onClick={togglePasswordVisibility}>
                  {showPassword ? <MdOutlineRemoveRedEye className="text-gray-400 w-5 h-5 hover:text-teal-400 transition-colors" /> : <FaRegEyeSlash className="text-gray-400 w-5 h-5 hover:text-teal-400 transition-colors" />}
                </div>
              </div>
            </div>
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
                        onClick={() => { editHandle(item.id) }}>
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
                        onClick={() => { deleteHandle(item.id) }}>
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