interface UserDetails extends User {
    followers: User[],
    friendRequests: User[],
    following: User[],
    friends: User[],
}

// Login Mutation
interface LoginRequest {
    userDetail: string;
    password: string;
}

interface LoginSuccessResponse {
    status: API_RES.API_SUCCESS;
    user: UserDetails;
    token: string;
}

// Update Account Mutation
interface UpdateAccountRequest extends Omit<User, 'id' | 'accountType'> { }

interface UpdateAccountResponse {
    status: API_RES.API_SUCCESS,
    message: API_RES.UPDATE_API_PWD_SUCCESS,
    token: newToken,
}

// Update Password Mutation
interface updatePasswordRequest {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}


// CommonErrorResponse
interface APIErrorResponse {
    status: 'FAILED' | 'SERVER_ERROR';
    message: string;
}

// Auth Reducer
interface AuthReducerState {
    userDetails: Partial<Omit<LoginSuccessResponse, 'status'>>;
}