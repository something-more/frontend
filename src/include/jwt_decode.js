// 사용자의 JWT 토큰을 해석하는 전역 헬퍼 함수
export function decodeJWT(token) {
  // 전체 토큰에서 payload 부분만 잘라낸다
  const splitToken = token.split('.')[1];
  // base64로 인코딩된 payload 를 string 으로 디코딩
  return JSON.parse(window.atob(splitToken));
}
