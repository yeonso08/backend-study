CREATE TABLE post_likes (
  user_id UUID NOT NULL,
  post_id UUID NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT pk_post_likes
    PRIMARY KEY (user_id, post_id),

  CONSTRAINT fk_post_likes_user
    FOREIGN KEY (user_id)
    REFERENCES users(id),

  CONSTRAINT fk_post_likes_post
    FOREIGN KEY (post_id)
    REFERENCES posts(id)
);
