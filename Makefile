.PHONY: merge clean-data stats

install-depend:
	pip install pandas seaborn numpy matplotlib requests

merge: files/coins.csv files/news.csv
	@echo "Merging coins.csv with news.csv."
	python3 scripts/merge.py

clean-data: files/coins_news.csv
	@echo "Cleaning Dataset..."
	python3 scripts/clean.py

stats-img: files/coins.csv files/news.csv
	@echo "Generating images used for statistics, this will take a while..."
	nbterm --run Statistics.ipynb
	rm Statistics_run.ipynb

stats: files/coins.csv files/news.csv
	@echo "Opening Notebook with Dataset Statistics..."
	jupyter notebook Statistics.ipynb