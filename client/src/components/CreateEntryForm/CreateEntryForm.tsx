import React, { useState } from 'react';
import './CreateEntryForm.scss';
import { RichTextEditor } from '@mantine/rte';
import { TextInput, MultiSelect } from '@mantine/core';
import DOMPurify from 'dompurify';
import { CreatePostType, PostType } from '../../interfaces/Interfaces';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../Firebase/config';

interface Incoming {
  setOpened: Function;
  spaceId?: number;
  userId?: number;
  setPosts: Function;
}

function CreateEntryForm(props: Incoming) {
  const URL = process.env.REACT_APP_API + '/posts';
  const [richTextValue, setRichTextValue] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<string[]>(['Travel', 'News', 'Bug', 'Important', 'Diary', 'Notes']);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tagsArrToStr = (tags: string[]) => {
    let tagsString: string = '';
    tags.forEach((tag: string) => {
      tagsString += tag + ',';
    });
    return tagsString;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (props.userId && props.spaceId) {
      const postData = {
        title: DOMPurify.sanitize(title),
        content: richTextValue, // TODO: Check how to insert rich text safely without sanitizing here
        createdAt: new Date(),
        tags: DOMPurify.sanitize(tagsArrToStr(selectedTags)),
        userId: props.userId,
        spaceId: props.spaceId,
        comments: [],
      };

      createPost(postData);
    }
    props.setOpened(false);
  };

  const createPost = async (data: CreatePostType) => {
    const res = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const post = await res.json();
    // add comment property to post obj to prevent undefined objects
    post.comments = [];

    props.setPosts((prevState: PostType[]) => {
      // sort posts before adding new one
      prevState.sort((a, b) => {
        return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
      });
      return [post, ...prevState];
    });
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    // create a reference to the place I want to store the file
    const storageRef = ref(storage, `space${props.spaceId}/${file.name}`);

    // upload the file
    await uploadBytes(storageRef, file);
    // get the download link
    const url = await getDownloadURL(storageRef);
    // return url to the rich text editor
    return url;
  };

  // TODO: Fix Rich Text Editor Bugs
  return (
    <div className="create-entry-form">
      <form onSubmit={handleSubmit}>
        <label htmlFor='title'>Title:</label>
        <TextInput id='title' required value={title} onChange={(event) => setTitle(event.currentTarget.value)} />
        <label htmlFor='text'>Text:</label>
        <RichTextEditor
          id='text'
          value={richTextValue}
          onChange={setRichTextValue}
          onImageUpload={handleImageUpload}
          controls={[
            ['bold', 'italic', 'underline', 'link', 'image', 'video'],
            ['unorderedList', 'h1', 'h2', 'h3'],
            ['sup', 'sub'],
            ['alignLeft', 'alignCenter', 'alignRight'],
          ]}
        />
        <label>Select tags or create your own:</label>
        <MultiSelect
          data={tags}
          searchable
          creatable
          onChange={setSelectedTags}
          getCreateLabel={(query) => `+ Create ${query}`}
          onCreate={(query) => setTags((current) => [...current, query])}
        />
        <button className="create-entry-form-submit">Create</button>
      </form>
    </div>
  );
}

export default CreateEntryForm;
