export enum Role {
  CUSTOMER = "ROLE_CUSTOMER", // 일반 사용자
  SELLER = "ROLE_SELLER", // 판매자
  ADMIN = "ROLE_ADMIN", // 관리자
  SUPER_ACCOUNT = "ROLE_SUPER_ACCOUNT", // 슈퍼 계정
}

// 설명 매핑
export const RoleDescriptions: { [key in Role]: string } = {
  [Role.CUSTOMER]: "일반 사용자",
  [Role.SELLER]: "판매자",
  [Role.ADMIN]: "관리자",
  [Role.SUPER_ACCOUNT]: "슈퍼 계정",
};
