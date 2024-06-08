const paths = {
  HOME: "/",
  INTRO: "/auth",
  LOGIN: "/auth/login",
  CREATE_USER: "/auth/create-account",
  CREATE_ADMIN: "/auth/create-admin",

  FIND_ID: "/auth/find-id",
  FIND_PW: "/auth/find-pw",

  // 채팅
  CHAT_HOME: "/chat",
  CHAT_ROOM: "/chat/:id",

  // 상대 프로필 조회
  USERS_PAGE: "/elicer/:id",

  // 공지 게시판
  NOTICE_LIST: "/user/notice",
  NOTICE: "/user/notice/:id",

  //유저 메뉴 관련 Paths
  MENU: "/user",
  OFFICE_HOUR_SCHEDULE: "/user/officehour",
  MY_ALERT: "/user/alert",
  MY_PROJECT_LIST: "/user/my-projects",
  MYPAGE: "/user/mypage",
  EDIT_MYPAGE: "/user/edit",
  SETTINGS: "/user/settings",

  //서비스 문의 및 버전확인
  VERSION: "/user/settings#version",

  // 관리자 기능
  ADMIN: "/admin",

  // 관리자 유저 관리
  ADD_USERS: "/admin/upload-file",
  ADMIN_SEARCH_USERS: "/admin/search-users",

  // 채팅 관리
  ADMIN_SETTINGS_CHAT: "/admin/chat",

  // 관리자 오피스아워 관리
  OFFICE_HOUR: "/admin/officehour",
  ADMIN_ADD_OFFICE_HOUR: "/admin/add-officehour",
  UPDATE_OFFICE_HOUR: "/admin/update-officehour",

  // 관리자 공지 관리
  ADMIN_NOTICE_LIST: "/admin/notice",
  ADMIN_NOTICE_ID: "/admin/notice/:id",
  ADMIN_UPDATE_NOTICE: "/admin/notice/update/:id",
  ADMIN_ADD_NOTICE: "/admin/add-notice",

  // 출결 및 공지 알림 기능
  ALERT: "/admin/alert",

  // 프로젝트 관리
  ADMIN_PROJECTS: "/admin/projects",
};

const imgPaths = {
  ELICE_LOGO: "/imgs/elice-logo.svg",
  DEFAULT_PROFILE_IMG: "/imgs/defaultProfileImg.png",
  NOT_FOUND: "/imgs/404page.png",
  FILE_UPLOAD: "/imgs/file-upload.png",
};

/**
 * menu안에 있을 것들
 * mypage^
 * 설정^
 * 오피스아워 확인^
 * 내 프로젝트 확인^
 * 공지확인^
 * 서비스 문의 및 버전 확인^
 *
 */

export { paths, imgPaths };
