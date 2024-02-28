export interface TokenData {
    userId: string;
    roleId: number;
    orgId: string;
    branchId: string;
}

export interface OrgData {
    orgId?: string;
    branchId?: string;
}

export interface ReqUser {
    req_user: TokenData;
}
export interface RegisterParams {
    name: string;
    orgName: string;
    password: string;
    phone: string;
    email?: string;
    roleId: number;
}

export interface RegisterUserData {
    name: string;
    password: string;
    phone: string;
    email?: string;
    roleId: number;
}

export interface RegisterOrgData {
    name: string;
    phone: string;
    email?: string;
}

export interface LoginParams {
    phone: string;
    password: string;
}

export interface LoginRes {
    id: string;
    name: string;
    password: string;
    roleId: number;
    orgId: string;
    branchId: string;
}

export interface RegisterRes {
    userData: {
        id: string;
        name: string;
        phone: string;
    };
    organizationData: {
        id: string;
        name: string;
        phone: string;
    };
}