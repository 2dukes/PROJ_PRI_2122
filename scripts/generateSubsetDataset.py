import json
import random

jsonFilePath = "files/clean_coins_ndjson.json"
subsetFilePath = "elasticsearch/subset_dataset_new.json"

random_ids = [
    # 89, 856, 441, 960, 4033, 5672,
    # 890, 8560, 4410, 9000, 33, 672,
    # 393, 2507, 732, 2399, 2936, 1240,
    # 3263, 446, 4693, 4837, 4838, 4879,
    # 4939, 4956, 4959, 5658, 6678, 3503,
    # 995,  # bitcoin
    # 2990  # ethereum
    1341, 5537, 7790, 2238, 2239, 2927, 3935
]

# NUMBER_OF_ROWS = 100 - 6*6 - 2
# TOTAL_IDS = 9575

# for _ in range(NUMBER_OF_ROWS):
#     random_id = random.randint(1, TOTAL_IDS)
#     while (random_id in random_ids):
#         random_id = random.randint(1, TOTAL_IDS)

#     random_ids.append(random_id)


with open(jsonFilePath, "r") as file:
    for c, line in enumerate(file.readlines()):
        line_num = c + 1
        if line_num in random_ids:
            with open(subsetFilePath, "a+") as subset_file:
                new_line = '{"index": {"_id":' + str(line_num) + '}}\n'
                subset_file.write(new_line)
                subset_file.write(line)
