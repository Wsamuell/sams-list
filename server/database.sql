CREATE DATABASE samslist;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  username CHAR(15) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(30) NOT NULL,
  created_on TIMESTAMPTZ
);

CREATE TABLE money_owed(
  id SERIAL PRIMARY KEY,
  user_id INT,
  lender_name VARCHAR(255) NOT NULL,
  amount_owed INT,
  interest_rate DECIMAL,
  due_date DATE,
  payoff_date DATE,
  created_on TIMESTAMPTZ,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- need to create a payout plan graph
-- user payoff info
