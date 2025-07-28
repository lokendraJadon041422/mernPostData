import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useLocation, useNavigate } from 'react-router-dom';

const PageBtnContainer = ({numOfPages,page}) => {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1);

const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
};

return (
<Wrapper>
  <button
    className='btn prev-btn'
    onClick={() => {
      let prevPage = Number(page) - 1;
      if (prevPage <= 1) prevPage = numOfPages;
      handlePageChange(prevPage);
    }}
    disabled={page === 1}
  >
    <HiChevronDoubleLeft />
    prev
  </button>
  <div className='btn-container'>
    {pages.map((pageNumber) => (
      <button
        className={`btn page-btn ${pageNumber === page && 'active'}`}
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    ))}
  </div>
  <button
    className='btn next-btn'
    onClick={() => {
      let nextPage = Number(page) + 1;
      if (nextPage >= numOfPages) nextPage = 1;
      handlePageChange(nextPage);
    }}
    disabled={page === numOfPages}
  >
    next
    <HiChevronDoubleRight />
  </button>
</Wrapper>
);
};

export default PageBtnContainer;