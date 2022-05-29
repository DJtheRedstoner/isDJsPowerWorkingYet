#API_HOST="http://localhost:8787"
API_HOST="https://poweroutage.djtheredstoner.workers.dev"

echo -n "Enter your comment: "
read comment
curl $API_HOST/$(cat secret.txt)/comment -H "x-comment: $comment"