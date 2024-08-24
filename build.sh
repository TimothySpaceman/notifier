#!/bin/bash

PROJECT_NAME=$(awk -F '=' '/^PROJECT_NAME=/ {print $2}' .env 2> /dev/null || echo "")
BUILD_MODE="production"
READ=false
TEMP_ENV=".env.temp"

# HELP MESSAGE
print_help () {
  echo "Usage: script_name [options]"
  echo ""
  echo "Options:"
  echo "  -h               Display this help message"
  echo "  -n PROJECT_NAME  Specify the project name"
  echo "  -d               Build in development mode"
  echo "  -r               Wait for user input before exiting the process"
}

# PARSING OPTIONS
while getopts "hrdn:" opt; do
  case "$opt" in
  h)
    print_help
    exit 1;;
  r)  READ=true;;
  d)  BUILD_MODE="development";;
  n)  PROJECT_NAME=$OPTARG;;
  ?)
    echo "Invalid option: -${OPTARG}"
    echo "Run \"script_name -h\" to get help"
    exit 1;;
  esac
done

# DISPLAYING INFO
echo ""
echo "Project name: \"$PROJECT_NAME\""
echo "Build mode: $BUILD_MODE"
echo ""

# STOPPING AND REMOVING EXISTING CONTAINERS
CONTAINERS=$(docker ps -a --filter "name=${PROJECT_NAME}" --format "{{.ID}}")

if [ -n "$CONTAINERS" ]; then
  echo "Stopping containers..."
  docker stop $CONTAINERS
  echo ""

  echo "Removing containers..."
  docker rm $CONTAINERS
  echo ""
fi

# BUILDING
cat .env > $TEMP_ENV
if [ "$BUILD_MODE" == "development" ]; then
  echo "Building $PROJECT_NAME in dev mode..."
  cat .env.development >> $TEMP_ENV
  docker-compose --env-file $TEMP_ENV -f docker-compose.yml -f development.yml up -d --build
else
  echo "Building $PROJECT_NAME..."
  cat .env.production >> $TEMP_ENV
  docker-compose --env-file $TEMP_ENV -f docker-compose.yml up -d --build
fi
rm $TEMP_ENV
echo ""

# WAIT FOR INPUT IF NEEDED
if $READ; then
  echo ""
  read -p "Press any key to continue..."
fi