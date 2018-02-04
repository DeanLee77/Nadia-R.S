BEGIN;
CREATE TABLE IF NOT EXISTS RULE
(
	RULE_ID BIGSERIAL PRIMARY KEY,
    NAME VARCHAR NOT NULL,
    CATEGORY VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS FILE
(
	FILE_ID BIGSERIAL PRIMARY KEY,
    RULE_ID BIGSERIAL REFERENCES RULE(RULE_ID),
    CREATED_DATE TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    FILES BYTEA NOT NULL
);

CREATE TABLE IF NOT EXISTS HISTORY
(
	HISTORY_ID BIGSERIAL PRIMARY KEY,
    RULE_ID BIGSERIAL REFERENCES RULE(RULE_ID),
    CREATED_DATE TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    HISTORY JSON NOT NULL
);
COMMIT;