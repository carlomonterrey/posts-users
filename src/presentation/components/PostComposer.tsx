import { useRef, useState } from 'react';
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
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  function revalidate(nextTitle: string, nextBody: string): void {
    if (hasSubmitted) {
      setErrors(validatePost(nextTitle, nextBody));
    }
  }

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>): void {
    const nextTitle = event.target.value;
    setTitle(nextTitle);
    revalidate(nextTitle, body);
  }

  function handleBodyChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    const nextBody = event.target.value;
    setBody(nextBody);
    revalidate(title, nextBody);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const nextErrors = validatePost(title, body);
    setErrors(nextErrors);
    setHasSubmitted(true);

    if (nextErrors.title) {
      titleRef.current?.focus();
      return;
    }

    if (nextErrors.body) {
      bodyRef.current?.focus();
      return;
    }

    onPublish({ title: title.trim(), body: body.trim() });
    setTitle('');
    setBody('');
    setErrors({});
    setHasSubmitted(false);
  }

  function handleClear(): void {
    setTitle('');
    setBody('');
    setErrors({});
    setHasSubmitted(false);
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

      <form noValidate onSubmit={handleSubmit}>
        <div className={styles.fields}>
          <Input
            ref={titleRef}
            id="post-title"
            name="title"
            label="Title"
            placeholder="Give it a title"
            autoComplete="off"
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
      </form>
    </section>
  );
}
