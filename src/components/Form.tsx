import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { postCommentsThunk } from '../app/slices/postCommentsSlice';
import { putCommentsThunk } from '../app/slices/putCommentsSlice';
import { useAppDispatch, RootState } from '../app/store';

function Form() {
  const dispatch = useAppDispatch();

  const commentById = useSelector(
    (state: RootState) => state.getCommentByIdReducer.comment
  );
  const [commentFormValue, setCommentFormValue] = useState({
    profile_url: commentById?.profile_url || '',
    author: commentById?.author || '',
    content: commentById?.comment?.content || '',
    createdAt: commentById?.createdAt || '',
  });

  const onPostingComment = (e: React.FormEvent<HTMLFormElement>) => {
    const { profile_url, author, content, createdAt } = commentFormValue;
    e.preventDefault();
    dispatch(
      postCommentsThunk({
        profile_url,
        author,
        content,
        createdAt,
      })
    );
  };

  const onEditingComment = (e: React.FormEvent<HTMLFormElement>) => {
    const { profile_url, author, content, createdAt } = commentFormValue;
    const { id } = commentById;
    e.preventDefault();
    console.log({
      id,
      profile_url,
      author,
      content,
      createdAt,
    });
    dispatch(
      putCommentsThunk({
        id,
        profile_url,
        author,
        content,
        createdAt,
      })
    );
  };

  // custom hook
  const setProfileUrl = (e: any) => {
    setCommentFormValue({
      ...commentFormValue,
      profile_url: e.target.value,
    });
  };

  const setAuthor = (e: any) => {
    setCommentFormValue({
      ...commentFormValue,
      author: e.target.value,
    });
  };

  const setContent = (e: any) => {
    setCommentFormValue({
      ...commentFormValue,
      content: e.target.value,
    });
  };

  const setCreatedAt = (e: any) => {
    setCommentFormValue({
      ...commentFormValue,
      createdAt: e.target.value,
    });
  };

  return (
    <FormStyle>
      <form
        onSubmit={
          commentById ? (e) => onEditingComment(e) : (e) => onPostingComment(e)
        }
      >
        <input
          type="text"
          name="profile_url"
          value={commentFormValue.profile_url}
          onChange={setProfileUrl}
          placeholder="https://picsum.photos/id/1/50/50"
          required
        />
        <br />
        <input
          type="text"
          name="author"
          value={commentFormValue.author}
          onChange={setAuthor}
          placeholder="작성자"
        />
        <br />
        <textarea
          name="content"
          value={commentFormValue.content}
          onChange={setContent}
          placeholder="내용"
          required
        ></textarea>
        <br />
        <input
          type="text"
          name="createdAt"
          value={commentFormValue.createdAt}
          onChange={setCreatedAt}
          placeholder="2023-01-19"
          required
        />
        <br />
        <button type="submit">등록</button>
      </form>
    </FormStyle>
  );
}

export default Form;

const FormStyle = styled.div`
  & > form {
    padding: 0 10px;
    margin-bottom: 50px;
  }
  & > form > textarea {
    padding: 5px 1%;
    width: 98%;
    height: 50px;
  }
  & > form > input[type='text'] {
    padding: 5px 1%;
    width: 98%;
    margin-bottom: 10px;
  }
  & > form > button {
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    border: 1px solid lightgray;
    cursor: pointer;
  }
`;
