import pandas as pd

coins = pd.read_csv("files/coins_news.csv")

# Removing symbol and name (equal to id)
coins = coins.drop(["symbol", "name"], axis=1)
# Removing all_time_high, correlation of 1 with current_price
coins = coins.drop("all_time_high(usd)", axis=1)

# Removing brackets and quotation marks from text fields and replacing NaN with empty string for columns with categorical data

trans_table = str.maketrans("[]'\"","    ")

coins["hashing_algorithm"] = coins["hashing_algorithm"].apply(lambda x: "" if pd.isnull(x) else str(x).translate(trans_table))
coins["categories"] = coins["categories"].apply(lambda x: "" if pd.isnull(x) else str(x).translate(trans_table))
coins["description"] = coins["description"].apply(lambda x: "" if pd.isnull(x) else str(x).translate(trans_table))
coins["homepage_link"] = coins["homepage_link"].apply(lambda x: "" if pd.isnull(x) else str(x).translate(trans_table))
coins["image_url"] = coins["image_url"].apply(lambda x: "" if pd.isnull(x) else str(x).translate(trans_table))
coins["headers"] = coins["headers"].apply(lambda x: "" if pd.isnull(x) else str(x).translate(trans_table))
coins["descriptions"] = coins["descriptions"].apply(lambda x: "" if pd.isnull(x) else str(x).translate(trans_table))
coins["urls"] = coins["urls"].apply(lambda x: "" if pd.isnull(x) else str(x).translate(trans_table))

# Save to file
coins.to_csv("files/clean_coins.csv")