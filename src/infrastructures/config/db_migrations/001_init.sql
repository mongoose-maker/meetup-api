CREATE TABLE IF NOT EXISTS meetups (
  id          SERIAL PRIMARY KEY,
  title       VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  tags        TEXT[] NOT NULL,
  date        TIMESTAMPTZ NOT NULL,
  location    VARCHAR(100) NOT NULL
);
