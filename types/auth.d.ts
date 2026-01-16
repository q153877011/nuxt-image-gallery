declare module '#auth-utils' {
  interface User {
    role: 'admin' | 'superadmin'
  }

  interface UserSession {
    lastAttemptAt?: number
  }
}

export {}
