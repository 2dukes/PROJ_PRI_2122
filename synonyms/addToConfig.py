import sys
import json

synonyms_filename = sys.argv[1]
synonyms = ""
mistakes = ["\n", ""]

# with open("synonyms/original_synonyms.txt", "r") as original:
#     synonyms = original.read().strip(",").split(",\n")

with open(synonyms_filename, "r") as synonyms_file:
    synonyms = synonyms_file.read().strip(",").split(",\n")

synonyms = list(map(lambda synonym: synonym.strip("\""), synonyms))

for mistake in mistakes:
    try:
        synonyms.remove(mistake)
    except:
        continue

with open("elasticsearch/configs/original.json", "r+") as config_file:
    config_data = json.load(config_file)
    config_data["settings"]["analysis"]["filter"]["synonym"]["synonyms"] = synonyms
    with open("elasticsearch/new_config.json", "w") as file:
        json.dump(config_data, file)
        