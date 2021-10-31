import os
import os

from dotenv import load_dotenv

load_dotenv()

db_url = (
    f"cockroachdb://{os.environ['DB_USER']}:{os.environ['DB_PASSWORD']}"
    + f"@free-tier.gcp-us-central1.cockroachlabs.cloud:26257/"
    + f"{os.environ['DB_NAME']}?sslmode=require"
)
