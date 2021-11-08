.PHONY: stats stats-img

all: files/clean_coins.csv

files/coins_news.csv: files/coins.csv files/news.csv
	@echo "Merging coins.csv with news.csv."
	python3 scripts/merge.py

files/clean_coins.csv: files/coins_news.csv
	@echo "Cleaning Dataset..."
	python3 scripts/clean.py

stats-img: files/coins.csv files/news.csv
	@echo "Generating images used for statistics, this will take a while..."
	nbterm --run Statistics.ipynb
	rm Statistics_run.ipynb

stats:
	@echo "Opening Notebook with Dataset Statistics..."
	jupyter notebook Statistics.ipynb