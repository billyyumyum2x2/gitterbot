# open "http://localhost:8080/?ws=localhost:8080&port=5858" &

source bin/credentials-bothelp.sh

set -x

SERVER_ENV=${SERVER_ENV} \
GITTER_USER_TOKEN=${GITTER_USER_TOKEN} \
GITTER_APP_KEY=${GITTER_APP_KEY} \
GITTER_APP_SECRET=${GITTER_APP_SECRET} \
LOG_LEVEL=10 \
PORT=7891 \
    node-debug --harmony app.js
    # iojs debug app.js
    # nodemon -x iojs app.js
    # nodemon --harmony app.js

