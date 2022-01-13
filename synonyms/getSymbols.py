import pandas as pd

stopwords = ["a", "an", "and", "are", "as", "at", "be", "but", "by",
    "for", "if", "in", "into", "is", "it",
    "no", "not", "of", "on", "or", "such",
    "that", "the", "their", "then", "there", "these",
    "they", "this", "to", "was", "will", "with"]

filename = "files/coins.csv"
new_synonyms_filename = "synonyms/list_files/symbol_synonyms.txt"

data = pd.read_csv(filename)

symbols = data["symbol"]

ids = data["id"]

with open(new_synonyms_filename, "w") as file:
    for id, symbol in zip(ids, symbols):
        skip = False
        split_id = id.split("-")
        for part in split_id:
            if part.lower() in stopwords:
                skip = True
                break
        if skip:
            continue
        symbol = str(symbol).replace("$", "")
        if len(symbol.split(" ")) == 1 and symbol.lower() not in stopwords and id.lower() not in stopwords:
            file.write(f"\"{id}, {symbol}\",\n")

need_to_remove_newline = False
file_content = None

with open(new_synonyms_filename, "r") as file:
    file_content = file.read()
    if file_content[-1] == "\n":
        need_to_remove_newline = True
        
if need_to_remove_newline:
    with open(new_synonyms_filename, "w") as file:
        file.write(file_content.strip("\n"))