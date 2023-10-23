import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Account from '../Account';

const categories = ['Vehicle', 'Property', 'Life'];

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState(''); // storing search text query
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate();

    const handleSearchQuery = (e) => {
        e.preventDefault();
        // console.log(searchQuery);
        navigate(`/policy/?query=${searchQuery}`);
    }

    const handleCategoryClick = (clickedCategory) => {
        setSelectedCategory(clickedCategory)
        navigate(`/policy/?category=${clickedCategory}`);
        // console.log(clickedCategory)
    }
    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">Insurance Domain</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/policy">Policy</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/profile">Profile</a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Coverage
                                    </a>
                                    <ul className="dropdown-menu">
                                        {
                                            categories.map((category, index) => {
                                                return <li key={index}>
                                                    <button className='dropdown-item' onClick={() => handleCategoryClick(category)}>
                                                        {category}
                                                    </button>
                                                </li>
                                            })
                                        }
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/compariosn">Comparison</a>
                                </li>
                            </ul>
                            <Account />
                            <form className="d-flex" role="search" onSubmit={(e) => handleSearchQuery(e)}>
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
}

export default Navbar;
