CREATE DATABASE samslist;

-- download extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

DROP FUNCTION trigger_set_timestamptz;
DROP TRIGGER set_timestamptz on users;

DROP TABLE users;

  -- please edit these for uniqueness
CREATE TABLE users (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
	username VARCHAR(50) NOT NULL UNIQUE,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	email VARCHAR(250) NOT NULL UNIQUE,
	PASSWORD VARCHAR(250) NOT NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
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
ALTER USER postgres WITH SUPERUSER;
grant all privileges on database samslist to postgres
psql -U postgres -d samuelwemimo
