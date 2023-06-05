select * from users;

select * from matches;
-- INCOMING --
select * from matches as m
                  LEFT JOIN (Select full_name, details, user_hash, lat, long, birthday from users) as user_query
                            ON user_query.user_hash = m.second_user_match
                  LEFT JOIN (SELECT user_hash_id, storage_bucket_id from user_photos LIMIT 1) as photo_query
                            ON photo_query.user_hash_id = m.second_user_match
where m.first_user_match = '15db4664e9ca5a4ed2f5d0978ff402481016686d'
  AND m.operation = 'LIKE'
  AND NOT EXISTS (select * from matches as m2 where m.second_user_match = m2.first_user_match);


-- MUTUAL --
select * from matches as m
                  LEFT JOIN (Select full_name, details, user_hash, lat, long, birthday from users) as user_query
                            ON user_query.user_hash = m.second_user_match
                  LEFT JOIN (SELECT user_hash_id, storage_bucket_id from user_photos LIMIT 1) as photo_query
                            ON photo_query.user_hash_id = m.second_user_match
where m.first_user_match = '15db4664e9ca5a4ed2f5d0978ff402481016686d'
  AND m.operation = 'LIKE'
  AND EXISTS (select * from matches as m2 where m.second_user_match = m2.first_user_match);

DELETE FROM matches where matches.first_user_match = '15db4664e9ca5a4ed2f5d0978ff402481016686d'
