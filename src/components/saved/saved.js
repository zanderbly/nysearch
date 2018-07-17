import React from 'react';
import "./saved.css";

const Saved = () => (
    <div className="col col-12">
        <div className="card card-main text-center">
            <div className="card-header">
                Featured
        </div>
            <div className="card-body">
                <div className="card mb-2">
                    <div className="card-header form-inline" id="headline">
                        <h2>test</h2>
                        <div className="col text-right">
                            <a href="#" className="btn btn-danger">Delete X</a>
                        </div>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title" id="summary">Test</h5>
                        <p className="card-text" id="url">Test</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
        
export default Saved;