from flask_msearch import Search
from database.database import db

search = Search(db=db)
