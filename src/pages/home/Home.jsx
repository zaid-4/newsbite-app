import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAllNews, getNewsMeta } from "../../setup/redux/actions/newsAction";
import ReactPaginate from "react-paginate";
import styles from "./home.module.css";
import NewsFilter from "../../components/NewsFilter";
import Loader from "../../components/Loader";
import { makeLabelOptions, makeOptions } from "../../utils/helpers";
import { SearchBar } from "./SearchBar";
import { NewsCard } from "./NewsCard";

const Home = ({
  newsList,
  pagination,
  categories,
  sources,
  getAllNews,
  authors,
  getNewsMeta,
  isAuthorized,
  loading,
}) => {
  const { currentPage, itemsPerPage, lastPage } = pagination;
  const [searchTerm, setSearchTerm] = useState("");
  const [delayedSearch, setDelayedSearch] = useState(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [newsFilters, setNewsFilters] = useState(null);
  const authorOptions = makeLabelOptions(authors);
  const categoryOptions = makeOptions(categories);
  const sourceOptions = makeOptions(sources);

  useEffect(() => {
    getAllNews(newsFilters, isAuthorized);
  }, [newsFilters]);

  useEffect(() => {
    getAllNews({ page: currentPage }, isAuthorized);
    getNewsMeta({}, isAuthorized);
  }, [getAllNews, getNewsMeta, isAuthorized]);

  const handlePageClick = ({ selected }) => {
    getAllNews({ page: selected + 1, per_page: itemsPerPage }, isAuthorized);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    clearTimeout(delayedSearch);

    if (term.length > 3 || term.length === 0) {
      setDelayedSearch(
        setTimeout(() => {
          getAllNews({ page: 1, keyword: term }, isAuthorized);
        }, 1000)
      );
    }
  };

  return (
    <>
      <Loader loading={loading} />
      <SearchBar
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        setShowFilterModal={setShowFilterModal}
      />

      <div className={`w-100 d-flex flex-wrap justify-content-between mb-5`}>
        {newsList.length > 0 ? (
          newsList.map((news) => <NewsCard key={news.id} news={news} />)
        ) : (
          <h3 className="mt-5 w-100 text-center">
            No news available, please update your news preferences
          </h3>
        )}
      </div>
      {lastPage > 1 && (
        <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={lastPage}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={styles.pagination}
          previousLinkClassName={styles.paginationLink}
          nextLinkClassName={styles.paginationLink}
          disabledClassName={styles.paginationLinkDisabled}
          activeClassName={styles.paginationLinkActive}
          forcePage={currentPage - 1}
        />
      )}

      <NewsFilter
        show={showFilterModal}
        onHide={() => setShowFilterModal(false)}
        categories={categoryOptions}
        sources={sourceOptions}
        authors={authorOptions}
        filterValues={newsFilters}
        onSubmit={(values) => {
          setNewsFilters(values);
          setShowFilterModal(false);
        }}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  newsList: state.news.newsList,
  pagination: state.news.pagination,
  categories: state.news.categories,
  sources: state.news.sources,
  authors: state.news.authors,
  isAuthorized: state.auth.isAuthenticated,
  loading: state.ui.loading,
});

export default connect(mapStateToProps, {
  getAllNews,
  getNewsMeta,
})(Home);
