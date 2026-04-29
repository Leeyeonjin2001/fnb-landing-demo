#!/bin/bash

# check-component-reuse.sh
# 컴포넌트 재사용률 체크 — 같은 로직이 중복 구현됐는지 탐지

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ERRORS=0
WARNINGS=0

echo "🔁 컴포넌트 재사용률 체크 시작..."
echo ""

# ── 1. 각 데모 페이지가 공통 컴포넌트를 import 하는지 확인 ──────────────────
echo "[1] 데모 페이지별 컴포넌트 import 현황"

for DEMO in white-pure wood-static-plus dark-dynamic mixed-pro; do
  PAGE="$ROOT/app/demos/$DEMO/page.tsx"
  if [ -f "$PAGE" ]; then
    IMPORTS=$(grep -c "^import" "$PAGE" 2>/dev/null || echo "0")
    COMP_IMPORTS=$(grep "from '@/components" "$PAGE" 2>/dev/null | wc -l | tr -d ' ')
    echo "  📄 $DEMO: import ${IMPORTS}개 (컴포넌트 ${COMP_IMPORTS}개)"
  else
    echo "  ⚠️  $DEMO/page.tsx 없음"
    WARNINGS=$((WARNINGS + 1))
  fi
done
echo ""

# ── 2. 중복 인라인 스타일 블록 탐지 (50줄 이상 중복 패턴) ───────────────────
echo "[2] 공통 컴포넌트 존재 여부 (layout/sections/ui)"

for DIR in layout sections ui; do
  COUNT=$(ls "$ROOT/components/$DIR/" 2>/dev/null | grep "\.tsx$" | wc -l | tr -d ' ')
  if [ "$COUNT" -gt 0 ]; then
    echo "  ✅ components/$DIR/: ${COUNT}개"
  else
    if [ "$DIR" = "layout" ] || [ "$DIR" = "sections" ]; then
      echo "  ⚠️  components/$DIR/: 비어있음 (DEV-003 이후 채워질 예정)"
      WARNINGS=$((WARNINGS + 1))
    else
      echo "  ℹ️  components/$DIR/: 비어있음"
    fi
  fi
done
echo ""

# ── 3. 데모별 중복 inline 컴포넌트 탐지 (같은 JSX 패턴 반복) ────────────────
echo "[3] HeroSection이 여러 데모에 직접 인라인 구현됐는지 확인"

INLINE_HERO=$(grep -rl \
  --include="*.tsx" \
  -E "autoPlay|autoplay" \
  "$ROOT/app/demos" 2>/dev/null | wc -l | tr -d ' ')

if [ "$INLINE_HERO" -gt 1 ]; then
  echo "  ⚠️  WARN: HeroSection 로직이 ${INLINE_HERO}개 데모에 인라인 — 공통 컴포넌트 추출 권장"
  WARNINGS=$((WARNINGS + 1))
else
  echo "  ✅ 중복 Hero 인라인 없음"
fi
echo ""

# ── 결과 요약 ──────────────────────────────────────────────────────────────────
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "결과: ⚠️ ${WARNINGS}  ❌ ${ERRORS}"
if [ "$ERRORS" -gt 0 ]; then
  echo "❌ 실패"
  exit 1
else
  echo "✅ 통과"
  exit 0
fi
