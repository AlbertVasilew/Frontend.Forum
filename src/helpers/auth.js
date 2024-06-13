const logoutHandler = setUser => {
    localStorage.removeItem("user");
    setUser(null);
}

const authErrorCodes = {
    DuplicateUserName: "Username is taken",
    DuplicateEmail: "Email is taken",
    WrongCredentials: "Wrong credentials"
}

export { logoutHandler, authErrorCodes }