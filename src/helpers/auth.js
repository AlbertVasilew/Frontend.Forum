const logoutHandler = setUser => {
    localStorage.removeItem("user");
    setUser(null);
}

const authErrorCodes = {
    DuplicateUserName: "Username is taken",
    DuplicateEmail: "Email is taken",
    WrongCredentials: "Wrong credentials"
}

const authActions = {
    login: "login",
    registration: "registration"
}

export { logoutHandler, authErrorCodes, authActions }