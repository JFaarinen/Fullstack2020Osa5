import React, { useState } from 'react';

const NewBlogForm = ({ createBlog }) => {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const addBlog = (event) => {
        event.preventDefault();
        console.log('adding new blog:', author, ' ', title, ' ', url);
        createBlog({
            title: title,
            author: author,
            url: url
        });
        setTitle('');
        setAuthor('');
        setUrl('');
    };

    return (
        <div className='formDiv'>
            <h2>Create new</h2>
            <form onSubmit={addBlog}>

                <div>
                    Title:
                    <input
                        id='title'
                        type='text'
                        value={title}
                        name='Title'
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    Author:
                    <input
                        id='author'
                        type='text'
                        value={author}
                        name='Author'
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    Url:
                    <input type='text'
                        id='url'
                        value={url}
                        name='Url'
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button id='create-blog' type='submit'>Create</button>
            </form>
        </div>
    );
};

export default NewBlogForm;