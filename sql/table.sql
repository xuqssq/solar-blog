CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT
);

CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  content JSONB NOT NULL,
  publish_time TIMESTAMP WITH TIME ZONE DEFAULT now(),
  url VARCHAR(512),
  category_id UUID REFERENCES categories(id)
);