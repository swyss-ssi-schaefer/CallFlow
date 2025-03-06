#!/bin/bash

echo "Checking CallFlow Services..."

# Server prüfen (läuft auf Port 3000)
if nc -z localhost 3000; then
  echo "✅ Server is running on port 3000"
else
  echo "❌ Server is NOT running on port 3000"
fi

# Admin-Client prüfen (läuft auf Port 4000)
if nc -z localhost 4000; then
  echo "✅ Admin Client is running on port 4000"
else
  echo "❌ Admin Client is NOT running on port 4000"
fi

# Client prüfen (läuft auf Port 5000)
if nc -z localhost 5000; then
  echo "✅ Client is running on port 5000"
else
  echo "❌ Client is NOT running on port 5000"
fi

echo "Status check completed!"
