import "./css/UserCard.css";

function UserCard({
    data: {
        name = "Harsh",
        email = "one@one.com",
        phone = 9445552,
        cell = 2233,
        location,
        picture,
        dob,
        login,
    },
}) {
    return (
        <div className="user-card">
            <img
                src={picture.large}
                alt={`${name.first} ${name.last}`}
                className="user-avatar"
            />
            <h2>
                {name.title} {name.first} {name.last}
            </h2>
            <p>
                <strong>Email:</strong> {email}
            </p>
            <p>
                <strong>Phone:</strong> {phone}
            </p>
            <p>
                <strong>Cell:</strong> {cell}
            </p>
            <p>
                <strong>Username:</strong> {login.username}
            </p>
            <p>
                <strong>DOB:</strong> {new Date(dob.date).toLocaleDateString()}{" "}
                (Age: {dob.age})
            </p>
            <p>
                <strong>Location:</strong> {location.city}, {location.state},{" "}
                {location.country}
            </p>
            <p>
                <strong>Street:</strong> {location.street.number}{" "}
                {location.street.name}
            </p>
            <p>
                <strong>Timezone:</strong> {location.timezone.description}
            </p>
        </div>
    );
}

export default UserCard;
