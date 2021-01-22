import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';
// import NewPost from './NewPost/NewPost';
import asyncComponent from '../../hoc/AsyncComponent';

const AsyncNewPost = asyncComponent(() => { // dynamic import NewPost component
    return import('./NewPost/NewPost');
});

class Blog extends Component {
    state = {
        auth: true
    }

    render () {    
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            {/* will reload */}
                            {/* <li><a href="/">Home</a></li>
                            <li><a href="/new-post">New Post</a></li> */}
                            <li><NavLink 
                                to="/posts/"
                                exact
                                activeClassName="my-active"
                                activeStyle={{
                                    color: '#fa923f',
                                    textDecoration: 'underline'
                                }}>Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path="/" exact render={() => <h1>Home</h1>} />
                <Route path="/" render={() => <h1>Home 2</h1>} /> */}
                <Switch>
                    { this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> : null }
                    <Route path="/posts" component={Posts} />
                    <Route render={() => <h1>Not found</h1>} />
                    {/* <Redirect from="/" to="/posts" /> */}
                    {/* <Route path="/" component={Posts} /> */}
                </Switch>
            </div>
        );
    }
}

export default Blog;