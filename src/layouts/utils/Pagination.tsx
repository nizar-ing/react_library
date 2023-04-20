export const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  paginate: any;
}> = ({ currentPage, totalPages, paginate }) => {
  const pageNumbers = [];

  if (currentPage === 1) {
    pageNumbers.push(currentPage);
    if (totalPages >= currentPage + 1) {
      pageNumbers.push(currentPage + 1);
    }
    if (totalPages >= currentPage + 2) {
      pageNumbers.push(currentPage + 2);
    }
  } else if (currentPage > 1) {
    if (currentPage >= 3) {
      pageNumbers.push(currentPage - 2);
      pageNumbers.push(currentPage - 1);
    } else {
      pageNumbers.push(currentPage - 1);
    }

    pageNumbers.push(currentPage);

    if (totalPages >= currentPage + 1) {
      pageNumbers.push(currentPage + 1);
    }
    if (totalPages >= currentPage + 2) {
      pageNumbers.push(currentPage + 2);
    }
  }
  return (
    <nav aria-label="...">
      <ul className="pagination">
        <li className="page-item" onClick={() => paginate(1)}>
          <button className="page-link">First Page</button>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => paginate(number)}
            className={"page-item " + (currentPage === number ? "active" : "")}
          >
            <button className="page-link">{number}</button>
          </li>
        ))}
        <li className="page-item" onClick={() => paginate(totalPages)}>
          <button className="page-link">Last Page</button>
        </li>
      </ul>
    </nav>
  );
};
