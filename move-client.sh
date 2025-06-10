#!/bin/bash

# Create necessary directories
mkdir -p public src

# Copy files from task-q1/client to root
cp -r task-q1/client/public/* public/
cp -r task-q1/client/src/* src/
cp task-q1/client/.gitignore . 