import React from 'react';
import './banner.css'

const styles = {
    fontWeight: "bold"
}

const Banner = () => (
    <div className="jumbotron py-2">
        <div className="col text-center">
            <h1 className="display-4" style={styles}>Ny Times Scraper</h1>
            <p className="lead">Scrape it good</p>
        </div>
    </div>
);

export default Banner;