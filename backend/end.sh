#API_HOST="http://localhost:8787"
API_HOST="https://poweroutage.djtheredstoner.workers.dev"

curl $API_HOST/$(cat secret.txt)/end