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


select calculate_distance(0, 0, users.lat, users.long, 'KM'), user_hash, full_name, birthday, gender, email, mood, relations, lat, long from users
where
    (CASE WHEN true THEN calculate_distance(0, 0, users.lat, users.long, 'KM') > 1 ELSE true END)
  AND
    (CASE WHEN false THEN birthday = (CURRENT_DATE - interval '4 years') OR birthday = (CURRENT_DATE + interval '4 years') ELSE true END) AND
    (CASE WHEN false THEN GENDER = 'male' ELSE true END) AND
    (CASE WHEN false THEN relations = 'single' else true end)

UNION
select calculate_distance(0, 0, users.lat, users.long, 'KM'), user_hash, full_name, birthday, gender, email, mood, relations, lat, long from users
where
    (CASE WHEN true THEN calculate_distance(0, 0, users.lat, users.long, 'KM') > 1 ELSE true END)
  AND
    (CASE WHEN false THEN birthday = (CURRENT_DATE - interval '4 years') OR birthday = (CURRENT_DATE + interval '4 years') ELSE true END) AND
    (CASE WHEN false THEN GENDER = 'male' ELSE true END)
  AND (CASE WHEN false THEN EXISTS (Select * from user_interests
                                    where user_hash_id = users.user_hash
                                      and user_interests.interests_id in (1, 2, 3)) ELSE TRUE END)
  AND (CASE WHEN false THEN EXISTS ( Select * from tags
                                     where user_hash_id = users.user_hash
                                       and tags.id in (1,2,3)
    ) ELSE true END)


    INSERT INTO interests ( interests_label ) VALUES
    (	'📷   Photography' ),
    ( '🛍️   Shopping'),
    ('🎙️   Karaoke'),
    (  '🧘‍♀️   Yoga'),
    ( '🍪   Cooking'),
    ( '🎾   Tennis'),
    ( '👟   Run'),
    ( '🏊   Swimming'),
    ('🎨   Art'),
    ( '🌆   Traveling'),
    ( '🥾   Extreme'),
    ( '🎵    Music'),
    ( '🍹   Drink'),
    ( '🎮   Games')

