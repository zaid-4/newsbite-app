import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getNewsDetail } from "../setup/redux/actions/newsAction";
import { Button } from "react-bootstrap";
import { MdOutlineKeyboardBackspace as BackArrow } from "react-icons/md";
import styles from "./home/home.module.css";
import Loader from "../components/Loader";

const NewsDetail = ({ newsDetail, getNewsDetail, loading }) => {
  const { newsId } = useParams();
  const [descriptionParagraphs, setDescriptionParagraphs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getNewsDetail(atob(newsId));
  }, [getNewsDetail, newsId]);

  useEffect(() => {
    if (newsDetail.description) {
      const sentences = newsDetail.description.split(/\.(?=\s)/);
      const paragraphs = [];
      for (let i = 0; i < sentences.length; i += 5) {
        const paragraph = sentences.slice(i, i + 5).join(". ");
        paragraphs.push(paragraph);
      }
      setDescriptionParagraphs(paragraphs);
    }
  }, [newsDetail.description]);

  return (
    <div className="container mt-4">
      <Loader loading={loading} />
      <h1 className="mb-4">{newsDetail.title}</h1>
      <div className="w-100 text-start mb-3">
        <Button variant="secondary" onClick={() => navigate(-1)}>
          <BackArrow size={24} style={{ cursor: "pointer" }} /> {"Back"}
        </Button>
      </div>

      {newsDetail.thumbnail_url ? (
        <img src={newsDetail.thumbnail_url} alt="Thumbnail" className="w-100" />
      ) : (
        <div className={styles.noThumnail}>{newsDetail.source}</div>
      )}

      <div className="mt-4 d-flex flex-column align-items-center w-100">
        <div className="w-25 text-start">
          <p>
            <b>Author:</b> {newsDetail.author}
          </p>
          <p>
            <b>Publish Date:</b> {newsDetail.published_at}
          </p>
          <p>
            <b>Source: </b>
            <a
              href={newsDetail.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              {newsDetail.source}
            </a>
          </p>
        </div>
      </div>

      <div className="mt-4 text-start">
        {descriptionParagraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
        {!newsDetail.description && (
          <a
            href={newsDetail.source_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read More ...
          </a>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  newsDetail: state.news.newsDetail,
  loading: state.ui.loading,
});

export default connect(mapStateToProps, { getNewsDetail })(NewsDetail);
