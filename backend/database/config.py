import os
import logging

from dotenv import load_dotenv

load_dotenv()

db_url = (
    f"cockroachdb://{os.environ['DB_USER']}:{os.environ['DB_PASSWORD']}"
    + f"@free-tier.gcp-us-central1.cockroachlabs.cloud:26257/"
    + f"{os.environ['DB_NAME']}?sslmode=require"
)

class Config(object):
    SQLALCHEMY_DATABASE_URI = db_url
    # when backend is elasticsearch, MSEARCH_INDEX_NAME is unused
    # flask-msearch will use table name as elasticsearch index name unless set __msearch_index__
    MSEARCH_INDEX_NAME = 'courses'
    # simple,whoosh,elaticsearch, default is simple
    MSEARCH_BACKEND = 'whoosh'
    # table's primary key if you don't like to use id, or set __msearch_primary_key__ for special model
    MSEARCH_PRIMARY_KEY = 'code'
    # auto create or update index
    MSEARCH_ENABLE = True
    # logger level, default is logging.WARNING
    MSEARCH_LOGGER = logging.DEBUG
    # SQLALCHEMY_TRACK_MODIFICATIONS must be set to True when msearch auto index is enabled
    SQLALCHEMY_TRACK_MODIFICATIONS = True
