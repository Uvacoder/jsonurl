
import secrets
import redis
import pymongo

id_length = 3


ids = []


def generate_id():
    id = secrets.token_urlsafe(id_length)
    if id in ids:
        return generate_id()
    ids.append(id)


def upload_to_mongo():
    client = pymongo.MongoClient("SECRET")
    db = client.jsonurl
    users = db["urls"]

    urls = []

    for id in ids:
        url = {'_id': id, 'timestamp': -1, 'body': ''}
        urls.append(url)

    print("converting to documents done")
    users.insert_many(urls)
    print("uploading to mongo done")


def backup_to_redis():
    rd = redis.StrictRedis(host='SECRET',
                           port=17051,
                           db=0,
                           username="SECRET",
                           password="SECRET"
                           )

    pipe = rd.pipeline()

    for id in ids:
        pipe.lpush("jsonurl_ids", id)
    pipe.execute()

    print("uploading to redis done")


for x in range(0, 50_000):
    if x % 1000 == 0:
        print(x)
    generate_id()

assert len(ids) == len(set(ids))

print("generation_done")

upload_to_mongo()
backup_to_redis()
