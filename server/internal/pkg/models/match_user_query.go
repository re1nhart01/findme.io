package models

import (
	"fmt"
	"strconv"
)

func getSqlListFromSlice(tags []int) string {
	res := "("
	for k, v := range tags {
		if k < len(tags)-1 {
			res += strconv.Itoa(v) + ","
		} else {
			res += strconv.Itoa(v)
		}
	}
	res += ")"
	return res
}

func getMatchListWithoutArrays(lat, long float64, distance, years int, gender string, flags map[string]any) string {
	return fmt.Sprintf(`
select calculate_distance(%f, %f, users.lat, users.long, 'KM'), user_hash, full_name, birthday, gender, email, mood, relations, lat, long from users
	LEFT JOIN (SELECT user_hash_id, storage_bucket_id from user_photos LIMIT 1) as photo_query
                            ON photo_query.user_hash_id = users.user_hash
	where
	NOT EXISTS (select * from matches as m2 where users.user_hash = m2.first_user_match OR users.user_hash = m2.second_user_match) AND
	(CASE WHEN %t THEN calculate_distance(%f, %f, users.lat, users.long, 'KM') > %d ELSE true END) 
	AND
		(CASE WHEN %t THEN birthday < (CURRENT_DATE - interval '%d years') OR birthday > (CURRENT_DATE + interval '%d years') ELSE true END) AND
		(CASE WHEN %t THEN gender = '%s' ELSE true END)

`, lat, long, flags["by_coords"], lat, long, distance, flags["by_birthday"], years, years, flags["by_gender"], gender)
}

func getRelationsClause(flag any, relation string) string {
	return fmt.Sprintf(" AND (CASE WHEN %t THEN relations = '%s' else true end) ", flag, relation)
}

func getMatchListArrays(flags map[string]any, interests, tags []int) string {
	tagsList := getSqlListFromSlice(tags)
	interestsList := getSqlListFromSlice(interests)
	tagQuery := ""
	interestsQuery := ""
	if len(tags) != 0 {
		tagQuery = fmt.Sprintf(`
		AND (CASE WHEN %t THEN EXISTS (Select * from user_interests
		where user_hash_id = users.user_hash
		and user_interests.interests_id in %s) ELSE TRUE END)
`, flags["by_tags"], tagsList)
	}
	if len(interests) != 0 {
		interestsQuery = fmt.Sprintf(`
		AND (CASE WHEN %t THEN EXISTS ( Select * from tags 
	   where user_hash_id = users.user_hash
	   and tags.id in %s
	  ) ELSE true END)
	`, flags["by_interests"], interestsList)
	}

	return interestsQuery + " " + tagQuery
}

// lat, long float64, years, distance int, gender, relations string, interests, tags []int
func GetMatchList(flags map[string]any, currentUser *UserModelFull, distance, years int, interests, tags []int) string {
	mainClause := getMatchListWithoutArrays(currentUser.Lat, currentUser.Long, distance, years, currentUser.Gender, flags)
	tagsAndInterestsClause := getMatchListArrays(flags, interests, tags)
	relationClause := getRelationsClause(flags["by_relation"], currentUser.Relations)
	return mainClause + relationClause + " " + "UNION" + mainClause + " " + tagsAndInterestsClause
}
