interface User {
    userName: string;
    email: string,
    phoneNumber: string,
    accountType: "private" | "public" | "professional" | "celebrity",
    id: string,
    photo: string,
}

enum API_RES {
    API_SUCCESS = 'SUCCESS',
    UPDATE_API_PWD_SUCCESS = 'Password updated successfully.'
}