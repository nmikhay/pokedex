import MainNavigation from "./MainNavigation";
import PropTypes from "prop-types";

function Layout({ children, onSearch, sortOption, setSortOption }) {
  return (
    <div>
      <MainNavigation onSearch={onSearch} sortOption={sortOption} setSortOption={setSortOption} />
      <main className="mx-auto my-12 w-200 max-w-40">{children}</main>
    </div>
  );
}

Layout.propTypes = {
  onSearch: PropTypes.func,
  sortOption: PropTypes.string,
  setSortOption: PropTypes.func,
};

export default Layout;

