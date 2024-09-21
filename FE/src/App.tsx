// File: App.tsx
import React, { useState } from 'react';
import RoleSelection from './components/RoleSelection';
import Browser from './components/Browser';
import Admin from './components/Admin'; // Cập nhật tên import
import './index.css';

const App: React.FC = () => {
    const [role, setRole] = useState<string | null>(null);

    const handleRoleSelect = (selectedRole: string) => {
        setRole(selectedRole);
    };


    return (
        <div className="App">
            {role === 'user' ? (
                <Browser />
            ) : role === 'admin' ? (
                <Admin /> // Sử dụng Admin
            ) : (
                <RoleSelection onSelect={handleRoleSelect} />
            )}
        </div>
    );
};

export default App;
