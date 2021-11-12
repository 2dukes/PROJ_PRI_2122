.PHONY: all clean stats stats-img install-depend

datasets_folder = files/
scripts_folder = scripts/
python_requirements = requirements

main_datasets = coins news
merged_dataset = coins_news
clean_dataset = clean_coins

python_requirements_file = $(addsuffix .txt, $(python_requirements))
main_csv_datasets = $(addprefix $(datasets_folder), $(addsuffix .csv, $(main_datasets)))
merged_csv_dataset = $(addprefix $(datasets_folder), $(addsuffix .csv, $(merged_dataset)))
clean_csv_dataset = $(addprefix $(datasets_folder), $(addsuffix .csv, $(clean_dataset)))

all: $(clean_csv_dataset)

$(merged_csv_dataset): $(main_csv_datasets)
	@echo "Merging Coins and News Datasets..."
	python3 $(scripts_folder)merge.py

$(clean_csv_dataset): $(merged_csv_dataset)
	@echo "Cleaning Dataset..."
	python3 $(scripts_folder)clean.py

install-depend:
	pip install -r $(python_requirements_file)

stats-img: $(clean_csv_dataset)
	@echo "Generating images used for statistics, this will take a while..."
	nbterm --run Statistics.ipynb
	rm Statistics_run.ipynb

stats: $(clean_csv_dataset)
	@echo "Opening Notebook with Dataset Statistics..."
	jupyter notebook Statistics.ipynb

clean:
	rm $(merged_csv_dataset) $(clean_csv_dataset)
