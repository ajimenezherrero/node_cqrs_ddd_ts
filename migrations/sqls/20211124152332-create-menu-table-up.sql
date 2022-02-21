CREATE TABLE menu (
  id uuid PRIMARY KEY,
  name    TEXT,
  description TEXT,
  recipe_ids uuid[] NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);