# moa-square 설계 적합성 검토

## 결론

Google Calendar 전용 MVP는 1인 개발 환경에서 공유 캘린더의 수요를 빠르게 검증하는 데 적합합니다. 일정 저장·반복·알림과 공유 권한을 Google Calendar에 맡겨 초기 구현과 운영 범위를 줄일 수 있습니다.

대신 제품의 사용자는 Google 계정 보유자로 제한되고 핵심 데이터와 권한 정책이 Google Calendar에 종속됩니다. 이 제약을 초기 제품 범위로 명시하고, 다른 공급자 지원은 MVP 검증 이후 판단합니다.

## 적합한 점

- 보조 캘린더와 ACL이 공유 그룹과 구성원 권한에 대응합니다.
- Events API가 일정 CRUD, 종일, 반복, 시간대와 알림을 제공합니다.
- iPhone과 Android가 같은 Google Calendar 데이터를 사용할 수 있습니다.
- Google Calendar의 기능으로 핵심 사용 흐름을 빠르게 검증할 수 있습니다.

## 주요 제약

### Google 계정 의존성

모든 참여자가 Google 계정과 Calendar 권한 동의가 필요합니다. Apple·Samsung 계정만 사용하는 사람은 초기 대상에서 제외됩니다.

### OAuth 검증

Calendar 쓰기와 공유 권한 범위는 사용자 데이터에 접근합니다. 공개 배포 전에 필요한 범위, 동의 화면, Google 검증 요건을 확인해야 합니다. 기능별 최소 범위를 우선 선택합니다. [Google Calendar API 인증 범위](https://developers.google.com/workspace/calendar/api/auth)

### 공유와 소유권

공유 캘린더의 ACL은 읽기·쓰기·관리 역할을 지원하지만 캘린더 데이터 소유자는 한 명입니다. 생성자 탈퇴와 소유권 이전은 개인 Google 계정과 Workspace 계정에서 제약이 다를 수 있으므로 실제 계정으로 검증해야 합니다.

캘린더 공유만으로 상대방의 Calendar 목록에 자동 추가되지 않습니다. 초대받은 사용자가 앱에서 캘린더를 확인하고 자신의 목록에 추가하는 흐름이 필요합니다. [Google Calendar 공유](https://developers.google.com/workspace/calendar/api/concepts/sharing)

### 변경 반영

MVP는 화면 진입·사용자 변경·수동 새로고침 시 재조회하고 sync token으로 변경분을 가져옵니다. 백그라운드 실시간 반영은 보장하지 않습니다.

푸시 알림을 도입하려면 캘린더별 채널과 HTTPS 웹훅 서버가 필요합니다. 알림은 누락될 수 있으므로 sync token 기반 조회가 최종 정합성을 담당해야 합니다. [증분 동기화](https://developers.google.com/workspace/calendar/api/guides/sync), [푸시 알림](https://developers.google.com/workspace/calendar/api/guides/push)

### 반복 일정

반복 일정 전체 수정과 특정 회차 수정은 API 표현이 다릅니다. ‘이후 모든 일정’은 기존 반복 일정을 나누는 복수 요청이 필요하므로 MVP 포함 여부를 별도로 결정합니다. [Google Calendar 반복 일정](https://developers.google.com/workspace/calendar/api/guides/recurringevents)

## 권장 검증 순서

1. iOS와 Android에서 Google OAuth 및 Calendar 권한 동의를 검증합니다.
2. 보조 캘린더 생성, ACL 초대와 참여자의 Calendar 목록 추가를 검증합니다.
3. 일정 생성·조회·수정·삭제와 종일·시간대 처리를 검증합니다.
4. 반복 일정과 회차 예외의 지원 범위를 검증합니다.
5. sync token 저장·갱신·만료 복구를 검증합니다.
6. 큰 글씨와 색상 비의존 표시를 실제 기기에서 확인합니다.

## 확정 사항

- 초기 MVP는 Google 계정 사용자만 지원합니다.
- Google Calendar가 일정과 공유 권한의 원본입니다.
- 공유 그룹은 Google 보조 캘린더로 표현합니다.
- 앱은 Google Calendar API로 일정 생성·조회·수정·삭제를 수행합니다.
- MVP 변경 반영은 재조회와 sync token을 사용합니다.
- Google Calendar 이벤트 알림을 사용하고 자체 푸시 알림은 초기 범위에서 제외합니다.

## 구현 중 결정할 사항

- OAuth 권한 범위와 Google 앱 검증 절차를 확정해야 합니다.
- 초대 링크와 Calendar 목록 추가 UX를 확정해야 합니다.
- 생성자 탈퇴와 캘린더 소유권 처리 범위를 확정해야 합니다.
- ‘이후 모든 일정’ 수정 지원 여부를 확정해야 합니다.
- API 제한과 오프라인 상황의 재시도 정책을 확정해야 합니다.
