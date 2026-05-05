import "./VideoCard.css";

const VideoCard = ({ key, items }) => {
    if (!items || !items.snippet) return null;

    const { snippet, contentDetails, statistics, id } = items;
    const { title, description, publishedAt, channelTitle, thumbnails, tags } =
        snippet;

    const { duration } = contentDetails;
    const { viewCount, likeCount, commentCount } = statistics;

    return (
        <div key= {key} className="video-card">
            <img
                src={thumbnails.high.url}
                alt={title}
                className="video-thumbnail"
            />
            <div className="video-info">
                <h2 className="video-title">{title}</h2>
                <p className="video-channel">By {channelTitle}</p>
                <p className="video-date">
                    Published: {new Date(publishedAt).toLocaleDateString()}
                </p>
                <p className="video-duration">
                    Duration: {duration.replace("PT", "").toLowerCase()}
                </p>
                <p className="video-description">{description}</p>
                <div className="video-stats">
                    <span>👀 {viewCount} views</span>
                    <span>👍 {likeCount} likes</span>
                    <span>💬 {commentCount} comments</span>
                </div>
                {tags && (
                    <div className="video-tags">
                        {tags.map((tag, index) => (
                            <span key={index} className="tag">
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
                <a
                    href={`https://www.youtube.com/watch?v=${id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="watch-btn"
                >
                    ▶ Watch on YouTube
                </a>
            </div>
        </div>
    );
};

export default VideoCard;
