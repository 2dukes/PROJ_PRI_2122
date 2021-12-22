import requests
import sys

word = sys.argv[1]

url = f"https://api.dictionaryapi.dev/api/v2/entries/en/{word}"

response = requests.request("GET", url)

with open("result.json", "w") as result_file:
    result_file.write(response.text)
