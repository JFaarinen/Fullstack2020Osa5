import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Message from './components/Message';
import blogService from './services/blogs';
import loginService from './services/login';
import NewBlogForm from './components/NewBlogForm';
import Toggable from './components/Toggable';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');
    const blogFormRef = useRef();

    useEffect(() => {
        blogService
            .getAll()
            .then(blogs => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginService.login({
                username, password
            });

            window.localStorage.setItem(
                'loggedBloglistUser', JSON.stringify(user)
            );

            blogService.setToken(user.token);
            setUser(user);
            setUsername('');
            setPassword('');
            showMessage('message', `Welcome ${user.name}`);
        } catch (exception) {
            showMessage('error', 'wrong credientials');
        }
    };

    const handleLogoff = (event) => {
        event.preventDefault();
        window.localStorage.removeItem('loggedBloglistUser');
        setUser(null);
        showMessage('message', 'Goodbye!');
    };

    const handleLike = async (id) => {
        const blog = blogs.find(b => b.id === id);
        const updatedBlog = {
            ...blog, likes: blog.likes + 1
        };

        try {
            const result = await blogService.update(id, updatedBlog);
            setBlogs(blogs.map(blog => blog.id !== id ? blog : result));
        } catch (exception) {
            console.log(exception);
        }
    };

    const handleDelete = async (id) => {
        const blog = blogs.find(b => b.id === id);
        if (window.confirm(`Do you want to remove ${blog.title}`)) {
            try {
                await blogService.remove(id);
                setBlogs(blogs.filter(blog => blog.id !== id));
            } catch (exception) {
                console.log(exception);
            }
        }
    };

    const addNewBlog = (blogObject) => {

        blogFormRef.current.toggleVisibility();
        blogService
            .addNew(blogObject)
            .then(returnedBlog => {
                console.log(returnedBlog);
                setBlogs(blogs.concat(returnedBlog));
                showMessage('message', `New blog added: ${returnedBlog.title} Author: ${returnedBlog.author}`);
            })
            .catch(error => {
                console.log(error);
                showMessage('error', 'Blogin lisääminen ei onnistunut, tarkasta tiedot!');
            });
    };

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <h2>Please, log in to application</h2>
            <div>
                Username:
                <input
                    id='username'
                    type='text'
                    value={username}
                    name='Username'
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                Password:
                <input
                    id='password'
                    type='password'
                    value={password}
                    name='Password'
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button id='login-button' type='submit'>Login</button>
        </form>
    );

    const showMessage = (type, message) => {
        setType(type);
        setMessage(message);
        setTimeout(() => { setMessage(null); }, 5000);
    };

    const blogList = () => (
        <div>
            <p>{user.name} logged in</p>
            <button onClick={handleLogoff}>Log off</button>
            <h2>Blogs</h2>
            {blogs.map(blog =>
                <Blog
                    key={blog.id}
                    blog={blog}
                    handleLike={() => handleLike(blog.id)}
                    handleDelete={() => handleDelete(blog.id)}
                />)}
        </div>
    );

    const addBlogForm = () => (
        <Toggable buttonLabel='Add new' ref={blogFormRef}>
            <NewBlogForm createBlog={addNewBlog} />
        </Toggable>
    );

    return (
        <div>
            <Message type={type} message={message} />
            {user === null && loginForm()}
            {user !== null && blogList()}
            {user !== null && addBlogForm()}
        </div>
    );
};

export default App;