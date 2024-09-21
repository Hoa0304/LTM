// File: components/RoleSelection.tsx
import React from 'react';

const RoleSelection: React.FC<{ onSelect: (role: string) => void }> = ({ onSelect }) => {
    return (
        <div className="role-selection">
            <h1 className="text-2xl font-bold">Select Your Role</h1>
            <button 
                className="btn btn-user" 
                onClick={() => onSelect('user')}
            >
                User
            </button>
            <button 
                className="btn btn-admin" 
                onClick={() => onSelect('admin')}
            >
                Admin
            </button>
        </div>
    );
};

export default RoleSelection;
