const ListGroup = (props: any) => {
    let types = props.types.filter((v: string, i: number, a: string) => a.indexOf(v) === i);
    types = ['All', ...types];
    return (
        <ul className="list-group clickable">
            {types.map((type: string) => (
                <li key={type} className={props.activeType === type ? "list-group-item active" : "list-group-item"} 
                onClick={() => props.onTypeChange(type)}>{type}</li>
            ))}
        </ul>
    );
}

export default ListGroup;