from django.shortcuts import render
Create your views here.

import pymongo
connect_string = 'mongodb+srv://maidenful:ut3c1313@map.oh2ui.mongodb.net/?retryWrites=true&w=majority'

from django.conf import settings
my_client = pymongo.MongoClient(connect_string)

# Now get/create collection name (remember that you will see the database in your mongodb cluster only after you create a collection
collection_name = dbname["MapDB"]

map_1 = {
    "map_id": "RR000123456",
    "user_id" : "UncleMachete",
    "map_file" : "./RR000123456.xml",
}
map_2 = {
    "map_id": "RR000123457",
    "user_id" : "Waoty",
    "map_file" : "./RR000123457.xml",
}
map_3 = {
    "map_id": "RR000123458",
    "user_id" : "Munay",
    "map_file" : "./RR000123458.xml",
}
map_4 = {
    "map_id": "RR000123459",
    "user_id" : "REKY",
    "map_file" : "./RR000123459.xml",
}
collection_name.insert_many([map_1,map_2,map_3,map_4])

count = collection_name.count()
print('elements:')
print(count)
