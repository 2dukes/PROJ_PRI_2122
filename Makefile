default: remove-cols

remove-cols: filter-active
	csvcut -C subreddit,notice data/new_coins.csv > data/new_coins2.csv

filter-active: unzip-data data/coins.csv
	csvsql --query "SELECT * FROM coins WHERE status='active'" data/coins.csv > data/new_coins.csv

unzip-data: data/data.zip
	unzip data/data.zip -d data

zip-data:
	zip data.zip data/*.csv