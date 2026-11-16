export const POST_LIMITS = {
  title: { min: 3, max: 80 },
  body: { min: 10, max: 500 },
} as const;

export interface PostValidationErrors {
  title?: string;
  body?: string;
}

/**
 * Validates a post after trimming. Pure: no state, no side effects.
 * An empty object means the post is valid.
 */
export function validatePost(title: string, body: string): PostValidationErrors {
  const errors: PostValidationErrors = {};
  const trimmedTitle = title.trim();
  const trimmedBody = body.trim();

  if (trimmedTitle.length < POST_LIMITS.title.min) {
    errors.title = `Enter a title of at least ${POST_LIMITS.title.min} characters.`;
  } else if (trimmedTitle.length > POST_LIMITS.title.max) {
    errors.title = `Keep the title to ${POST_LIMITS.title.max} characters or fewer.`;
  }

  if (trimmedBody.length < POST_LIMITS.body.min) {
    errors.body = `Add a body of at least ${POST_LIMITS.body.min} characters.`;
  } else if (trimmedBody.length > POST_LIMITS.body.max) {
    errors.body = `Keep the body to ${POST_LIMITS.body.max} characters or fewer.`;
  }

  return errors;
}
