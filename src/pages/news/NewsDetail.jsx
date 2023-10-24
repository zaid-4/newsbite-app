import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getNewsDetail } from "../../setup/redux/actions/newsAction";

const NewsDetail = ({ newsDetail, getNewsDetail }) => {
  const { newsId } = useParams();

  useEffect(() => {
    getNewsDetail(newsId);
  }, [getNewsDetail, newsId]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">{newsDetail.title}</h1>

      <img src={newsDetail.thumbnail_url} alt="Thumbnail" className="w-100" />

      <div className="mt-4">
        <p>Author: {newsDetail.author}</p>
        <p>Source: {newsDetail.source}</p>
        <p>Publish Date: {newsDetail.publish_date}</p>
      </div>

      <p className="mt-4 text-start">{newsDetail.description}</p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  newsDetail: state.news.newsDetail,
});

export default connect(mapStateToProps, { getNewsDetail })(NewsDetail);
