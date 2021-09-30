import * as React from 'react';
import { Component } from 'react';

interface Props {
    columns: any;
    sorting: any;
    onSorting(sorting: any): any;
}
 
interface State {
    
}
 
class TableHeader  extends Component<Props, State> {
    
    
    setSorting(column: string) {
        const sorting = {...this.props.sorting};
        if (sorting.column === column) {
            sorting.order = sorting.order === 'asc' ? 'desc' : 'asc';
        } else {
            sorting.column = column;
            sorting.order = 'asc';
        }
        this.props.onSorting(sorting);
    }

    getSortIcon(column: any) {
        if (column.name !== this.props.sorting.column) return null;
        if (this.props.sorting.order === 'asc') return <i className="fa fa-sort-asc"></i>
        return <i className="fa fa-sort-desc"></i>
    }

    render() { 
        return (  
            <thead>
                <tr>
                    {this.props.columns.map((column: any) => (
                    <th className="clickable" key={column.name} onClick={() => this.setSorting(column.name)}>
                        {column.label} {this.getSortIcon(column)}
                        </th>
                    ))}
                </tr>
            </thead>
        );
    }
}
 
export default TableHeader;