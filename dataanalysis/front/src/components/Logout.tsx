import React, { useState, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Modal, Button } from 'antd';
import '../CSS/Navbar.css';

interface LogoutModalProps {
    isVisible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const LogoutModal: FC<LogoutModalProps> = ({ isVisible, onConfirm, onCancel }) => (
    <Modal
        title="Confirm Logout"
        open={isVisible}
        onOk={onConfirm}
        onCancel={onCancel}
        aria-labelledby="logout-modal-title"
        aria-describedby="logout-modal-description"
        footer={[
            <Button key="cancel" onClick={onCancel}>
                Cancel
            </Button>,
            <Button key="confirm" type="primary" onClick={onConfirm}>
                Logout
            </Button>
        ]}
    >
        <p id="logout-modal-description">Are you sure you want to logout?</p>
    </Modal>
);

const Navbar = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsModalVisible(false);
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        navigate('login');
        window.location.reload();
    };

    return (
        <div className="navbar-container">
            <Menu mode="horizontal">
                {/* Other menu items can be added here */}
                <Menu.Item key="logout" onClick={() => setIsModalVisible(true)}>
                    Logout
                </Menu.Item>
            </Menu>
            <LogoutModal 
                isVisible={isModalVisible} 
                onConfirm={handleLogout} 
                onCancel={() => setIsModalVisible(false)} 
            />
        </div>
    );
};

export default Navbar;
