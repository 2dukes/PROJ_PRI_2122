.PHONY: merge clean-data stats

merge:
	@echo "Merging coins.csv with news.csv."
	python3 scripts/merge.py

clean-data:
	@echo "Cleaning Dataset..."
	python3 scripts/clean.py

stats:
	@echo "Opening Notebook with Dataset Statistics..."
	jupyter notebook Statistics.ipynb