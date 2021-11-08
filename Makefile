.PHONY: stats

all: ./files/clean_coins.csv

./files/coins_news.csv:
	@echo "Merging coins.csv with news.csv."
	python3 scripts/merge.py

./files/clean_coins.csv: ./files/coins_news.csv
	@echo "Cleaning Dataset..."
	python3 scripts/clean.py

stats:
	@echo "Opening Notebook with Dataset Statistics..."
	jupyter notebook Statistics.ipynb