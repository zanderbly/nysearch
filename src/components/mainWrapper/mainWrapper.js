import React from "react";
import './mainWrapper.css';

const MainWrapper = props => (
<div className="container">
    <div className="row">{props.children}</div>
</div>
)

export default MainWrapper;
