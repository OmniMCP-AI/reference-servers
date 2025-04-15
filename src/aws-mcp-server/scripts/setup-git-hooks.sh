#!/bin/bash

# Script to set up Git hooks

# Create .git/hooks directory if it doesn't exist
mkdir -p .git/hooks

# Create pre-commit hook
cat > .git/hooks/pre-commit << 'EOL'
#!/bin/bash

# Run the secrets check script
./scripts/check-secrets.sh

# If the script found secrets, prevent the commit
if [ $? -ne 0 ]; then
  echo "❌ Commit prevented due to potential secrets in the codebase."
  exit 1
fi

# Check for .env files
if git diff --cached --name-only | grep -q "\.env$"; then
  echo "❌ Attempting to commit .env file. This is not allowed."
  echo "Please add .env files to .gitignore and remove them from the commit."
  exit 1
fi

# Check for other sensitive files
SENSITIVE_PATTERNS=("*_rsa" "*_dsa" "*.key" "*.pem" "*.p12" "*.pfx" "*.crt" "*.cer" "*.der" "*.priv")
for pattern in "${SENSITIVE_PATTERNS[@]}"; do
  if git diff --cached --name-only | grep -q "$pattern"; then
    echo "❌ Attempting to commit sensitive file matching pattern: $pattern"
    echo "Please add these files to .gitignore and remove them from the commit."
    exit 1
  fi
done

# All checks passed
exit 0
EOL

# Make the pre-commit hook executable
chmod +x .git/hooks/pre-commit

echo "✅ Git hooks set up successfully!"
