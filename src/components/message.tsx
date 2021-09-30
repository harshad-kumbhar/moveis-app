import React, { Component } from 'react';


interface IMessageProps {
  count: number;
}

interface IMessageState {
}

class Message extends Component<IMessageProps, IMessageState> {
    render() { 
        const msg = 'There are ' + this.props.count + ' movies present in database'
        return <h5 className="text-center">
            {this.props.count !== 0 && msg}
        </h5>;
    }
}
 
export default Message;