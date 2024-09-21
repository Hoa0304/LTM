import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin: React.FC = () => {
    const [activeUsers, setActiveUsers] = useState([]);
    const [error, setError] = useState<string | null>(null);

    const fetchActiveUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/users/active'); // Đảm bảo đường dẫn đúng
            console.log(response.data); // In ra dữ liệu để kiểm tra
            setActiveUsers(response.data);
        } catch (err) {
            console.error('Lỗi khi lấy người dùng hoạt động:', err);
            setError('Lỗi khi lấy người dùng hoạt động');
        }
    };

    useEffect(() => {
        fetchActiveUsers();
    }, []);

    return (
        <div>
            <h2 className="text-xl font-bold">Bảng Điều Khiển Quản Trị</h2>
            {error && <p className="text-red-500">{error}</p>}
            <ul>
                {Array.isArray(activeUsers) && activeUsers.length > 0 ? (
                    activeUsers.map((user, index) => (
                        <li key={index}>{user.username}</li>
                    ))
                ) : (
                    <li>Không có người dùng hoạt động.</li>
                )}
            </ul>
        </div>
    );
    
};

export default Admin;
