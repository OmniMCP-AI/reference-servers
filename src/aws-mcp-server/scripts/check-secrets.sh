#!/bin/bash

# Simple script to check for potential secrets in the codebase
# This is a basic implementation - consider using tools like git-secrets or detect-secrets for more robust protection

echo "Checking for potential secrets in the codebase..."

# Define patterns to search for
PATTERNS=(
  "AWS_ACCESS_KEY_ID"
  "AWS_SECRET_ACCESS_KEY"
  "AWS_SESSION_TOKEN"
  "AKIA[0-9A-Z]{16}"  # AWS Access Key pattern
  "ASIA[0-9A-Z]{16}"  # AWS Temporary Access Key pattern
  "SECRET_KEY"
  "API_KEY"
  "password"
  "passwd"
  "private_key"
  "token"
  "secret"
  "credential"
)

# Files to exclude from checking
EXCLUDE_DIRS=(
  "node_modules"
  ".git"
  "dist"
  "build"
)

# Build exclude pattern
EXCLUDE_PATTERN=""
for dir in "${EXCLUDE_DIRS[@]}"; do
  EXCLUDE_PATTERN="$EXCLUDE_PATTERN --exclude-dir=$dir"
done

# Check for each pattern
FOUND_SECRETS=0
for pattern in "${PATTERNS[@]}"; do
  echo "Checking for pattern: $pattern"
  
  # Use grep to find the pattern, excluding .env files and the check-secrets.sh script itself
  RESULTS=$(grep -r --include="*.js" --include="*.json" --include="*.ts" --include="*.tsx" --include="*.md" \
            --exclude="*.env*" --exclude="check-secrets.sh" --exclude=".gitignore" \
            $EXCLUDE_PATTERN -i "$pattern" . || true)
  
  if [ -n "$RESULTS" ]; then
    echo "⚠️  Potential secret found:"
    echo "$RESULTS"
    FOUND_SECRETS=1
  fi
done

# Check specifically for hardcoded values that look like secrets
echo "Checking for hardcoded secrets..."
HARDCODED_SECRETS=$(grep -r --include="*.js" --include="*.json" --include="*.ts" --include="*.tsx" \
                   --exclude="*.env*" --exclude="check-secrets.sh" --exclude=".gitignore" \
                   $EXCLUDE_PATTERN -E "['\"][a-zA-Z0-9+/]{40,}['\"]" . || true)

if [ -n "$HARDCODED_SECRETS" ]; then
  echo "⚠️  Potential hardcoded secret found:"
  echo "$HARDCODED_SECRETS"
  FOUND_SECRETS=1
fi

if [ $FOUND_SECRETS -eq 1 ]; then
  echo "❌ Secrets were found in the codebase. Please remove them before committing."
  exit 1
else
  echo "✅ No secrets found in the codebase."
  exit 0
fi
