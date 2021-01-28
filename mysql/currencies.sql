ALTER TABLE rates
DROP FOREIGN KEY FK_Rate_Currency;

DROP TABLE IF EXISTS currencies;

CREATE TABLE currencies(
    id INT(6) UNSIGNED PRIMARY KEY,
    descr VARCHAR(30) NOT NULL,
    symbol VARCHAR(3) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO currencies(id, descr, symbol)
VALUES
(1, 'bitcoin', 'BTC'),
(2, 'etherum', 'ETH'),
(3, 'cardano', 'ADA');