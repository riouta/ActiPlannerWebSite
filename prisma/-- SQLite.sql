-- SQLite
SELECT name, COUNT(*)
FROM Activity
GROUP BY name
HAVING COUNT(*) > 1;
