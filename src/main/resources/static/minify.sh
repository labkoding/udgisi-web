
#!/bin/bash
npx terser -c -m -o js/index.min.js -- build/index.js
npx terser -c -m -o js/login.min.js -- build/login.js
npx terser -c -m -o js/suratjalan.min.js -- build/suratjalan.js
npx terser -c -m -o js/util.min.js -- build/util.js
npx terser -c -m -o js/invoice.min.js -- build/invoice.js

