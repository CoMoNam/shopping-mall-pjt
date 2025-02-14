package side.shopping.shopping_mall_backend.util;

import side.shopping.shopping_mall_backend.members.application.dto.member.JoinRequestDto;

import java.util.ArrayList;
import java.util.List;

public class TestDataUtil {

    // 단일 멤버 생성
    public static JoinRequestDto createMember() {
        return new JoinRequestDto(
                "single@naver.com",
                "강솔로",
                "강짱구",
                "Abcde123!@",
                "용산구 용산로 15마길 42",
                "101동 101호",
                "현관문 비밀번호 123"
        );
    }

    // 여러 멤버 생성
    public static List<JoinRequestDto> createMembers(int count) {
        List<JoinRequestDto> joinRequestDtoList = new ArrayList<>();
        for (int i = 1; i <= count; i++) {
            joinRequestDtoList.add(new JoinRequestDto(
                    "single" + i + "naver.com",
                    "강솔로" + i,
                    "강짱구" + i,
                    "Abcde123!@" + i,
                    "용산구 용산로 15마길 42" + i,
                    "101동 101호" + i,
                    "현관문 비밀번호 123" + i
                )
            );
        }
        return joinRequestDtoList;
    }
}
