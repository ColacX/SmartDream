
firebase serve --only functions
firebase deploy --only functions

node ./windows/service_main.js
node ./windows/service_install.js
node ./windows/service_uninstall.js