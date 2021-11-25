CREATE TYPE difficulty AS ENUM ('LOW', 'MEDIUM', 'HIGH');

CREATE TABLE recipe (
  id uuid PRIMARY KEY,
  name    TEXT,
  description TEXT,
  duration TEXT,
  difficulty difficulty,
  categories uuid[],
  creator_id uuid NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);