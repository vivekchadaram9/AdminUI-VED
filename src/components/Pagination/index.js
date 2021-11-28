import { AiFillLeftCircle } from "react-icons/ai";
import { AiFillRightCircle } from "react-icons/ai";
import { CgPushChevronRightO } from "react-icons/cg";
import { CgPushChevronLeftO } from "react-icons/cg";
import "./index.css";

const Pagination = (props) => {
  const {
    totalPagesCount,
    changePageNumber,
    activePageNumber,
    deleteMultipleUsers,
  } = props;
  const PageNumber = [];

  for (
    let numberOfPages = 1;
    numberOfPages <= totalPagesCount;
    numberOfPages++
  ) {
    PageNumber.push(numberOfPages);
  }

  const decreaseActivePageNumber = () => {
    if (activePageNumber > 1) {
      changePageNumber(activePageNumber - 1);
    }
  };

  const increaseActivePageNumber = () => {
    if (activePageNumber < totalPagesCount) {
      changePageNumber(activePageNumber + 1);
    }
  };

  const onClickingDeleteMultiple = () => {
    deleteMultipleUsers();
  };

  const goToLastPage = () => {
    changePageNumber(totalPagesCount);
  };

  const goToFirstPage = () => {
    changePageNumber(1);
  };

  return (
    <nav className="nav-cont">
      <button
        className="delete-button"
        type="button"
        onClick={onClickingDeleteMultiple}
      >
        Delete Selected
      </button>
      <ul className="pagination-cont">
        <li className="page-no-item">
          <button type="button" onClick={goToFirstPage} className="nav-button ">
            <CgPushChevronLeftO className="icon" />
          </button>
        </li>
        <li className="page-no-item">
          <button
            type="button"
            onClick={decreaseActivePageNumber}
            className="nav-button "
          >
            <AiFillLeftCircle className="icon" />
          </button>
        </li>
        {PageNumber.map((num) => (
          <li key={num} className="page-no-item">
            <button
              type="button"
              className={
                num === activePageNumber ? "page-no active" : "page-no"
              }
            >
              {num}
            </button>
          </li>
        ))}
        <li className="page-no-item">
          <button onClick={increaseActivePageNumber} className="nav-button">
            <AiFillRightCircle className="icon" />
          </button>
        </li>
        <li className="page-no-item">
          <button onClick={goToLastPage} className="nav-button">
            <CgPushChevronRightO className="icon" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
