import sys
import json

synonyms_filename = sys.argv[1]
synonyms = ""

with open("synonyms/original_synonyms.txt", "r") as original:
    synonyms = original.read().strip(",").split(",\n")

with open(synonyms_filename, "r") as synonyms_file:
    synonyms.extend(synonyms_file.read().strip(",").split(",\n"))

synonyms = list(map(lambda synonym: synonym.strip("\""), synonyms))

with open("elasticsearch/config.json", "r+") as config_file:
    config_data = json.load(config_file)
    config_data["settings"]["analysis"]["filter"]["synonym"]["synonyms"] = synonyms
    with open("elasticsearch/new_config.json", "w") as file:
        json.dump(config_data, file)
        