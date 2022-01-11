import pandas as pd

filename = "files/coins.csv"
new_synonyms_filename = "synonyms/symbol_synonyms.txt"

data = pd.read_csv(filename)

symbols = data["symbol"]

ids = data["id"]

with open(new_synonyms_filename, "w") as file:
    for id, symbol in zip(ids, symbols):
        symbol = str(symbol).replace("$", "")
        file.write(f"\"{id}, {symbol}\",\n")