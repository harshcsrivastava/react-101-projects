import "./CatCard.css"; // optional external CSS for styling

const CatCard = ({ data }) => {
    const {
        name,
        weight,
        country_codes,
        description,
        origin,
        temperament,
        life_span,
        alt_names,
        image,
        wikipedia_url,
    } = data;
    return (
        <div className="cat-card">
            {/* Image */}
            <div className="cat-image">
                <img src={image} alt={name} />
            </div>

            {/* Content */}
            <div className="cat-content">
                <h2 className="cat-name">{name}</h2>
                <p className="cat-alt-names">
                    <strong>Also known as:</strong> {alt_names}
                </p>

                <p className="cat-description">{description}</p>

                <div className="cat-details">
                    <p>
                        <strong>Origin:</strong> {origin} ({country_codes})
                    </p>
                    <p>
                        <strong>Weight:</strong> {weight.metric} kg (
                        {weight.imperial} lbs)
                    </p>
                    <p>
                        <strong>Life Span:</strong> {life_span} years
                    </p>
                    <p>
                        <strong>Temperament:</strong> {temperament}
                    </p>
                </div>

                {/* External link */}
                <a
                    href={wikipedia_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="wiki-link"
                >
                    Learn more on Wikipedia →
                </a>
            </div>
        </div>
    );
};

export default CatCard;
