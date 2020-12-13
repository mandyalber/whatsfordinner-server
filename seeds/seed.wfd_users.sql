BEGIN;

TRUNCATE
  wfd_users
  RESTART IDENTITY CASCADE;

INSERT INTO wfd_users (email, display_name, password)
VALUES
    ('me@me.com', 'Dunder Mifflin', '$2a$12$lHK6LVpc15/ZROZcKU00QeiD.RyYq5dVlV/9m4kKYbGibkRc5l4Ne'),
    ('you@you.com', 'Bodeep Deboop', '$2a$12$VQ5HgWm34QQK2rJyLc0lmu59cy2jcZiV6U1.bE8rBBnC9VxDf/YQO'),
    ('them@them.com', 'Charlie', '$2a$12$2fv9OPgM07xGnhDbyL6xsuAeQjAYpZx/3V2dnu0XNIR27gTeiK2gK');
    
COMMIT;




