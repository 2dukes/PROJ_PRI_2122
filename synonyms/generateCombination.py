import sys

config_num = int(sys.argv[1])

original_content = None

with open("synonyms/list_files/original_synonyms.txt", "r") as original_file:
    original_content = original_file.read()

comb1 = ["synonyms.txt"]
comb2 = ["filtered_synonyms.txt"]
comb3 = ["symbol_synonyms.txt"]
comb4 = ["filtered_synonyms.txt", "symbol_synonyms.txt"]

comb_content = original_content

comb = None

if config_num == 1:
    comb = comb1
elif config_num == 2:
    comb = comb2
elif config_num == 3:
    comb = comb3
elif config_num == 4:
    comb = comb4
else:
    print("Invalid combination number!")
    sys.exit(1)
    
    
for filename in comb:
    with open(f"synonyms/list_files/{filename}", "r") as file:
        comb_content += "\n" + file.read()
with open(f"synonyms/combinations/{config_num}.txt", "w") as comb_file:
    comb_file.write(comb_content)