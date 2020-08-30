import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
    let component;
    const blog = {
        title: 'TestBlog title',
        author: 'TestBlog author',
        url: 'http://www.testiblogi.com/blogi',
        likes: 10,
        user: {
            username: 'testuser',
            name: 'Testi Käyttäjä'
        }
    };

    const mockHandler = jest.fn();

    beforeEach(() => {
        component = render(
            <Blog blog={blog} handleLike={mockHandler} />
        );
    });

    test('renders title and author', () => {
        const div = component.container.querySelector('.basic');

        expect(div).toHaveTextContent('title');
        expect(div).toHaveTextContent('author');
        expect(div).not.toHaveTextContent('http://www.testiblogi.com/blogi');
        expect(div).not.toHaveTextContent('likes');
        expect(div).not.toHaveStyle('display: none');
    });

    test('renders url and number of likes when \'View details\' -button is clicked', () => {
        const button = component.getByText('View details');
        fireEvent.click(button);

        const divShow = component.container.querySelector('.detailed');
        const divHide = component.container.querySelector('.basic');

        expect(divShow).toHaveTextContent('likes');
        expect(divShow).toHaveTextContent('http://www.testiblogi.com/blogi');
        expect(divShow).not.toHaveStyle('display: none');
        expect(divHide).toHaveStyle('display: none');
    });

    test('clicking \'Like\' button twice calls event handler two times', () => {
        const button = component.getByText('Like');
        fireEvent.click(button);
        fireEvent.click(button);

        expect(mockHandler.mock.calls).toHaveLength(2);

    });

});