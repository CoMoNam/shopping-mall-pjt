export enum Role {
  CUSTOMER = "CUSTOMER", // 일반 사용자
  SELLER = "SELLER", // 판매자
  ADMIN = "ADMIN", // 관리자
  SUPER_ACCOUNT = "SUPER_ACCOUNT", // 슈퍼 계정
}

// 설명 매핑
export const RoleDescriptions: { [key in Role]: string } = {
  [Role.CUSTOMER]: "일반 사용자",
  [Role.SELLER]: "판매자",
  [Role.ADMIN]: "관리자",
  [Role.SUPER_ACCOUNT]: "슈퍼 계정",
};
