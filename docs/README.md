# moa-square 설계 문서

moa-square는 Google Calendar를 기반으로 여러 관계별 공유 캘린더를 간단하게 사용하는 모바일 앱입니다. 초기 MVP는 Google 계정 사용자만 지원하며 Google Calendar를 일정과 공유 권한의 원본으로 사용합니다.

목표 구조는 **모바일 앱 + Google OAuth + Google Calendar API**입니다. 공유 그룹은 Google 보조 캘린더, 구성원 권한은 캘린더 ACL로 표현합니다. 일정 생성·조회·수정·삭제와 반복·알림은 Google Calendar 기능을 사용합니다. 앱은 화면 진입과 사용자 작업 이후 데이터를 다시 조회하며, 실시간 변경 감지는 MVP 검증 이후에 결정합니다.

- [제품 요구사항](./product-requirements.md)에서는 MVP의 필수·제외 기능을 설명합니다.
- [아키텍처 설계](./proposed-architecture.md)에서는 Google Calendar 중심의 데이터와 권한 흐름을 설명합니다.
- [적합성 검토](./design-review.md)에서는 선택 근거와 제약, 검증 항목을 설명합니다.
- [구현 계획](./implementation-plan.md)에서는 단계별 목표와 완료 기준을 정리합니다.

문서의 설계 방향은 Google Calendar API와 실제 계정 환경의 동작 검증 완료를 의미하지 않습니다.
