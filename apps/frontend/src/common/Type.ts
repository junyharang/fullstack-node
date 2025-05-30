export type TaskType = {
    id: number,
    userId: string,
    uuid: string,
    title: string,
    description: string,
    isCompleted: boolean,
    isImportant: boolean,
    createdDateTime: string;
    updatedDateTime: string;
}

export type GoogleOauthResponse = {
    iss: string;                // 발급자 (issuer)
    azp: string;                // 인증된 앱의 client ID
    aud: string;                // 대상 audience
    sub: string;                // 사용자 고유 식별자 (중요: primary key처럼 쓰임)
    email: string;              // 사용자의 이메일
    email_verified: boolean;    // 이메일 인증 여부
    nbf?: number;               // not before (optional)
    name: string;               // 사용자 전체 이름
    picture: string;            // 프로필 이미지 URL
    given_name: string;         // 이름 (이름만)
    family_name: string;        // 성 (성씨만)
    iat: number;                // 발급 시간 (issued at)
    exp: number;                // 만료 시간 (expiry)
    jti?: string;               // 토큰 고유 ID (optional)
};

export type ModalStatus = 'create' | 'update' | 'detail' | null;

export interface ApiState {
    getItemsData: any | null;
};

export interface ModalType {
    isOpen: boolean;
    modalStatus: ModalStatus | null;
    task: TaskType | null;
}
