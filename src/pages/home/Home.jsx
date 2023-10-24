import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAllNews } from "../../setup/redux/actions/newsAction";
import Card from "react-bootstrap/Card";
import ReactPaginate from "react-paginate";
import styles from "./home.module.css";

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

const Home = ({ newsList, pagination, getAllNews }) => {
  const { currentPage, itemsPerPage, lastPage } = pagination;

  const handlePageClick = ({ selected }) => {
    getAllNews({ current_page: selected + 1, per_page: itemsPerPage });
  };

  useEffect(() => {
    // Fetch news data when the component mounts
    getAllNews({ current_page: 1, per_page: itemsPerPage });
  }, [getAllNews, itemsPerPage]);

  return (
    <>
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
    </>
  );
};

const mapStateToProps = (state) => ({
  newsList: state.news.newsList,
  pagination: state.news.pagination,
});

export default connect(mapStateToProps, { getAllNews })(Home);
