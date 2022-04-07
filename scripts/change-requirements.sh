#!/bin/bash

echo "Executing package requirements changes..."

sed -i "10s/.*/var Buffer = require('buffer').Buffer;/" ./node_modules/typedarray-to-buffer/index.js
sed -i "28s/.*/var process = require('process');/" ./node_modules/readable-stream/lib/_stream_writable.js
sed -i "3s/.*/var process = require('process');/" ./node_modules/pbkdf2/browser.js
# sed -i "17s/.*/var Buffer = require('buffer').Buffer;/" ./node_modules/pbkdf2/browser.js
sed -i "2s/.*/var Transform = require('stream-browserify').Transform/" ./node_modules/cipher-base/index.js
sed -i '10s/.*/var _fs = _interopRequireDefault(require("expo-file-system"));/' ./node_modules/@ckb-lumos/hd/lib/xpub_store.js
sed -i '8s/.*/var _crypto = _interopRequireDefault(require("react-native-expo-crypto"));/' ./node_modules/@ckb-lumos/hd/lib/keystore.js
sed -i '14s/.*/var _fs = _interopRequireDefault(require("expo-file-system"));/' ./node_modules/@ckb-lumos/hd/lib/keystore.js
sed -i '16s/.*/var _path = _interopRequireDefault(require("path-browserify"));/' ./node_modules/@ckb-lumos/hd/lib/keystore.js
# sed -i '19s/.*/var Buffer = require("buffer").Buffer;/' ./node_modules/@ckb-lumos/hd/lib/keystore.js
sed -i '14s/.*/var _crypto = _interopRequireDefault(require("react-native-expo-crypto"));/' ./node_modules/@ckb-lumos/hd/lib/mnemonic/index.js
# sed -i '17s/.*/var Buffer = require("buffer").Buffer;/' ./node_modules/@ckb-lumos/hd/lib/mnemonic/index.js
sed -i '8s/.*/var _crypto = _interopRequireDefault(require("react-native-expo-crypto"));/' ./node_modules/@ckb-lumos/hd/lib/keychain.js
sed -i '15s/.*/var Buffer = require("buffer").Buffer;/' ./node_modules/@ckb-lumos/hd/lib/keychain.js

echo "Package requirements changed successfully!"
