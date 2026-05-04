import "./JokesCard.css";

const JokeCard = ({ data }) => {
    const { id, content, categories } = data;

    return (
        <div key={id} className="joke-card">
            <div className="joke-header">
                <span className="joke-id">Joke #{id}</span>
                {categories && categories.length > 0 && (
                    <span className="joke-category">
                        {categories.join(", ")}
                    </span>
                )}
            </div>

            <p className="joke-content">"{content}"</p>
        </div>
    );
};

export default JokeCard;
