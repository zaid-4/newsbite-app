import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import styles from "./home.module.css";
import { truncateTitle } from "../../utils/helpers";

export const NewsCard = ({ news }) => (
  <Card className={`mb-5 shadow ${styles.newsCard}`}>
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
    <Card.Footer className="text-start pt-3 pb-3">
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
