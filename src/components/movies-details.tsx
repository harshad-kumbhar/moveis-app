import { Component } from 'react';

interface Props {
    match: any;
}
 
interface State {
    
}
 
class MovieDetails extends Component<Props, State> {
    render() { 
        return ( 
            <h1>Details of Movie with Id - {this.props.match.params.id}</h1>
         );
    }
}
 
export default MovieDetails;