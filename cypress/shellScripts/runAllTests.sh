#!/bin/bash

exitCode=0
failedTests=()
video="--config video=false"

if [[ ! -z "$1" && "$1" == "video" ]]; then video=""; fi

for FILE in ./cypress/integration/*.js;
do
    ./node_modules/.bin/cypress run --browser firefox $video --spec $FILE
    if [ $? -ne 0 ]
    then
        exitCode=1
        allFailedTests+=( $FILE )
    fi
done

if [ ${#failedTests[@]} -ne 0 ]; then
    echo "${#failedTests[@]} failed tests found:"
    for i in "${failedTests[@]}"; do echo "$i"; done
else
    echo "No failed tests found."
fi

exit $exitCode
