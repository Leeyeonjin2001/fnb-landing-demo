#!/bin/bash
# check-security.sh — 보안 검사: API키 노출, catch 통과, 하드코딩 자격증명

ERRORS=0
WARNS=0
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

check() {
  local desc="$1" pattern="$2" dir="$3" exclude="${4:-}"
  local result
  if [ -n "$exclude" ]; then
    result=$(grep -rn "$pattern" "$ROOT/$dir" --include="*.ts" --include="*.tsx" --include="*.js" 2>/dev/null | grep -v "$exclude")
  else
    result=$(grep -rn "$pattern" "$ROOT/$dir" --include="*.ts" --include="*.tsx" --include="*.js" 2>/dev/null)
  fi
  if [ -n "$result" ]; then
    echo "  ❌ $desc"
    echo "$result" | head -3 | sed 's/^/     /'
    ERRORS=$((ERRORS + 1))
  fi
}

warn() {
  local desc="$1" pattern="$2" dir="$3"
  local result
  result=$(grep -rn "$pattern" "$ROOT/$dir" --include="*.ts" --include="*.tsx" 2>/dev/null)
  if [ -n "$result" ]; then
    echo "  ⚠️  $desc"
    WARNS=$((WARNS + 1))
  fi
}

echo "━━ Security Check ━━"

check "service_role 키 프론트 노출 금지" "service_role" "app"
check "service_role 키 컴포넌트 노출 금지" "service_role" "components"
check "supabase secret 키 노출" "SUPABASE_SECRET\|supabaseSecret" "app"
check "빈 catch 블록 (에러 무시)" "catch\s*()\s*{}" "app"
check "honeypot 우회 가능성" "_honeypot.*submit\|submit.*_honeypot" "components" "check"
warn "console.log 프로덕션 코드 (DEMO 용도는 허용)" "console\.log" "components"

echo ""
echo "결과: ❌ ${ERRORS}개  ⚠️  ${WARNS}개"
[ "$ERRORS" -eq 0 ] && echo "✅ 보안 체크 통과" || echo "❌ 수정 필요"
exit $ERRORS
