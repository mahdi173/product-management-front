export const loginInErrorMessages = {
    emailRequired: 'Email is required.',
    emailInvalid: 'Email is invalid.',
    passwordRequired: 'Password is required.',
    loginFailed: 'Connection failed. Please verify your credentials.',
} as const;

export const productSuccessMessages = {
    // CRUD Operations :
    creation: 'Your Product was successfully created 🎉',
    update: 'Your Product was successfully updated 🎉',
    deletion: 'Your Product was successfully deleted 🎉',
} as const;

export const productErrorMessages = {
    nameRequired: 'Product name is required.',
    nameMin: 'Product name should be at least 5 characters long.',
    priceInvalid: 'Product price should be like "10.30".',
    priceRangeInvalid: 'Product price range should be like 10',
} as const