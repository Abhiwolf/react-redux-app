import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
    <div className="jumbotron">
        <h1>Administration</h1>
        <p>React, Redux and React router</p>
        <Link to="about" className="btn btn-primary btn-lg">
            About
        </Link>
    </div>
);

export default HomePage;