import * as React from 'react';
import { Component } from 'react';
 interface Props {
     message: string;
 }
  
 interface State {
     
 }
  
 class Budget extends Component<Props, State> {
     render() { 
         return ( 
             <h1>Budget { this.props.message}</h1>
          );
     }
 }
  
 export default Budget;