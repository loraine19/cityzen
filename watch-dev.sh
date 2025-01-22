#!/bin/bash

while true; do
  vite &
  PID=$!
  wait $PID
  EXIT_CODE=$?

  if [ $EXIT_CODE -ne 0 ]; then
    echo "Erreur détectée. Redémarrage du serveur Vite..."
  else
    echo "Serveur Vite arrêté. Redémarrage..."
  fi
done