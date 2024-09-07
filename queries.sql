-- Retrieve posts by a specific user
SELECT * FROM posts
WHERE  id = 1

-- Count comments on a specific post
SELECT COUNT(*) AS comment_count
FROM comments
WHERE "postId" = 3;