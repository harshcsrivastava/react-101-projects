import "./css/QuoteCard.css";

type QuoteCardProps = {
    variant?: "v1" | string;
    quote: string;
    author: string;
    imageSrc: string;
};

const QuoteCard = ({ variant = "v1", quote, author, imageSrc }: QuoteCardProps) => {
    return (
        <div className={`quote-card ${variant}`}>
            <div className="card-header">
                <h3 className="title">QUOTE LIBRARY</h3>
                <div className="divider">
                    <span></span>
                    <span className="dot"></span>
                    <span></span>
                </div>
            </div>

            <div className="card-image">
                <img src={imageSrc} alt="quote visual" />
            </div>

            <div className="quote-content">
                <span className="quote-mark">“</span>
                <p className="quote-text">{quote}</p>
            </div>

            <div className="author-section">
                <div className="divider">
                    <span></span>
                    <span className="dot"></span>
                    <span></span>
                </div>
                <p className="author">{author}</p>
            </div>

            <div className="card-footer-pattern"></div>
        </div>
    );
};

export default QuoteCard;
