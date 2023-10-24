import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllNews,
  getAllCategoriesAndSources,
} from "../../setup/redux/actions/newsAction";
import Card from "react-bootstrap/Card";
import ReactPaginate from "react-paginate";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "./home.module.css";
import NewsFilter from "../../components/NewsFilter";

const NewsCard = ({ news }) => (
  <Card className="mb-3 me-3" style={{ width: "350px" }}>
    <Card.Img
      variant="top"
      src={news.thumbnail_url}
      style={{ height: "230px" }}
    />
    <Card.Body className="text-start">
      <Card.Title>{truncateTitle(news.title, 100)}</Card.Title>
      <Card.Text>{truncateTitle(news.slug, 120)}</Card.Text>
      <Link to={`/news/${news.id}`} className="btn btn-primary">
        Read More
      </Link>
    </Card.Body>
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
  getAllCategoriesAndSources,
}) => {
  const { itemsPerPage, lastPage } = pagination;

  const [searchTerm, setSearchTerm] = useState("");
  const [delayedSearch, setDelayedSearch] = useState(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [newsFilters, setNewsFilters] = useState(null);

  const handlePageClick = ({ selected }) => {
    getAllNews({ page: selected + 1, per_page: itemsPerPage });
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    clearTimeout(delayedSearch);

    if (term.length > 3 || term.length === 0) {
      setDelayedSearch(
        setTimeout(() => {
          getAllNews({ page: 1, keyword: term });
        }, 1000)
      );
    }
  };

  const makeOptions = (array) => {
    return array?.map((item) => {
      return { label: item.name, value: item.id };
    });
  };

  const categoryOptions = makeOptions(categories);
  const sourceOptions = makeOptions(sources);

  const openFilterModal = () => {
    setShowFilterModal(true);
  };

  const closeFilterModal = () => {
    setShowFilterModal(false);
  };

  useEffect(() => {
    getAllNews(newsFilters);
  }, [newsFilters]);

  useEffect(() => {
    getAllNews();
    getAllCategoriesAndSources();
  }, [getAllNews, getAllCategoriesAndSources]);

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
      </div>

      <div className={`w-100 d-flex flex-wrap justify-content-center mb-5`}>
        {newsList.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>
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
      />

      <NewsFilter
        show={showFilterModal}
        onHide={closeFilterModal}
        categories={categoryOptions}
        sources={sourceOptions}
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
});

export default connect(mapStateToProps, {
  getAllNews,
  getAllCategoriesAndSources,
})(Home);
