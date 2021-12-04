import csv
import json
import ast

def toJson(csvFilePath, jsonFilePath):
    jsonArray = []
    with open(csvFilePath, encoding="utf-8") as csvFile:
        csvReader = csv.DictReader(csvFile)

        problematic_cols = ["categories", "homepage_link", "blockchain_site", "news_titles", "news_articles", "news_urls"]
        float_cols = ["price_change_percentage_1y", "price_change_percentage_30d", "price_change_percentage_7d"]
        
        for row in csvReader:
            for col in (problematic_cols + float_cols):
                try:
                    value = row[col]
                    # print(f"col: {col}")
                    if col in float_cols:
                        print(value)
                        value = float(value)
                        print(value)
                        row[col] = value
                    else:
                        row[col] = ast.literal_eval(value)
                    print(row[col] + " ---> " + type(row[col]))
                except Exception as err:
                    pass
            jsonArray.append(row)
        
            

    with open(jsonFilePath, "w", encoding="utf-8") as jsonFile:
        jsonString = json.dumps(jsonArray, indent=4)
        jsonFile.write(jsonString)


csvFilePath = "files/clean_coins.csv"    
jsonFilePath = "files/clean_coins.json"
toJson(csvFilePath, jsonFilePath)