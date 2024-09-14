import React, { useState } from 'react';
import axios from 'axios';

const Browser: React.FC = () => {
    const [url, setUrl] = useState('');
    const [htmlContent, setHtmlContent] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchHtml = async () => {
        setError(null);
        setHtmlContent(null);

        try {
            const response = await axios.get(`http://localhost:8080/fetch?url=${encodeURIComponent(url)}`);
            setHtmlContent(response.data);
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Error fetching the URL');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Simple Web Browser</h1>
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL"
                style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <button onClick={fetchHtml} style={{ padding: '8px 16px' }}>Fetch</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div dangerouslySetInnerHTML={{ __html: htmlContent || '' }} />
        </div>
    );
};

export default Browser;