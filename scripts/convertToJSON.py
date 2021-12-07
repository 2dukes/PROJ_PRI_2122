import csv
import json
import ast

def toJson(csvFilePath, jsonFilePath):
    jsonArray = []
    all_urls = []
    with open(csvFilePath, encoding="utf-8") as csvFile:
        csvReader = csv.DictReader(csvFile)

        problematic_cols = ["categories", "homepage_link", "blockchain_site"]
        float_cols = ["price_change_percentage_1y", "price_change_percentage_30d", "price_change_percentage_7d"]
        news_cols = ["news_titles", "news_articles", "news_urls"]

        for row in csvReader:
            for col in (problematic_cols + float_cols):
                try:
                    value = row[col]
                    # print(f"col: {col}")
                    if col in float_cols:
                        value = float(value)
                        row[col] = value
                    else:
                        row[col] = ast.literal_eval(value)

                    print(row[col] + " ---> " + type(row[col]))
                except Exception as err:
                    pass
            
            current_news = []
            
            if row["news_titles"] != "" and row["news_articles"] != "" and row["news_urls"] != "":
                titles = ast.literal_eval(row["news_titles"])
                articles = ast.literal_eval(row["news_articles"])
                urls = ast.literal_eval(row["news_urls"])
                news_len = min(len(titles), len(articles), len(urls))
                # print(f"Len news: {news_len}")
                # print("-------")


                for i in range(news_len):
                    current_new = {}
                    current_new["title"] = titles[i]
                    current_new["article"] = articles[i]
                    current_new["url"] = urls[i]
                           
                    if current_new["url"] not in all_urls:    
                        current_news.append(current_new) 
                        all_urls.append(current_new["url"])
            
            
            
            row["news"] = current_news

            del row["news_titles"]
            del row["news_articles"]
            del row["news_urls"]
            jsonArray.append(row)


    with open(jsonFilePath, "w", encoding="utf-8") as jsonFile:
        jsonString = json.dumps(jsonArray, indent=4)
        jsonFile.write(jsonString)


csvFilePath = "files/clean_coins.csv"    
jsonFilePath = "files/clean_coins.json"
toJson(csvFilePath, jsonFilePath)