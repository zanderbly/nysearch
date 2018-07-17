import React from 'react';
import "./searchBox.css";

const SearchBox = () => (
    <div className="col col-12">
    <div className="card card-main text-center">
        <div className="card-header">
            Featured
        </div>
            <div className="card-body">
                <form>
                    <div className="form-group">
                        <label for="formGroupExampleInput">Example label</label>
                        <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example input"/>
                    </div>
                    <div className="form-group">
                        <label for="formGroupExampleInput">Example label</label>
                        <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example input"/>
                    </div>
                    <div className="form-group">
                        <label for="formGroupExampleInput">Example label</label>
                        <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example input"/>
                    </div>
                    <button type="button" className="btn btn-primary btn-lg">Large button</button>
                </form>
            </div>
        </div>
    </div>
);
        
export default SearchBox;