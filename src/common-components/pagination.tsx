import _ from 'lodash';

const Pagination: any = (props: any) => {
    const pageCount = props.total / props.size;
    const pages = _.range(1, (pageCount + 1));
    if (pageCount <= 1) { return null;}
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {pages.map(page => (
                <li className={ page === props.currentPage ? "page-item active" : "page-item"}
                 key={page} onClick={() => props.onPageChange(page)}>
                    <a className="page-link">{page}</a>
                </li>
                ))}
            </ul>
        </nav>
    );
}

export default Pagination;