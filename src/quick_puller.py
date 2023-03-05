import json

new = []

with open("world_universities_and_domains.json", "r", encoding="UTF-8") as file:
    stuffs = json.load(file)

print(len(stuffs))

for stuff in stuffs:
    if stuff["country"] == "Canada":
        new.append(stuff)

with open("unis.json", "w", encoding="UTF-8") as file:
    file.write(json.dumps(new, indent=4, sort_keys=True))
