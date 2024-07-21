import React from 'react';
import { Link } from 'react-router-dom';
import cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const token = cookies.get('access_token')
    const navigate = useNavigate();

    const logout = ()=>{
        cookies.remove('access_token')
        navigate('/login');
    }

    return (
        <div className="navbar">
            <h1>Task Manager</h1>
            {token ?
                <>
                    <button to="/" onClick={()=>navigate('/')} className='home-btn'>Home</button>
                    <button onClick={logout} className='home-btn'>Logout</button>
                </>
            : <div className="auth-links">
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
            </div>}
        </div>
    );
};

export default Navbar;
