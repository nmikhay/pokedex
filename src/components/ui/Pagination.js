import PropTypes from "prop-types";

function Pagination({ page, handlePrevClick, handleNextClick, handleFirstClick, handleLastClick }) {
  return (
    <div className="flex justify-center items-center mt-4">
      <button
        className={`${
          page !== 1 ? "bg-blueTheme hover:bg-yellowTheme" : "bg-gray-400"
        } text-white font-bold py-2 px-4 rounded mr-2 ${
          page === 1 ? "cursor-not-allowed" : ""
        }`}
        onClick={handleFirstClick}
        disabled={page === 1}
      >
        First
      </button>
      <button
        className={`${
          page !== 1 ? "bg-blueTheme hover:bg-yellowTheme" : "bg-gray-400"
        } text-white font-bold py-2 px-4 rounded mr-2 ${
          page === 1 ? "cursor-not-allowed" : ""
        }`}
        onClick={handlePrevClick}
        disabled={page === 1}
      >
        Prev
      </button>
      <h1>{page}/11</h1>
      <button
        className={`${
          page !== 11 ? "bg-blueTheme hover:bg-yellowTheme" : "bg-gray-400"
        } text-white font-bold py-2 px-4 ml-2 rounded ${
          page === 11 ? "cursor-not-allowed" : ""
        }`}
        onClick={handleNextClick}
        disabled={page === 11}
      >
        Next
      </button>
      <button
        className={`${
          page !== 11 ? "bg-blueTheme hover:bg-yellowTheme" : "bg-gray-400"
        } text-white font-bold py-2 px-4 ml-2 rounded ${
          page === 11 ? "cursor-not-allowed" : ""
        }`}
        onClick={handleLastClick}
        disabled={page === 11}
      >
        Last
      </button>
    </div>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  handlePrevClick: PropTypes.func.isRequired,
  handleNextClick: PropTypes.func.isRequired,
  handleFirstClick: PropTypes.func.isRequired,
  handleLastClick: PropTypes.func.isRequired,
};

export default Pagination;