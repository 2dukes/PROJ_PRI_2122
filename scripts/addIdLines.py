jsonFilePath = "files/clean_coins_ndjson.json"
resultFilePath = "files/final_json.json"

# { "index": { "_id": 200 } }

with open(jsonFilePath, "r") as file:
    for c, line in enumerate(file.readlines()):
        line_num = c + 1
        new_line = '{"index": {"_id":' + str(line_num) +'}}\n'
        with open(resultFilePath, "a") as new_file:
            new_file.write(new_line)
            new_file.write(line)