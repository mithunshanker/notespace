import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

const API_TOKEN = 'ybUQM5VSMgkNEcsHcP1WkoGi3UnVbeKH'; // Replace with your actual API key

const Admin = () => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [Durl, setDurl] = useState('')
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean | undefined>(undefined);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !subject || !file) {
      alert('Please fill all fields and select a file.');
      return;
    }

    setIsUploading(true);
    setIsSuccess(undefined);

    try {
      // Step 1: Get Gofile server
      const serverRes = await fetch('https://api.gofile.io/servers', {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
      });
      const serverData = await serverRes.json();
      if (!serverData.data?.servers?.length) {
        throw new Error('Failed to get Gofile server');
      }
      console.log(serverData)
      const server = serverData.data.servers[0].name;

      // Step 2: Upload file to Gofile
      const formData = new FormData();
      formData.append('file', file);

      const uploadRes = await fetch(`https://${server}.gofile.io/contents/uploadfile`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${API_TOKEN}` },
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (uploadData.status !== 'ok') {
        throw new Error('File upload failed');
      }

      const downloadUrl = uploadData.data.downloadPage;
      setDurl(downloadUrl)
      // Step 3: Send metadata to MongoDB
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({
          title,
          subject,
          downloadUrl,
          type: file.type || 'pdf',
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to upload data to MongoDB');
      }

      setIsSuccess(true);
    } catch (error) {
      console.error('Upload error:', error);
      setIsSuccess(false);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <label className="block font-semibold">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-1"
          required
        />

        <label className="block mt-4 font-semibold">Subject:</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-1"
          required
        />

        <label className="block mt-4 font-semibold">Upload File:</label>
        <input type="file" onChange={handleFileChange} className="w-full p-2 border border-gray-300 rounded mt-1" required />

        <button type="submit" className="mt-6 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition" disabled={isUploading}>
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>

        {isSuccess === true && (
          <p className="mt-4 text-green-600 font-semibold">
            File uploaded successfully!{' '}
            <a href={Durl&&Durl} target="_blank" className="text-blue-500 underline">
              Download Link
            </a>
          </p>
        )}
        {isSuccess === false && <p className="mt-4 text-red-600 font-semibold">Upload failed. Try again.</p>}
      </form>
    </div>
  );
};

export default Admin;
