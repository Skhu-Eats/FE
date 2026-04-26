import { http, HttpResponse } from "msw";
import membersData from "../data/members.json";
import { createMembers } from "../factories/member.factory";
import { User } from "@/types/auth";

interface Member extends User {
  password: string;
}

interface LoginBody { email: string; password: string }
interface SendCodeBody { email: string }
interface VerifyCodeBody { email: string; code: string }
interface CheckNicknameBody { nickname: string }
interface RegisterBody {
  email: string; password: string; nickname: string;
  department: string; admissionYear: string;
  bio?: string; category?: string[];
}

const members: Member[] = [
  ...membersData.map(m => ({
    ...m,
    avatar: m.avatar || null
  })),
  ...createMembers(10)
];

const pendingCodes = new Map<string, string>();

const sanitizeUser = (user: Member): User => {
  const { password, ...safeUser } = user;
  return safeUser;
};

export const memberHandlers = [
  http.post("/api/auth/login", async ({ request }) => {
    const { email, password } = (await request.json()) as LoginBody;
    const user = members.find(
      (m) => m.email === email && m.password === password,
    );

    if (user) {
      return HttpResponse.json({
        message: "Login successful",
        user: sanitizeUser(user),
        token: `mock-jwt-token-${Math.random().toString(36).substr(2, 9)}`,
      });
    }
    return new HttpResponse(JSON.stringify({ message: "아이디 또는 비밀번호가 틀렸어요" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }),

  http.post("/api/auth/send-code", async ({ request }) => {
    const { email } = (await request.json()) as SendCodeBody;
    if (!email.endsWith("@skhu.ac.kr")) {
      return HttpResponse.json({ message: "학교 이메일만 사용 가능해요" }, { status: 400 });
    }
    pendingCodes.set(email, "123456");
    return HttpResponse.json({ message: "인증코드가 발송됐어요" });
  }),

  http.post("/api/auth/verify-code", async ({ request }) => {
    const { email, code } = (await request.json()) as VerifyCodeBody;
    if (pendingCodes.get(email) === code) {
      pendingCodes.delete(email);
      return HttpResponse.json({ verified: true });
    }
    return HttpResponse.json({ message: "인증코드가 올바르지 않아요" }, { status: 400 });
  }),

  http.post("/api/auth/check-nickname", async ({ request }) => {
    const { nickname } = (await request.json()) as CheckNicknameBody;
    const taken = members.some((m) => m.nickname === nickname);
    if (taken) {
      return HttpResponse.json({ message: "이미 사용 중인 닉네임이에요" }, { status: 409 });
    }
    return HttpResponse.json({ available: true });
  }),

  http.post("/api/auth/register", async ({ request }) => {
    const body = (await request.json()) as RegisterBody;
    const newUser: Member = {
      id: String(members.length + 101),
      ...body,
      avatar: null
    };
    members.push(newUser);
    return HttpResponse.json(
      {
        message: "회원가입이 완료됐어요",
        user: sanitizeUser(newUser),
        token: "mock-jwt-token-new-user"
      },
      { status: 201 },
    );
  }),

  http.get("/api/members/me", () => {
    return HttpResponse.json(sanitizeUser(members[0]));
  }),
];
