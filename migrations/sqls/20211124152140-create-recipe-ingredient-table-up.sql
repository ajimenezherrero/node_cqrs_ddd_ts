CREATE TABLE recipe_ingredient (
  id uuid PRIMARY KEY,
  recipe_id uuid,
  ingredient_id uuid,
  measurement_id uuid,
  amount real,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);