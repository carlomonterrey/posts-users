import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import type { NewPostInput } from '../../application/types';
import type { PostValidationErrors } from '../../domain/postValidation';
import { POST_LIMITS, validatePost } from '../../domain/postValidation';
import { Button } from './Button';
import { Input, Textarea } from './Input';
import styles from './PostComposer.module.css';

export interface PostComposerProps {
  readonly userName: string;
  readonly onPublish: (input: NewPostInput) => void;
}

export function PostComposer({ userName, onPublish }: PostComposerProps) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState<PostValidationErrors>({});
  const [status, setStatus] = useState('');
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const focusAfterValidation = useRef<'title' | 'body' | null>(null);

  useEffect(() => {
    const target = focusAfterValidation.current;

    if (target === null) {
      return;
    }

    focusAfterValidation.current = null;

    if (target === 'title') {
      titleRef.current?.focus();
    } else {
      bodyRef.current?.focus();
    }
  }, [errors]);

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>): void {
    const nextTitle = event.target.value;
    setTitle(nextTitle);
    setErrors((current) => {
      if (!current.title) {
        return current;
      }

      const next = validatePost(nextTitle, body);
      return { ...current, title: next.title };
    });
  }

  function handleBodyChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    const nextBody = event.target.value;
    setBody(nextBody);
    setErrors((current) => {
      if (!current.body) {
        return current;
      }

      const next = validatePost(title, nextBody);
      return { ...current, body: next.body };
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setStatus('');

    const nextErrors = validatePost(title, body);
    setErrors(nextErrors);

    if (nextErrors.title) {
      focusAfterValidation.current = 'title';
      return;
    }

    if (nextErrors.body) {
      focusAfterValidation.current = 'body';
      return;
    }

    const publishedTitle = title.trim();
    onPublish({ title: publishedTitle, body: body.trim() });
    setStatus(`Published “${publishedTitle}”.`);
    setTitle('');
    setBody('');
    setErrors({});
  }

  function handleClear(): void {
    setTitle('');
    setBody('');
    setErrors({});
    setStatus('');
    titleRef.current?.focus();
  }

  return (
    <section className={styles.composer} aria-labelledby="composer-title">
      <div className={styles.head}>
        <h3 id="composer-title" className={styles.title}>
          Write a post
        </h3>
        <p className={styles.as}>as {userName}</p>
      </div>

      <form
        noValidate
        aria-labelledby="composer-title"
        onSubmit={handleSubmit}
      >
        <div className={styles.fields}>
          <Input
            ref={titleRef}
            id="post-title"
            name="title"
            label="Title"
            placeholder="Give it a title"
            autoComplete="off"
            required
            minLength={POST_LIMITS.title.min}
            maxLength={POST_LIMITS.title.max}
            value={title}
            onChange={handleTitleChange}
            error={errors.title}
          />
          <Textarea
            ref={bodyRef}
            id="post-body"
            name="body"
            label="Body"
            placeholder="Start with a sentence."
            rows={4}
            required
            minLength={POST_LIMITS.body.min}
            maxLength={POST_LIMITS.body.max}
            value={body}
            onChange={handleBodyChange}
            error={errors.body}
          />
        </div>

        <div className={styles.footer}>
          <span className={styles.count}>
            {body.length} / {POST_LIMITS.body.max}
          </span>
          <div className={styles.actions}>
            <Button variant="text" onClick={handleClear}>
              Clear
            </Button>
            <Button type="submit">Publish</Button>
          </div>
        </div>

        <p className={styles.srOnly} role="status">
          {status}
        </p>
      </form>
    </section>
  );
}
