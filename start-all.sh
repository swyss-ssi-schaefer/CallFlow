#!/bin/bash

echo "Starting CallFlow Components..."

# Starte den Server
callflow-server/start-server.sh &

# Starte den Admin-Client
callflow-admin-client/start-admin.sh &

# Starte den normalen Client
callflow-client/start-client.sh &

echo "All components are starting..."
