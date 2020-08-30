import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
    token = `bearer ${newToken}`;
};

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
};

const addNew = async newBlog => {
    const config = {
        headers: { Authorization: token }
    };
    const res = await axios.post(baseUrl, newBlog, config);
    return res.data;
};

const update = async (id, updatedBlog) => {
    const blogUrl = baseUrl + '/' + id;
    const res = await axios.put(blogUrl, updatedBlog);
    return res.data;
};

const remove = async (id) => {
    const config = { headers: { Authorization: token } };
    const blogUrl = baseUrl + '/' + id;
    const res = await axios.delete(blogUrl, config);
    return res.data;
};

export default { getAll, addNew, update, setToken, remove };