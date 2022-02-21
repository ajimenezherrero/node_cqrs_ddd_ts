CREATE TABLE recipe_step (
  id uuid PRIMARY KEY,
  recipe_id uuid,
  instruction TEXT,
  position TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);