const ADMINS = {
  users: "admins/users",
  membersCoaches: "admins/members/coaches",
  membersRacers: "admins/members/racers",

  usersRole: "admins/users/roles",
  usersTrack: "admins/users/tracks",

  teams: "admins/teams",
  tracks: "admins/tracks",

  projects: "admins/projects",

  chats: "admins/chats",
  teamsChats: "admins/chats/teams",
  officehour: "admins/officehours",

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
  chats: "chats",
  chatsMessages: "chats/messages",
  chatRooms: "chats/rooms/all",
  chatUsers: "chats/users",
};

const NOTICES = {
  notices: "admins/notices",
  notice: "notices",
  AllNotices: "notices/all",
  authorsNotice: "notices/authors",
};

const OFFICE_HOURS = {
  /**
   * @상세 officehours/:officehourId
   * @단순조회 officehours?tracks=&cardinalNo=&round=&teamNo=
   */
  officehour: "officehours",
  /** @유저아이디로_검색 officehours/coach/:userId */
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
  searchTracks: "tracks/search",
};

const USERS = {
  /**
   * @
   */
};

export { ADMINS, AUTH, CHATS, NOTICES, OFFICE_HOURS, PROJECTS, TEAMS, TRACKS, USERS };
