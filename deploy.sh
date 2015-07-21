#!/bin/bash
Host="$1"
HostDir="$2"

if [ "$#" -ne 2 ]; then
  echo "Usage: $0 Host HostDir \n Exemple ./deploy.sh user@127.0.0.1 /home/apps/innovalys-social-network" >&2
  exit 1
fi

echo "Build client app"
npm run build
echo "Build server app"
echo "Sync -> $Host:$HostDir"
/usr/local/Cellar/rsync/3.1.1/bin/rsync -e ssh -vra --delete-after --exclude="node_modules" --exclude=".git" . "$Host:$HostDir"
echo "Done"
