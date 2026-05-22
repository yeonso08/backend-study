CREATE TABLE comment_likes (
  user_id UUID NOT NULL,
  comment_id UUID NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT pk_comment_likes
    PRIMARY KEY (user_id, comment_id),

  CONSTRAINT fk_comment_likes_user
    FOREIGN KEY (user_id)
    REFERENCES users(id),

  CONSTRAINT fk_comment_likes_comment
    FOREIGN KEY (comment_id)
    REFERENCES comments(id)
);
