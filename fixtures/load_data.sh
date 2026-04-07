#!/bin/bash

set -e


COLLECTION_NAME=${COLLECTION_NAME:-ursus}
DATA_DIR=${DATA_DIR:-/fixtures}


echo "Starting Solr in the background...!!!"
# Start Solr in the background, the control script handles the background process
bin/solr start

# Wait a few seconds for Solr to fully start up
sleep 3

echo "Indexing data..."
bin/post -c $COLLECTION_NAME $DATA_DIR/*.jsonl

# load CSVs with feed_ursus hered

echo "Indexing complete. Stopping Solr..."
# Stop the Solr instance
bin/solr stop

echo "Solr stopped."
