#!/bin/bash

XAMPP_HTDOCS="/Applications/XAMPP/xamppfiles/htdocs"
APP_FOLDER="Wasserchocher"
DEST="$XAMPP_HTDOCS/$APP_FOLDER"
PROJECT_DIR="$(pwd)"

echo "🚀 Deploy startet..."

echo "⚙️  Angular wird gebaut..."
npx ng build --base-href "/$APP_FOLDER/"

if [ $? -ne 0 ]; then
  echo "❌ Angular Build fehlgeschlagen!"
  exit 1
fi

mkdir -p "$DEST"

DIST_DIR=$(find "$PROJECT_DIR/dist" -name "index.html" | head -1 | xargs dirname)
cp -r "$DIST_DIR/." "$DEST/"
echo "✅ Angular Dateien kopiert!"

mkdir -p "$DEST/api"
cp -r "$PROJECT_DIR/backend/api/." "$DEST/api/"
cp -r "$PROJECT_DIR/backend/config" "$DEST/api/config"
echo "✅ PHP Backend kopiert!"

cat > "$DEST/.htaccess" << 'EOF'
RewriteEngine On
RewriteBase /Wasserchocher/
RewriteRule ^api/ - [L]
RewriteCond %{REQUEST_FILENAME} -f
RewriteRule ^ - [L]
RewriteRule ^ index.html [L]
EOF
echo "✅ .htaccess erstellt!"

echo ""
echo "✅ Fertig! http://localhost/Wasserchocher/"
