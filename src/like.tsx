import React, { Component } from 'react';

interface ILikeProps {
  isLike: boolean;
  onLikeChange(): void;
}

interface ILikeState {
}

class Like extends Component<ILikeProps, ILikeState> {
    render() { 
        let classes = 'fa fa-heart';
        if (!this.props.isLike) { classes += '-o'};
        return <i className={classes} aria-hidden="true" onClick={() => this.props.onLikeChange()}></i>
         
    }
}
 
export default Like;