package models

import "fmt"

const (
	CALCULATE_COORDS = "calculate_distance"
)

func CalculateCoords() string {
	return `
CREATE OR REPLACE FUNCTION calculate_distance(lat1 float, lon1 float, lat2 float, lon2 float, units varchar)
RETURNS float AS $dist$
DECLARE
dist float = 0;
radlat1 float;
radlat2 float;
theta float;
radtheta float;
BEGIN
IF lat1 = lat2 OR lon1 = lon2
THEN RETURN dist;
ELSE
radlat1 = pi() * lat1 / 180;
radlat2 = pi() * lat2 / 180;
theta = lon1 - lon2;
radtheta = pi() * theta / 180;
dist = sin(radlat1) * sin(radlat2) + cos(radlat1) * cos(radlat2) * cos(radtheta);

IF dist > 1 THEN dist = 1; END IF;

dist = acos(dist);
dist = dist * 180 / pi();
dist = dist * 60 * 1.1515;

IF units = 'K' THEN dist = dist * 1.609344; END IF;
IF units = 'N' THEN dist = dist * 0.8684; END IF;

RETURN dist;
END IF;
END;
$dist$ LANGUAGE plpgsql;`
}

func CreateExpireFunction(tableName, timeCol string) string {
	return fmt.Sprintf(`
CREATE OR REPLACE FUNCTION expire_table_delete_old_rows() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  DELETE FROM %s WHERE %s < NOW() - INTERVAL '1 minute';
  RETURN NEW;
END;
$$;`, tableName, timeCol)
}

func CreateExpireTrigger(tableName string) string {
	return fmt.Sprintf(`
CREATE OR REPLACE TRIGGER expire_table_delete_old_rows_trigger
    AFTER INSERT ON %s
    EXECUTE PROCEDURE expire_table_delete_old_rows();
`, tableName)
}
