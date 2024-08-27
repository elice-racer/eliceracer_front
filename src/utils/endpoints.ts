const ADMINS = {
  /** @상세 admins/users/:userId */
  users: "admins/users",
  membersCoaches: "admins/members/coaches",
  membersRacers: "admins/members/racers",
  /** @상세 admins/users/roles/:userId */
  usersRole: "admins/users/roles",
  /** @상세 admins/users/tracks/:userId */
  usersTrack: "admins/users/tracks",

  /** @상세 admins/teams/:teamId */
  teams: "admins/teams",
  tracks: "admins/tracks",
  /** @상세 admins/projects/:projectId */
  projects: "admins/projects",
  /**
   * @상세 admins/chats/:trackId
   * @쿼리 admins/chats?tracks=&cardinalNo=&round&type=
   *  */
  chats: "admins/chats",
  teamsChats: "admins/chats/teams",
  /** @상세 admins/officehours/:projectId */
  officehour: "admins/officehours",
  /** @쿼리 admins/verify-email?id=&token= */
  verifyEmail: "admins/verify-email",
  signup: "admins/signup",
};

const AUTH = {
  identifiers: "auth/identifiers",
  login: "auth/login",
  logout: "auth/logout",
  password: "auth/password",
  authPWPhoneNumber: "auth/passwords/phones",
  authPWVerifyCode: "auth/passwords/verify-code",
  refreshTK: "auth/refresh",
  sendPhoneVerifyCode: "auth/send-verification",
  verifyCode: "auth/verify-code",
};

const CHATS = {
  /** @상세 chats/:chatId */
  chats: "chats",
  /** @쿼리 chats/messages?chatId=&pageSize= */
  chatsMessages: "chats/messages",
  chatRooms: "chats/rooms/all",
  /** @상세 chats/users/:chatId */
  chatUsers: "chats/users",
};

const NOTICES = {
  /** @상세 admins/notices/:noticeId */
  notices: "admins/notices",
  /** @상세 notices/:noticeId */
  notice: "notices",
  AllNotices: "notices/all",
  /** @상세 notices/authors?userId=&page=&pageSize= */
  authorsNotice: "notices/authors",
};

const OFFICE_HOURS = {
  /**
   * @상세 officehours/:officehourId
   * @쿼리 officehours?tracks=&cardinalNo=&round=&teamNo=
   */
  officehour: "officehours",
  /** @상세 officehours/coach/:userId */
  coachsOfficehour: "officehours/coach",
  /** @상세 officehours/project/:projectId */
  projectsOfficehour: "officehours/project",
  /**
   * @상세 officehours/team/:teamId
   * @소속팀_오피스아워 officehours/teams/:teamId/:officehourId
   */
  teamsOfficehour: "officehours/team",
  /** @관리자_권한_오피스아워 admins/officehours/:projectId */
  adminsOfficehour: "admins/officehours",
};

const PROJECTS = {
  /**
   * @상세 projecsts/:projectId
   * @쿼리 projects?tracks=&cardinalNo=&round=
   */
  projects: "projecsts",
};

const TEAMS = {
  /** @상세 teams/:teamId */
  teams: "teams",
  /** @유저_팀 users/teams/:userId */
  usersTeams: "users/teams",
  /** @팀_깃 teams/gitlab/:teamId */
  teamsGit: "teams/gitlab",
  /** @팀_노션 teams/teamName/:teamId */
  teamsNotion: "teams/notion",
};

const TRACKS = {
  /**
   * @쿼리 tracks?tracks=&cardinalNo=&isProgress=
   * @상세 tracks/:trackId
   */
  tracks: "tracks",
  /**
   * @쿼리 tracks/search&search=
   */
  search: "tracks/search",
};

const USERS = {
  /**
   * @상세 users/:userId
   */
  users: "users",
  current: "users/current",
  /** @상세 users/miniprofiles/:userId */
  miniProfile: "users/miniprofile",
  mypage: "users/mypage",
  profileImg: "users/profileImages",
  /** @쿼리 users/search?realName= */
  search: "users/search",
  /** @쿼리 users/skills?skillName= */
  skills: "users/skills",
  phoneNumber: "users/mypage/phoneNumber",
  signup: "users/signup",
};

const APP_PUSH = {
  /** @fcm fcm 토큰*/
  fcmNotifications: "notifications/tokens",
};

export { ADMINS, AUTH, CHATS, NOTICES, OFFICE_HOURS, PROJECTS, TEAMS, TRACKS, USERS, APP_PUSH };
