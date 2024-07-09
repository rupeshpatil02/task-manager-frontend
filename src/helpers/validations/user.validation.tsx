interface Errors {
    [key: string]: string;
}

export function validateLoginForm(loginIdentifier: String, password: String): Errors | null {
    const errors: Errors = {};
    if (!loginIdentifier) {
        errors.loginIdentifier = 'Username or Email is required';
    }
    if (!password) {
        errors.password = 'Password is required';
    }
    return Object.keys(errors).length > 0 ? errors : null;
}
export function validateSignupForm(firstName: string, lastName: string, username: string, email: string, password: string, confirmPassword: string): Errors | null {
    const errors: Errors = {};

    if (!firstName) {
        errors.firstName = 'First name is required';
    }
    if (!lastName) {
        errors.lastName = 'Last name is required';
    }
    if (!username) {
        errors.username = 'Username is required';
    }
    if (!email) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = 'Invalid email format';
    }
    if (!password) {
        errors.password = 'Password is required';
    }
    if (!confirmPassword) {
        errors.confirmPassword = 'Confirm password is required';
    } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }

    return Object.keys(errors).length > 0 ? errors : null;
}
