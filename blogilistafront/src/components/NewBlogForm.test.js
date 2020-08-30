import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NewBlogForm from './NewBlogForm';

test('<NewBlogForm /> calls callback function with proper input', () => {
    const createBlog = jest.fn();

    const component = render(
        <NewBlogForm createBlog={createBlog} />
    );

    const title = component.container.querySelector('#title');
    const author = component.container.querySelector('#author');
    const url = component.container.querySelector('#url');
    const form = component.container.querySelector('form');

    fireEvent.change(author, {
        target: { value: 'New Author' }
    });
    fireEvent.change(title, {
        target: { value: 'New Blog Title' }
    });
    fireEvent.change(url, {
        target: { value: 'http://www.newurl.fi/blogi' }
    });
    fireEvent.submit(form);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].author).toBe('New Author');
    expect(createBlog.mock.calls[0][0].title).toBe('New Blog Title');
    expect(createBlog.mock.calls[0][0].url).toBe('http://www.newurl.fi/blogi');
});
