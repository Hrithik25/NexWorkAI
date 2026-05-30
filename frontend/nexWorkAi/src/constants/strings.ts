export const STRINGS = {
  // App
  APP_NAME: 'NexWork AI',
  APP_TAGLINE: 'Smart Workforce Hub',

  // Common actions
  SUBMIT: 'Submit',
  CANCEL: 'Cancel',
  SAVE: 'Save',
  DELETE: 'Delete',
  CONFIRM: 'Confirm',
  BACK: 'Back',
  NEXT: 'Next',
  LOADING: 'Loading...',

  // Auth
  AUTH: {
    loginTitle: 'Welcome back',
    loginSubtitle: 'Sign in to your workspace',
    loginButton: 'Sign in to workspace',
    signingIn: 'Signing in...',
    logout: 'Logout',
    forgotPassword: 'Forgot password?',
    noAccount: "Don't have an account?",
    signUp: 'Sign up',
    emailPlaceholder: 'you@nexwork.com',
    emailLabel: 'Work email',
    passwordLabel: 'Password',
    keepSignedIn: 'Keep Me Signed In',
  },

  // Form placeholders
  PLACEHOLDERS: {
    EMAIL: 'you@company.com',
    PASSWORD: '••••••••',
    NAME: 'Enter name',
    SEARCH: 'Search...',
  },

  // Form labels
  LABELS: {
    EMAIL: 'Work email',
    PASSWORD: 'Password',
    NAME: 'Full name',
  },

  // Errors
  ERRORS: {
    REQUIRED: 'This field is required',
    INVALID_EMAIL: 'Enter a valid email',
    PASSWORD_MIN: 'Password must be at least 6 characters',
    INVALID_CREDENTIALS: 'Invalid email or password',
    SERVER_ERROR: 'Something went wrong. Please try again.',
  },

  // Messages
  MESSAGES: {
    KEEP_SIGNED_IN: 'Keep me signed in',
    TERMS: 'By signing in, you agree to our',
    TERMS_OF_SERVICE: 'Terms of Service',
    PRIVACY_POLICY: 'Privacy Policy',
  },

  //Login Page
  LOGIN: {
    employeesManaged: 'Employees Managed',
    enterpriseClients: 'Enterprise clients',
    uptimeSLA: 'Uptime SLA',
    yourPeople: 'Your people,',
    unified: 'unified.',
    description:
      'Enterprise HR, task management, and AI-powered insights — all in oneseamless workspace.',
  },
} as const;
