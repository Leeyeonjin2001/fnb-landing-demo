#!/bin/bash
# run-all.sh — 전체 hooks 실행

ROOT="$(cd "$(dirname "$0")" && pwd)"

TOTAL_ERRORS=0
TOTAL_WARNS=0

run_hook() {
  local name="$1"
  local script="$ROOT/$name"
  if [ ! -f "$script" ]; then
    echo "⚠️  $name not found — skip"
    return
  fi
  chmod +x "$script"
  echo ""
  bash "$script"
  local exit_code=$?
  TOTAL_ERRORS=$((TOTAL_ERRORS + exit_code))
}

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Hooks 전체 실행"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

run_hook check-security.sh
run_hook check-design-tokens.sh
run_hook check-component-reuse.sh

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ "$TOTAL_ERRORS" -eq 0 ]; then
  echo "✅ 전체 통과  ❌ 0개"
else
  echo "❌ 총 ${TOTAL_ERRORS}개 오류 — 수정 필요"
fi
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
exit $TOTAL_ERRORS
