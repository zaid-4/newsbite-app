import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAllNews, getNewsMeta } from "../../setup/redux/actions/newsAction";
import Card from "react-bootstrap/Card";
import ReactPaginate from "react-paginate";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "./home.module.css";
import NewsFilter from "../../components/NewsFilter";

const NewsCard = ({ news }) => (
  <Card className={`mb-5 ${styles.newsCard}`} style={{ width: "350px" }}>
    {news.thumbnail_url ? (
      <Card.Img
        variant="top"
        className={styles.thumbnail}
        src={news.thumbnail_url}
      />
    ) : (
      <div className={styles.noThumnail}>{news.source}</div>
    )}
    <Card.Body className="text-start d-flex flex-column justify-content-between">
      <div>
        <Card.Title>
          <Link to={`/news/${btoa(news.id)}`} className="">
            {truncateTitle(news.title, 100)}
          </Link>
        </Card.Title>
        <Card.Text className="mb-2">{truncateTitle(news.slug, 120)}</Card.Text>
      </div>
      <Card.Text className="d-flex flex-column justify-content-between">
        <span>
          <b>Published At:</b> {news.published_at}
        </span>
        <span>
          <b>Author:</b> {news?.author || "Unknown"}
        </span>
      </Card.Text>
    </Card.Body>
    <Card.Footer className="text-start">
      <b>Source:</b>{" "}
      <a
        href={news.source_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-decoration-none"
      >
        {news.source}
      </a>
    </Card.Footer>
  </Card>
);

const truncateTitle = (title, maxLength) => {
  return title.length > maxLength
    ? `${title.substring(0, maxLength)}...`
    : title;
};

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

  const makeOptions = (array) => {
    return array?.map((item) => {
      return { label: item.name, value: item.id };
    });
  };

  const authorOptions = authors?.map((item) => {
    return { label: item, value: item };
  });

  const categoryOptions = makeOptions(categories);
  const sourceOptions = makeOptions(sources);

  const openFilterModal = () => {
    setShowFilterModal(true);
  };

  const closeFilterModal = () => {
    setShowFilterModal(false);
  };

  useEffect(() => {
    getAllNews(newsFilters, isAuthorized);
  }, [newsFilters]);

  useEffect(() => {
    getAllNews({ page: currentPage }, isAuthorized);
    getNewsMeta({}, isAuthorized);
  }, [getAllNews, getNewsMeta, isAuthorized]);

  return (
    <>
      <div className={`w-100 d-flex justify-content-between mb-4`}>
        <Form.Group className="mb-0">
          <Form.Control
            type="text"
            placeholder="Search News..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </Form.Group>
        <Button variant="primary" onClick={openFilterModal}>
          Filter
        </Button>
        {loading && "Loading..."}
      </div>

      <div className={`w-100 d-flex flex-wrap justify-content-between mb-5`}>
        {newsList.length > 0 ? (
          newsList.map((news) => <NewsCard key={news.id} news={news} />)
        ) : (
          <h3 className="mt-5 w-100 text-center">
            No news available, please update your news prefrences
          </h3>
        )}
      </div>
      {lastPage > 1 && (
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={lastPage}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
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
        onHide={closeFilterModal}
        categories={categoryOptions}
        sources={sourceOptions}
        authors={authorOptions}
        filterValues={newsFilters}
        onSubmit={(values) => {
          setNewsFilters(values);
          closeFilterModal();
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
