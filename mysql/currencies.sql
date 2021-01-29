CREATE TABLE currencies(
    id INT(6) UNSIGNED PRIMARY KEY,
    description VARCHAR(30) NOT NULL,
    symbol VARCHAR(3) NOT NULL
);

INSERT INTO currencies(id, description, symbol)
VALUES
(1, 'bitcoin', 'BTC'),
(2, 'etherum', 'ETH'),
(3, 'cardano', 'ADA');