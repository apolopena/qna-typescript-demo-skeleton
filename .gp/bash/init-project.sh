#!/bin/bash
#
# init-project.sh
# Description:
# Project specific initialization.

all_zeros='^[0]+$'

# Load logger
. .gp/bash/workspace-init-logger.sh
# Load spinner
. .gp/bash/spinner.sh

# remove unused scaffolding
[[ -f resources/js/app.js ]] && rm resources/js/app.js
[[ -f resources/js/components/Example.js ]] && rm resources/js/components/Example.js
[[ -f resources/views/welcome.blade.php ]] && rm resources/views/welcome.blade.php

# Migrate and Seed
declare -a exit_codes=()
msg="Migrating and seeding project database"
log "$msg"
php artisan migrate
exit_codes+=($?)
php artisan db:seed
exit_codes+=($?)
if [[ $(echo "${exit_codes[@]}" | tr -d '[:space:]') =~ $all_zeros ]]; then
  log "SUCCESS: $msg"
else
  log -e "ERROR: $msg"
fi

# Typescript packages
msg="Installing Typescript packages"
log_silent "$msg" && start_spinner "$msg"
yarn add ts-loader typescript @babel/preset-react --dev --silent 2> >(grep -v warning 1>&2) > /dev/null 2>&1
exit_code=$?
if [[ $exit_code == 0 ]]; then stop_spinner 0 && log_silent "SUCCESS: $msg"; else stop_spinner 1 && log_silent -e "ERROR: $msg"; fi

# Typescript types
msg="Installing Typescript types"
log_silent "$msg" && start_spinner "$msg"
yarn add @types/node @types/react @types/react-dom @types/react-router-dom --dev --silent 2> >(grep -v warning 1>&2) > /dev/null 2>&1
exit_code=$?
if [[ $exit_code == 0 ]]; then stop_spinner 0 && log_silent "SUCCESS: $msg"; else stop_spinner 1 && log_silent -e "ERROR: $msg"; fi

# Generate tsconfig.json 
if [[ ! -f tsconfig.json ]]; then
  msg="Generating tsconfig.json"
  log_silent "$msg" && start_spinner "$msg"
  if tsc --init --jsx react; then
    stop_spinner 0 && log_silent "SUCCESS: $msg"
  else
    stop_spinner 1 && log_silent -e "ERROR: $msg"
  fi
fi

# Hot reload
msg="Setting up hot reload system"
log_silent "$msg"
if bash -ic "hot-reload setup"; then log_silent "SUCCESS: $msg"; else log_silent -e "ERROR: $msg"; fi
