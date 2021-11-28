import csv
import json
import ast

def toJson(csvFilePath, jsonFilePath):
    jsonArray = []
    with open(csvFilePath, encoding="utf-8") as csvFile:
        csvReader = csv.DictReader(csvFile)

        problematic_cols = ["categories", "homepage_link", "blockchain_site", "news_titles", "news_articles", "news_urls"]
        
        for row in csvReader:
            for col in problematic_cols:
                try:
                    # print("Before: " + row[col])
                    row[col] = ast.literal_eval(row[col])
                    # print("After: ", row[col])
                except Exception as err:
                    # print(err)
                    pass
            jsonArray.append(row)
        
            
        # print(jsonArray[0])

    with open(jsonFilePath, "w", encoding="utf-8") as jsonFile:
        jsonString = json.dumps(jsonArray, indent=4)
        jsonFile.write(jsonString)


csvFilePath = "files/clean_coins.csv"    
jsonFilePath = "files/clean_coins.json"
toJson(csvFilePath, jsonFilePath)