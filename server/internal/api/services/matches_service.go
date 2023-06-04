package services

type MatchesService struct {
	*BaseService
}

func (matches *MatchesService) GetService() any {
	return matches
}
