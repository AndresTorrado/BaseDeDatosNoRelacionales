CREATE TABLE IF NOT EXISTS tesla.telemetria (
	user text,
	date timestamp,
	id uuid,
	average_speed double,
	cadence double,
	calories double,
	comment text,
	description text,
	distance double,
	duration double,
	effort int,
	kudos int,
	location text,
	photo text,
	text text,
	title text,
	type text,
	url text,
	comments set<text>,
	PRIMARY KEY (user, date, id))
	WITH ID = e9790360-f663-11ec-bafa-09da7d543ac7
	AND CLUSTERING ORDER BY (date DESC, id ASC)
	AND bloom_filter_fp_chance = 0.01
	AND dclocal_read_repair_chance = 0.1
	AND crc_check_chance = 1.0
	AND default_time_to_live = 0
	AND gc_grace_seconds = 864000
	AND min_index_interval = 128
	AND max_index_interval = 2048
	AND memtable_flush_period_in_ms = 0
	AND read_repair_chance = 0.0
	AND speculative_retry = '99PERCENTILE'
	AND comment = ''
	AND caching = { 'keys': 'ALL', 'rows_per_partition': 'NONE' }
	AND compaction = { 'max_threshold': '32', 'min_threshold': '4', 'class': 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy' }
	AND compression = { 'chunk_length_in_kb': '64', 'class': 'org.apache.cassandra.io.compress.LZ4Compressor' }
	AND cdc = false
	AND extensions = {  };
