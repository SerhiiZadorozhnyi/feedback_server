create TABLE feedback(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    message VARCHAR(1000)
);