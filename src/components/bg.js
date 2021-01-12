import React, { Component } from "react";
// import imgs from './images/1.jpg';

class BackGrounds extends Component {
    render() {
        return(
            <img src={ require('./images/1.jpg') } width='12' height='12'/>
        );
    }
}

export default BackGrounds;