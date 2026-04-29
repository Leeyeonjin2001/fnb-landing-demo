#!/bin/bash

# check-design-tokens.sh
# 하드코딩된 색상/간격 탐지 — CSS 변수 사용 여부 검증

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ERRORS=0
WARNINGS=0

echo "🎨 디자인 토큰 체크 시작..."
echo ""

# ── 1. 하드코딩 hex 색상 (style prop 또는 css 파일) ──────────────────────────
echo "[1] 하드코딩 hex 색상 탐지 (style={{ color: '#...' }} 패턴)"

# 허용 예외: 테마 정의 파일 자체 (globals.css), 인덱스 페이지 demo 카드
EXCLUDED="globals.css|ThemeProvider|page.tsx"

HEX_HITS=$(grep -rn \
  --include="*.tsx" --include="*.ts" --include="*.css" \
  -E "(style=\{[^}]*['\"]#[0-9a-fA-F]{3,8}['\"]|color:\s*#[0-9a-fA-F]{3,8})" \
  "$ROOT/components" "$ROOT/app" 2>/dev/null \
  | grep -v -E "$EXCLUDED" \
  | grep -v "// ok" \
  | grep -v "globals.css")

if [ -n "$HEX_HITS" ]; then
  echo "  ⚠️  WARN: 하드코딩 색상 발견 (CSS 변수 사용 권장)"
  echo "$HEX_HITS" | while IFS= read -r line; do
    echo "     $line"
  done
  WARNINGS=$((WARNINGS + 1))
else
  echo "  ✅ 하드코딩 hex 색상 없음"
fi
echo ""

# ── 2. inline style에서 background-color 하드코딩 ────────────────────────────
echo "[2] 하드코딩 background-color 탐지"

BG_HITS=$(grep -rn \
  --include="*.tsx" \
  -E "backgroundColor:\s*['\"]#[0-9a-fA-F]{3,8}['\"]" \
  "$ROOT/components" "$ROOT/app" 2>/dev/null \
  | grep -v -E "$EXCLUDED")

if [ -n "$BG_HITS" ]; then
  echo "  ⚠️  WARN: 하드코딩 backgroundColor 발견"
  echo "$BG_HITS" | while IFS= read -r line; do
    echo "     $line"
  done
  WARNINGS=$((WARNINGS + 1))
else
  echo "  ✅ 하드코딩 backgroundColor 없음"
fi
echo ""

# ── 3. data-theme 속성 없이 --color-* 변수 사용 확인 ────────────────────────
echo "[3] theme-* 클래스 또는 CSS 변수 사용 컴포넌트 수"

THEME_USAGE=$(grep -rl \
  --include="*.tsx" \
  -E "(var\(--color-|theme-bg|theme-text|theme-accent|theme-cta)" \
  "$ROOT/components" "$ROOT/app" 2>/dev/null | wc -l | tr -d ' ')

echo "  ✅ 테마 변수 사용 파일: ${THEME_USAGE}개"
echo ""

# ── 결과 요약 ──────────────────────────────────────────────────────────────────
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "결과: ✅ $((2 - ERRORS))  ⚠️ ${WARNINGS}  ❌ ${ERRORS}"
if [ "$ERRORS" -gt 0 ]; then
  echo "❌ 실패 — DEV 완료 처리 불가"
  exit 1
else
  echo "✅ 통과"
  exit 0
fi
