import React, { useState } from 'react';

const checkUser = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUserJSON) {
        const logged = JSON.parse(loggedUserJSON);
        return logged.username;
    } else {
        return null;
    }
};

const Blog = ({ blog, handleLike, handleDelete }) => {
    console.log(blog);
    const [detailsVisible, setDetailsVisible] = useState(false);
    const loggedId = checkUser();

    const hideDetails = { display: detailsVisible ? 'none' : '' };
    const showDetails = { display: detailsVisible ? '' : 'none' };
    const userOnly = { display: (loggedId === blog.user.username) ? '' : 'none' };

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    };

    return (
        <div id='blog' style={blogStyle} className='blog'>
            <div style={hideDetails} className='basic'>
                {blog.title}, author: {blog.author} <button id='view-blog' onClick={() => setDetailsVisible(true)}>View details</button>
            </div>
            <div style={showDetails} className='detailed'>
                <div>
                    <p>{blog.title}, author: {blog.author} <button onClick={() => setDetailsVisible(false)}>Hide</button></p>
                    <p>location: {blog.url}</p>
                </div>
                <div>
                    likes: {blog.likes} <button id='like-blog' onClick={handleLike}>Like</button>

                </div>
                <div style={userOnly}>
                    {blog.user.name}<button id='delete-blog' onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>

    );
};

export default Blog;
