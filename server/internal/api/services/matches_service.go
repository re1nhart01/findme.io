package services

import (
	"errors"
	"gorm.io/gorm"
	"internal/models"
	"internal/pg_database"
	"time"
)

type MatchesService struct {
	*BaseService
	*NotificationService
}

const (
	MATCH_TYPE_MUTUAL   = "mutual"
	MATCH_TYPE_INCOMING = "incoming"

	MATCH_TYPE_DISLIKES  = "dislikes"
	MATCH_ACTION_LIKE    = "LIKE"
	MATCH_ACTION_DISLIKE = "DISLIKE"
)

func (matches *MatchesService) GetService() any {
	return matches
}

func (matches *MatchesService) RequestForMatchesList(userHash string, flags map[string]any, currentUserModel *models.UserModelFull, tagsIds, interestsIds []int) ([]*models.UserModel, error) {
	distance := int(flags["distance"].(float64))
	years := int(flags["years"].(float64))
	var userMatchList []*models.UserModel
	if res := pg_database.
		GetDatabaseInstance().
		Instance.
		Table(models.USERS).
		Raw(models.GetMatchList(flags, currentUserModel, distance, years, tagsIds, interestsIds)).Scan(&userMatchList); res.Error != nil {
		return []*models.UserModel{}, res.Error
	}
	return userMatchList, nil
}

func (matches *MatchesService) GetUserMatches(userHash, matchType string) ([]*models.FullUserMatchModel, error) {
	var modelList []*models.FullUserMatchModel
	query := models.GetMatches(matchType)
	if res := pg_database.GetDatabaseInstance().Instance.Raw(query, userHash).Scan(&modelList); res.Error != nil {
		return []*models.FullUserMatchModel{}, res.Error
	}
	return modelList, nil
}

func (matches *MatchesService) SwipeMatch(userHash string, fields map[string]any) error {
	mutualHash := fields["user_hash_refer"].(string)
	operation := fields["operation"].(string)
	isExistsMySwipe := matches.checkMatches(userHash, mutualHash)
	if isExistsMySwipe {
		return errors.New("match with this id is already exists" + mutualHash)
	}

	model := models.MatchesModel{
		FirstUserMatch:  userHash,
		SecondUserMatch: fields["user_hash_refer"].(string),
		Operation:       operation,
		Ttl:             time.Now().Add(time.Hour * 168),
	}
	if res := pg_database.GetDatabaseInstance().Instance.Table(models.MATCHES).Create(&model); res.Error != nil {
		return res.Error
	}

	isExistsMutualSwipe := matches.checkMatches(mutualHash, userHash)
	if isExistsMutualSwipe && operation == "LIKE" {
		matches.SendPushByToken(mutualHash, PUSH_BODY_MUTUAL_MATCH, map[string]string{})
	} else if !isExistsMutualSwipe && operation == "LIKE" {
		matches.SendPushByToken(mutualHash, PUSH_BODY_MATCH, map[string]string{})
	}

	return nil
}
func (matches *MatchesService) UpdateUserMatch(userHash string, fields map[string]any) error {
	modelForUpdate := map[string]any{
		"operation": fields["operation"].(string),
		"ttl":       time.Now().Add(time.Hour * 168),
	}
	if res := pg_database.GetDatabaseInstance().Instance.Table(models.MATCHES).
		Where("first_user_match = ? AND second_user_match = ?", userHash, fields["user_hash_refer"]).
		Updates(&modelForUpdate); res.Error != nil {
		return res.Error
	}
	matches.NotificationService.SendPushByToken(fields["user_hash_refer"].(string), PUSH_BODY_UPDAT_MATCH, map[string]string{})
	return nil
}

func (matches *MatchesService) RemoveUserMatch(userHash string, fields map[string]any) error {
	mutualHash := fields["user_hash_refer"].(string)
	model := models.MatchesModel{
		FirstUserMatch:  userHash,
		SecondUserMatch: mutualHash,
	}

	if res := pg_database.GetDatabaseInstance().Instance.Table(models.MATCHES).
		Where("first_user_match = ? AND second_user_match = ?", userHash, mutualHash).Delete(&model); res.Error != nil {
		return res.Error
	} else if res.RowsAffected <= 0 {
		return errors.New("User is already deleted")
	}
	matches.NotificationService.SendPushByToken(mutualHash, PUSH_BODY_REMOVE_MATCH, map[string]string{})
	return nil
}

func (matches *MatchesService) getMatch(userHash, userReferHash string, model *models.MatchesModel) *gorm.DB {
	res := pg_database.
		GetDatabaseInstance().
		Instance.
		Table(models.MATCHES).
		Where("first_user_match = ? AND second_user_match = ?", userHash, userReferHash).
		Scan(&model)
	return res
}

func (matches *MatchesService) checkMatches(userHash, userReferHash string) bool {
	res := pg_database.
		GetDatabaseInstance().
		Instance.
		Table(models.MATCHES).
		Where("first_user_match = ? AND second_user_match = ?", userHash, userReferHash).
		Scan(&map[string]any{})
	return res.RowsAffected > 0
}
