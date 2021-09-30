import * as React from 'react';
import { Component } from 'react';
import Like from './like';

interface Props {
    movies: any;
    columns: any;
}
 
interface State {
    
}
 
class TableBody extends Component<Props, State> {

    renderCell = (movie: any, column: any) => {
        if (column.content) { return column.content(movie) };
        return movie[column.name];
    }

    render() { 
        return (  
            <tbody>
                {this.props.movies.map((movie: any) => (
                    <tr key={movie.id}>
                        {this.props.columns.map((column: any) => (
                            <td key={movie.id + movie.publishedDate}>{this.renderCell(movie, column)}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        );
    }
}
 
export default TableBody;