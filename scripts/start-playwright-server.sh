#!/usr/bin/env bash

docker run \
  --network=host \
  --rm \
  --init \
  -it \
  --workdir /home/pwuser \
  --user pwuser \
  mcr.microsoft.com/playwright:v1.52.0-noble /bin/sh -c "xvfb-run npx -y playwright@1.52.0 run-server --port 3000 --host 0.0.0.0"