import { Component } from 'react';

class Logout extends Component {

    componentDidMount() {
        localStorage.removeItem('token')
        window.location.href = '/';
    }

    render() { 
        return null;
    }
}
 
export default Logout;