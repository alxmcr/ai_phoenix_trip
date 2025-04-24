export const TIMEOUT_CONFIG = {
  // Base timeouts for critical operations
  REVIEW_SUBMISSION: {
    BASE: 5000, // 5 seconds
  },
  ANALYSIS: {
    BASE: 15000, // 15 seconds
  },
  SENTIMENT: {
    BASE: 3000, // 3 seconds
  },

  // Timeouts for batch operations
  ACTIONABLES: {
    BASE: 3000, // Base timeout for first item
    PER_ITEM: 1000, // Additional timeout per item
  },
  RECOMMENDATIONS: {
    BASE: 2000, // Base timeout for first item
    PER_ITEM: 800, // Additional timeout per item
  },

  // Global timeout limits
  LIMITS: {
    MIN: 3000, // Minimum timeout (3 seconds)
    MAX: 30000, // Maximum timeout (30 seconds)
  },
} as const;