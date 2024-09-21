import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Browser: React.FC = () => {
    const [url, setUrl] = useState('');
    const [htmlContent, setHtmlContent] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [urls, setUrls] = useState<string[]>([]);

    const fetchHtml = async () => {
        setError(null);

        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            setError('Invalid URL: must start with http:// or https://');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8080/fetch?url=${encodeURIComponent(url)}`);
            setHtmlContent(response.data);
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Error fetching the URL');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (url) {
            try {
                await axios.post(`http://localhost:8080/api/urls`, { url });
                setUrl('');
                await fetchUrls();
            } catch (err) {
                console.error('Error adding URL:', err);
                setError('Error adding URL');
            }
        }
    };

    const fetchUrls = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/urls`);
            setUrls(response.data);
        } catch (err) {
            console.error('Error fetching URLs:', err);
        }
    };

    useEffect(() => {
        fetchUrls();
    }, []);

    return (
        <div className="flex flex-row w-full h-screen">
            <div className="w-1/5 p-4 border-r border-gray-300 overflow-y-auto bg-black text-white h-full">
                <form onSubmit={handleSubmit}>
                    <h1 className="text-2xl font-bold">Simple Web Browser</h1>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter URL"
                        className="my-10 block text-lime-400 w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            onClick={fetchHtml}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Fetch
                        </button>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                </form>

                <div style={{ marginTop: '30px' }}></div>
                <h2 className="text-xl font-bold">LIST URL</h2>

                <ul className="flex flex-col list-none p-0 m-0">
                    {urls.map((u, index) => (
                        <li key={index} className="mr-2 mb-2">
                            <a
                                href={u}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block whitespace-nowrap overflow-hidden text-ellipsis"
                                style={{ maxWidth: '200px' }}
                            >
                                {u}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="w-4/5 p-4 h-full">
                <div
                    style={{ maxHeight: 'calc(100vh - 20px)', maxWidth: '100%', overflowX: 'auto' }}
                >
                    <style>
                        {`
                            .header {
                                position: sticky !important;
                            }
                        `}
                    </style>
                    <div dangerouslySetInnerHTML={{ __html: htmlContent || '' }} />
                </div>
            </div>
        </div>
    );
};

export default Browser;
