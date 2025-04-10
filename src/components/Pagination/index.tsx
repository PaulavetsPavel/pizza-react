import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

type PaginationProps = {
  onChangePage: (page: number) => void;
};
const Pagination: React.FC<PaginationProps> = ({ onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.pagination}
      breakLabel="..."
      nextLabel=" >"
      onPageChange={(e) => {
        onChangePage(e.selected + 1);
      }}
      pageRangeDisplayed={8}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
