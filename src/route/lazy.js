import asyncComponent from "./async";
// Dynamically imported components

// Static Components
export const FooterColumn = asyncComponent(() => import('../components/static/footer_column').then(module => module.default));
export const About = asyncComponent(() => import('../components/static/about').then(module => module.default));

// Dynamic Components

// 메인 페이지
export const PostsIndex = asyncComponent(() => import('../components/dynamic/main/posts_index').then(module => module.default));

// 필진 소개
export const AuthorDetail = asyncComponent(() => import('../components/dynamic/authors/author_detail').then(module => module.default));

// 회원가입, 로그인
export const LoginModal = asyncComponent(() => import('../components/dynamic/auth/login_modal').then(module => module.default));
export const SignUpModal = asyncComponent(() => import('../components/dynamic/auth/signup_modal').then(module => module.default));
export const AdminSignUp = asyncComponent(() => import('../components/dynamic/auth/admin_signup').then(module => module.default));

// 스토리
export const ListStory = asyncComponent(() => import('../components/dynamic/stories/list_story').then(module => module.default));
export const CreateStory = asyncComponent(() => import('../components/dynamic/stories/create_story').then(module => module.default));
export const RetrieveStory = asyncComponent(() => import('../components/dynamic/stories/retrieve_story').then(module => module.default));
export const PatchStory = asyncComponent(() => import('../components/dynamic/stories/patch_story').then(module => module.default));

// 설정
export const SettingsIndex = asyncComponent(() => import('../components/dynamic/settings/settings_index').then(module => module.default));

// 자유게시판
export const ListFreeBoard = asyncComponent(() => import('../components/dynamic/board/list_board').then(module => module.default));
export const CreateFreeBoard = asyncComponent(() => import('../components/dynamic/board/create_board').then(module => module.default));
export const RetrieveFreeBoard = asyncComponent(() => import('../components/dynamic/board/retrieve_board').then(module => module.default));
export const PatchFreeBoard = asyncComponent(() => import('../components/dynamic/board/patch_board').then(module => module.default));

// 공지사항
export const ListNotice = asyncComponent(() => import('../components/dynamic/notice/list_notice').then(module => module.default));
export const CreateNotice = asyncComponent(() => import('../components/dynamic/notice/create_notice').then(module => module.default));
export const RetrieveNotice = asyncComponent(() => import('../components/dynamic/notice/retrieve_notice').then(module => module.default));
export const PatchNotice = asyncComponent((() => import('../components/dynamic/notice/patch_notice').then(module => module.default)));
