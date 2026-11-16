import { describe, expect, it } from 'vitest';
import { POST_LIMITS, validatePost } from './postValidation';

const validTitle = 'A quiet morning';
const validBody = 'The city is quiet before seven.';

describe('validatePost', () => {
  it('reports both fields when they are empty', () => {
    expect(validatePost('', '')).toEqual({
      title: 'Enter a title of at least 3 characters.',
      body: 'Add a body of at least 10 characters.',
    });
  });

  it('treats whitespace-only fields as empty', () => {
    expect(validatePost('   ', ' \n\t ')).toEqual({
      title: 'Enter a title of at least 3 characters.',
      body: 'Add a body of at least 10 characters.',
    });
  });

  it('accepts a valid title and body after trimming', () => {
    expect(
      validatePost(`  ${validTitle}  `, `  ${validBody}  `),
    ).toEqual({});
  });

  it('reports only a title that is too short', () => {
    expect(validatePost('Hi', validBody)).toEqual({
      title: 'Enter a title of at least 3 characters.',
    });
  });

  it('reports only a body that is too short', () => {
    expect(validatePost(validTitle, 'Too short')).toEqual({
      body: 'Add a body of at least 10 characters.',
    });
  });

  it('accepts content exactly at both limits', () => {
    expect(
      validatePost(
        'a'.repeat(POST_LIMITS.title.min),
        'a'.repeat(POST_LIMITS.body.min),
      ),
    ).toEqual({});
    expect(
      validatePost(
        'a'.repeat(POST_LIMITS.title.max),
        'a'.repeat(POST_LIMITS.body.max),
      ),
    ).toEqual({});
  });

  it('reports both fields when they exceed the limits', () => {
    expect(
      validatePost(
        'a'.repeat(POST_LIMITS.title.max + 1),
        'a'.repeat(POST_LIMITS.body.max + 1),
      ),
    ).toEqual({
      title: 'Keep the title to 80 characters or fewer.',
      body: 'Keep the body to 500 characters or fewer.',
    });
  });
});
