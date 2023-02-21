#!/bin/bash

echo "Executing package requirements changes..."

sed -i'.bak' "10s/.*/var Buffer = require('buffer').Buffer;/" ./node_modules/typedarray-to-buffer/index.js
sed -i'.bak' "28s/.*/var process = require('process');/" ./node_modules/readable-stream/lib/_stream_writable.js
sed -i'.bak' "3s/.*/var process = require('process');/" ./node_modules/pbkdf2/browser.js
# sed -i'.bak' "17s/.*/var Buffer = require('buffer').Buffer;/" ./node_modules/pbkdf2/browser.js
sed -i'.bak' "2s/.*/var Transform = require('stream-browserify').Transform/" ./node_modules/cipher-base/index.js
sed -i'.bak' "3s/.*/var process = require('process');/" ./node_modules/react-native-expo-crypto/node_modules/pbkdf2/browser.js

#Crypto
sed -i'.bak' "1s/.*/const randomBytes = require('react-native-expo-crypto').randomBytes;/" ./node_modules/bip39-light/index.js
sed -i'.bak' "2s/.*/if (false) {/" ./node_modules/bip39-light/index.js
sed -i'.bak' "8s/.*//" ./node_modules/bip39-light/index.js


echo "Package requirements changed successfully!"
