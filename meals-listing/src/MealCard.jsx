
const MealCard = ({ meal }) => {
    return (
        <article className="meal-card">
            <div className="meal-card__image-wrap">
                <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="meal-card__image"
                />
            </div>

            <div className="meal-card__content">
                <div className="meal-card__header">
                    <h2 className="meal-card__title">
                        {meal.strMeal} ({meal.strArea})
                    </h2>
                    <p className="meal-card__meta">Category: {meal.strCategory}</p>
                </div>

                <div className="meal-card__body">
                    <div className="meal-card__section">
                        <h3 className="meal-card__section-title">Ingredients</h3>
                        <ul className="meal-card__list">
                            {Array.from({ length: 20 }, (_, i) => {
                                const ingredient = meal[`strIngredient${i + 1}`];
                                const measure = meal[`strMeasure${i + 1}`];
                                if (ingredient && ingredient.trim() !== "") {
                                    return (
                                        <li key={i}>
                                            {ingredient} —{" "}
                                            <span>{measure}</span>
                                        </li>
                                    );
                                }
                                return null;
                            })}
                        </ul>
                    </div>

                    <div className="meal-card__section">
                        <h3 className="meal-card__section-title">Instructions</h3>
                        <p className="meal-card__instructions">
                            {meal.strInstructions}
                        </p>
                    </div>
                </div>

                <div className="meal-card__links">
                    {meal.strYoutube && (
                        <a
                            href={meal.strYoutube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="meal-card__link"
                        >
                            ▶ Watch on YouTube
                        </a>
                    )}
                    {meal.strSource && (
                        <a
                            href={meal.strSource}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="meal-card__link"
                        >
                            📖 Source
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
};

export default MealCard;
