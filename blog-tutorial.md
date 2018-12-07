A Guide For Building A React Redux CRUD App
===========================================

Building a single-page CRUD app using [React](https://facebook.github.io/react/) and [Redux](https://github.com/reactjs/) can be challenging because you’ll have to deal w/ new techniques and terms like “Reducers”, “Actions”, “Middlewares”, “Stores” and so on.

_Perhaps the trickiest part is making async requests and handling responses._ While there are many examples, _there is no well established pattern for making async requests and handling responses in Redux apps(just yet)_.

**_In this blog I’ll provide a general approach on how to build a Blog app that has 3 pages and show navigate b/w them._**

**_Further, I’ll also establish a pattern for making async requests and handling four async states: “loading”, “success”, “error” and “success-and-navigate”._**

> **Source code:** [https://github.com/rajaraodv/react-redux-blog](https://github.com/rajaraodv/react-redux-blog)

> **Live App:** [https://protected-escarpment-79486.herokuapp.com/](https://protected-escarpment-79486.herokuapp.com/)

> **Twitter:** [https://twitter.com/rajaraodv](https://twitter.com/rajaraodv) (@rajaraodv)

Let’s get started.

### STEP 1 — Write Detailed Mocks For Each Page And Phases.

In our app we have 3 pages: An **Index** page that shows a list of Posts, a **Post details** page and a **New Post** page.

Each page has “Success”, “Loading” and “Error” **phases** because they all make AJAX calls to load/delete posts, so we need to mock those things as well.

#### 1.1 Success Phase — Detailed Mocks when things are working

> Note: You can click on the pictures to Zoom and read

![](https://cdn-images-1.medium.com/freeze/max/30/1*W9EVx20lNtyHafutHeG7ig.png?q=20)

![](https://cdn-images-1.medium.com/max/800/1*W9EVx20lNtyHafutHeG7ig.png)

#### 1.2 Loading Phase — Detailed Mocks when they are loading

![](https://cdn-images-1.medium.com/freeze/max/30/1*yI0Hfav100ILspf99x_9Eg.png?q=20)

![](https://cdn-images-1.medium.com/max/800/1*yI0Hfav100ILspf99x_9Eg.png)

#### 1.3 Error Phase — Detailed Mocks when there is an Error

![](https://cdn-images-1.medium.com/freeze/max/30/1*dcubqLNT9nGN3an82P4k7w.png?q=20)

![](https://cdn-images-1.medium.com/max/800/1*dcubqLNT9nGN3an82P4k7w.png)

### STEP 2 — Divide Each Page Into Components

Look at all the phases of each page and _roughly_ divide each page into components based on “**purpose**” and based on **physical** location.

This helps you identify reusable components across different pages and also any additional ones in a specific phase. For example, you may need a “Spinner” or an “Error” component for different phases.

> Note: this doesn’t need to be perfect. You can make changes later on.

![](https://cdn-images-1.medium.com/freeze/max/30/1*NI2eOJmFrA9WTphppbTUgQ.png?q=20)

![](https://cdn-images-1.medium.com/max/800/1*NI2eOJmFrA9WTphppbTUgQ.png)

#### 2.1 — Success Phase: Divide Each Page Into Components

1.  **Index page:** 1. Shows list of posts, 2. Allows navigating to Post form page to create new post. So we end up w/ **PostsList** and **Header** components.
2.  **Post details page:** 1. Shows details of the post, 2. Allows navigating back to Index page 3. Index page. So we end up with **PostDetails** and **Header** components.

3\. **New Post page:** 1. Allows creating posts and 2. allows navigating back to Index. Again we end up with **PostForm** and **Header** component.

Notice that we can reuse **Header** across all 3 pages because of the **physical** location. So we end up with four components (instead of 6): **1\. PostsList, 2. PostDetails 3. PostForm and 4. Header components.**

#### 2.2 — Loading Phase: Divide Each Page Into Components

If you look at the mock, we are simply displaying “loading..” text in each page and not using some fancy spinner or “toast”. So we don’t have any more components.

#### 2.3 — Error Phase: Divide Each Page Into Components

If you look at the mock, we are simply throwing an alert popup and not using any custom modals. So we don’t have any more components.

So net-net, we have 4 components (**1\. PostsList, 2. PostDetails 3. PostForm and 4. Header)**

### Redux Terms:

#### Redux Terms — “Actions” And “States”

**_Every component does two things:  
_**1\. Listen to the user and server events and send them to JS functions. In Redux, events are represented as a JSON object called “Actions”.

{"type": "FETCH\_POST", "id": 1234} // <-- Action

2\. Render DOM based on some data. This data is called a“**state**”, which is also a JSON object.

{"post": {"id": 1234, "title": "My Redux Post"}} // <-- state

#### Redux Terms — “Action Creators”

These are functions that listen to DOM or server events and return formal JSON “Action” object.

function fetchPost(id) {  
return {  
 type: FETCH\_POST,  
 result: makeServerRequest("http://postsServer.com/api/id")  
 };  
}

> See [Action Creators](https://github.com/rajaraodv/react-redux-blog/blob/master/public/src/actions/) for our app.

#### Redux Terms — “Dispatching an Action”

Redux provides a function called “**dispatch**” which allows us to pass the “Action” JSON object to all other components. Dispatching an Action means simply calling the dispatch function w/ the action JSON object.

//Call the "Action Creator" w/ post's id and then use it's return //value (Action JSON object) to finally dispatch it to "reducers"

dispatch(fetchPost(id)) or dispatch({type:"FETCH\_POST", id:1234})

> The components calls Action creators to receive Actions and then dispatches the actions. Redux then send the actions to “Reducers”

#### Redux Terms — “Reducers”

**Reducers are functions that take an Action and the current state that was sent to them via “dispatch”, apply action to the current state and return a new state**. And Redux re-renders all components whenever there is a new state.

//If the action is FETCH\_POST\_SUCCESS, return a new "activePost" //state w/ new post)  
case FETCH\_POST\_SUCCESS:  
 return {activePost: {post: action.payload.data, error:null,       
                     loading: false}};

> See Reducers “[reducer\_posts.js](https://github.com/rajaraodv/react-redux-blog/blob/master/public/src/reducers/reducer_posts.js)” and main “[index.js](https://github.com/rajaraodv/react-redux-blog/blob/master/public/src/reducers/index.js)” (this combines multiple reducers into one)

> **OK, before we go ahead to step 3, let’s understand how to deal with Async Actions because every page makes AJAX calls.**

### **PATTERN: Dealing With Async Actions**

If component is loading an object(e.g. list of Posts) via AJAX call to the server, that object’s state should keep track of all the potential states. Initial state for such objects should look like: {**_objName: {obj:null, loading: false, error:null}}._**

Further, such components should dispatch up to 4 actions such as “**FETCH\_OBJ**”(for loading), “**FETCH\_OBJ\_SUCCESS**”, “**FETCH\_OBJ\_FAILURE**” and “**OBJ\_RESET**”(to cleanup dirty previous state).

For example, if we are loading list of posts..

> Note: You can click on the pictures to zoom and read

![](https://cdn-images-1.medium.com/freeze/max/30/1*BvyBVTs4GmOf2zULvnGaTg.png?q=20)

![](https://cdn-images-1.medium.com/max/800/1*BvyBVTs4GmOf2zULvnGaTg.png)

**Initial State:** Initial state should look like,

{postsList:{posts:\[\], loading:false, error:null}}

**Actions:**

1.  **FETCH\_OBJ** — Dispatch this to make the server request and also let other components know we are **loading**. This helps current/other components show “loading” or hide or do something.

dispatch({“type”: “FETCH\_POSTS”, loading: true})

Once Redux gets this and passes it through reducers, the new state will look something like:

{postList: {posts:null, error: null, loading: true}}

2\. **FETCH\_OBJ\_SUCCESS**: Dispatch this when you get successful response. This is to show the actual data and also to cancel “loading”

dispatch({"type": "FETCH\_POSTS\_SUCCESS", "posts":\[post1, post2\])

Once Redux gets this and passes it through reducers, the new state will look something like:

{postsList:{posts:\[post1, post2\], error:null, loading: false}}

3.**FETCH\_OBJ\_FAILURE**: Dispatch this when you get a failed response. This is to show some error message and also to cancel “loading”.

dispatch({"type": "FETCH\_POSTS\_FAILURE", "error": "Error message"})

Once Redux gets this and passes it through reducers, the new state will look something like:

{postList:{posts:null, error:{msg: "Error msg"}, loading: false}}

4.**RESET\_OBJ**: Dispatch this to reset the component’s state after success/failure. **This is optional but can be useful when you want to reuse a “dirty” component from previous AJAX request.**

dispatch({"type": "RESET\_POST", loading: false, "post": null, "error": "Error message"})

Once Redux gets this and passes it through reducers, the new state will look something like:

{postList:{post:null, error:null, loading: false}}

### STEP 3 — List State and Actions For Each Component (AND For Each Phase)

Take a look at each component one by one and each phase and list of state and actions.

We have 4 components: **1\. PostsList, 2. PostDetails 3. PostForm and 4. Header components.**

#### 3.1 PostList Component — List State And Actions

![](https://cdn-images-1.medium.com/freeze/max/30/1*SSoWLNAOzBkxK-4T2HuzPQ.png?q=20)

![](https://cdn-images-1.medium.com/max/800/1*SSoWLNAOzBkxK-4T2HuzPQ.png)

**States:**

List out various data that may change the display of the component in all phases of the component.

1.  Shows list of Posts. Let’s call the state as “**posts**” (an array).
2.  Shows “Loading..”, if it’s in the processing fetching the posts. Let’s call this state “**loading**”(boolean)
3.  Shows “Error” if there is an error. Let’s call this state as “**error**”(null or error info).

Since all the above are related to PostList, let’s put them in a single state object called **postList.**

{ postsList: {posts: \[\], error:null, loading: false} //initial state

**Actions:**

This component makes a “AJAX” call to load posts, so we’ll use the above mentioned pattern and create 4 actions.

1.Asks server for list of posts. Let’s call this action as: “FETCH\_POSTS”.

export function fetchPosts() {  
 const request = axios.get(\`${ROOT\_URL}/posts\`);

return {  
 type: FETCH\_POSTS,  
 payload: request  
 };  
}

2.Tells every component that it received posts (success case). Let’s call this “FETCH\_POSTS\_SUCCESS”

export function fetchPostsSuccess(posts) {  
 return {  
 type: FETCH\_POSTS\_SUCCESS,  
 payload: posts  
 };  
}

3.Tells every component that there was an error(failure case). Let’s call this “FETCH\_POSTS\_FAILURE”

export function fetchPostsFailure(error) {  
 return {  
 type: FETCH\_POSTS\_FAILURE,  
 payload: error  
 };  
}

4\. Resetting data is not required because this is the 1st page (you’ll see how this is useful in other 2 pages)

#### 3.2 PostDetails Component — List State And Actions

> Note: You can click on the pictures to zoom and read

![](https://cdn-images-1.medium.com/freeze/max/30/1*qHMPcz-dVKe7ai1z3Koecg.png?q=20)

![](https://cdn-images-1.medium.com/max/800/1*qHMPcz-dVKe7ai1z3Koecg.png)

#### 3.3 PostForm Component — State And Actions

![](https://cdn-images-1.medium.com/freeze/max/30/1*0jws-QutuczHQDwxTwAM7g.png?q=20)

![](https://cdn-images-1.medium.com/max/800/1*0jws-QutuczHQDwxTwAM7g.png)

#### 3.4 Header Component — List State And Actions

![](https://cdn-images-1.medium.com/freeze/max/30/1*tzojxjqL59C7Urs9wwPmDw.png?q=20)

![](https://cdn-images-1.medium.com/max/800/1*tzojxjqL59C7Urs9wwPmDw.png)

### STEP 4 — Create Action Creators For Each Action

We have a total of **12 actions(4 actions x 3 pages)**, create action creators for each one. Please see the [source code here](https://github.com/rajaraodv/react-redux-blog/blob/master/public/src/actions/index.js).

//Example Action creators...

export function fetchPosts() {  
 const request = axios.get(\`${ROOT\_URL}/posts\`);

return {  
 type: FETCH\_POSTS,  
 payload: request  
 };  
}

export function fetchPostsSuccess(posts) {  
 return {  
 type: FETCH\_POSTS\_SUCCESS,  
 payload: posts  
 };  
}  
...

### Redux Term: “Reducers”

Reducers are functions that take “state” from Redux and “action” JSON object and returns a new “state” to be stored back in Redux.  
  
1\. Reducer functions are called by the “Container” containers when there is a user or server action.  
2\. If the reducer changes the state, Redux passes the new state to each component and React re-renders each component

The below function takes the current "postsList" inside "...state" and merges new "postList" and creates a \*\*new\*\* state(json), if the action is "FECTH\_POSTS\_SUCCESS"

case FETCH\_POSTS\_SUCCESS:  
 return { …state, postsList: {posts: action.payload, error:null,        
                              loading: false}   
        };

### STEP 5 — Write Reducers For Each Action

We have 12 actions, we need to write reducers for each one of them.

Please look at the [source code for details here](https://github.com/rajaraodv/react-redux-blog/blob/master/public/src/reducers/reducer_posts.js).

### Redux Term: “Presentational” and “Container” Components

Keeping React and Redux logic inside each component can make it messy, so Redux recommends creating a dummy presentation only component called “Presentational” component and a parent wrapper component called “Container” component that deals w/ Redux, dispatch “Actions” and more.  
  
The parent Container then passes the data to the presentational component, handle events, deal with React on behalf of Presentational component.

![](https://cdn-images-1.medium.com/freeze/max/30/1*8naKQS5q3GXlqzHQLMNJ-Q.png?q=20)

![](https://cdn-images-1.medium.com/max/800/1*8naKQS5q3GXlqzHQLMNJ-Q.png)

> **_Legend_**: Yellow dotted lines = “Presentational” components. Black dotted lines = “Container” components.

### STEP 6 — Implement Every Presentational Component

We have 4 components: **PostsList, PostDetails, PostForm and Header**. Let’s create presentational components for each one.

#### 6.1 Implement Presentational Component — PostsList

> Note: You can click on the pictures to zoom and read

![](https://cdn-images-1.medium.com/freeze/max/30/1*wgv9ZrBoTL9ujxUnrnIvlQ.png?q=20)

![](https://cdn-images-1.medium.com/max/800/1*wgv9ZrBoTL9ujxUnrnIvlQ.png)

#### 6.2 Implement Presentational Component — PostDetails

![](https://cdn-images-1.medium.com/freeze/max/30/1*7hwsBN_-1KqNv7xR-hC9YQ.png?q=20)

![](https://cdn-images-1.medium.com/max/800/1*7hwsBN_-1KqNv7xR-hC9YQ.png)

#### 6.3 Implement Presentational Component — PostForm

![](https://cdn-images-1.medium.com/freeze/max/30/1*2w9eQMK__FuESaDWlziyaQ.png?q=20)

![](https://cdn-images-1.medium.com/max/800/1*2w9eQMK__FuESaDWlziyaQ.png)

> Note: In the actual code, I am using the awesome [redux-form](https://github.com/erikras/redux-form) library for form-validation. I’ll blog about it in a different post.

#### 6.4 Implement Presentational Component — Header

![](https://cdn-images-1.medium.com/freeze/max/30/1*Zpw_soSAlhN_4POpyPor6w.png?q=20)

![](https://cdn-images-1.medium.com/max/800/1*Zpw_soSAlhN_4POpyPor6w.png)

> Note: You can click on the pictures to zoom and read

### STEP 7 — Create Container Component For Some/All Presentational Component

We have 4 components: PostList, PostDetails, PostForm and Header. Let’s create container components for each one.

#### 7.1 Create Container Component — PostsListContainer

![](https://cdn-images-1.medium.com/freeze/max/30/1*paowu40xgHA8l4zHJyG7aQ.png?q=20)

![](https://cdn-images-1.medium.com/max/800/1*paowu40xgHA8l4zHJyG7aQ.png)

#### 7.2 Create Container Component — PostDetailsContainer

![](https://cdn-images-1.medium.com/freeze/max/30/1*mxsh2xZYnVbFJvY7hG73eg.png?q=20)

![](https://cdn-images-1.medium.com/max/800/1*mxsh2xZYnVbFJvY7hG73eg.png)

#### 7.3 Create Container Component — PostFormContainer

![](https://cdn-images-1.medium.com/freeze/max/30/1*KrPV7Ssxu1dPuwAQ4ilTyQ.png?q=20)

![](https://cdn-images-1.medium.com/max/800/1*KrPV7Ssxu1dPuwAQ4ilTyQ.png)

#### 7.4 Create Container Component — HeaderContainer

![](https://cdn-images-1.medium.com/freeze/max/30/1*_NkFxHOJHQEOy_yuf04aXQ.png?q=20)

![](https://cdn-images-1.medium.com/max/800/1*_NkFxHOJHQEOy_yuf04aXQ.png)

### STEP 8 — Finally Bring Them All Together

Below code is a simplified version of wiring everything together. Please see source code of the main [index.js](https://github.com/rajaraodv/react-redux-blog/blob/master/public/src/index.js) and [reducers.js](https://github.com/rajaraodv/react-redux-blog/blob/master/public/src/reducers.js) to get started.

import React from 'react'; <-- Main React lib  
import ReactDOM from 'react-dom'; <-- Main React DOM lib  
import { Provider } from 'react-redux';<-- Injects Redux to comps  
import { createStore, applyMiddleware } from 'redux';<- Redux  
import { Router, browserHistory } from 'react-router';<- Navigation  
import reducers from './reducers'; <- Import reducers  
import promise from 'redux-promise';

//Configure middleware w/ redux-promise for AJAX requests  
const createStoreWithMiddleware = applyMiddleware(  
  promise  
)(createStore);

const store = createStoreWithMiddleware(reducers);

ReactDOM.render(  
  <Provider store={store}> <- Inject global redux state to comps  
    <Router history={browserHistory}>  
       <Route path=”/” component={App}> <- Wrapper for all pages  
         <IndexRoute component={PostsIndex} /> <-wrapper Index page  
         <Route path=”posts/new” component={PostsNew} /> <- New page  
         <Route path=”posts/:id” component={PostsShow} /> <-Details  
       </Route>  
    </Router>  
</Provider>  
  , document.getElementById('body'));

That’s it for now!

### My Other Blogs

**LATEST:**

1.  [_\[Video course\] The Inner workings of the Browser — for JavaScript & Web Developers_](https://medium.com/@rajaraodv/the-inner-workings-of-the-browser-for-javascript-web-developers-course-d26f11270f41) **_Use code: INNER15 and get 50% off!_**

#### Functional Programming

1.  [_JavaScript Is Turing Complete — Explained_](https://medium.com/@rajaraodv/javascript-is-turing-complete-explained-41a34287d263#.6t0b2w66p)
2.  [_Functional Programming In JS — With Practical Examples (Part 1)_](https://medium.com/@rajaraodv/functional-programming-in-js-with-practical-examples-part-1-87c2b0dbc276#.fbgrmoa7g)
3.  [_Functional Programming In JS — With Practical Examples (Part 2)_](http://Functional%20Programming%20In%20JS — With%20Practical%20Examples%20%28Part%202%29)
4.  [_Why Redux Need Reducers To Be “Pure Functions”_](https://medium.com/@rajaraodv/why-redux-needs-reducers-to-be-pure-functions-d438c58ae468#.bntrywxrf)

#### ES6

1.  [_5 JavaScript “Bad” Parts That Are Fixed In ES6_](https://medium.com/@rajaraodv/5-javascript-bad-parts-that-are-fixed-in-es6-c7c45d44fd81#.7e2s6cghy)

#### WebPack

1.  [_Webpack — The Confusing Parts_](https://medium.com/@rajaraodv/webpack-the-confusing-parts-58712f8fcad9#.6ot6deo2b)
2.  [_Webpack & Hot Module Replacement \[HMR\]_](https://medium.com/@rajaraodv/webpack-hot-module-replacement-hmr-e756a726a07#.y667mx4lg)
3.  [_Webpack’s HMR And React-Hot-Loader — The Missing Manual_](https://medium.com/@rajaraodv/webpacks-hmr-react-hot-loader-the-missing-manual-232336dc0d96#.fbb1e7ehl)

#### Draft.js

1.  [_Why Draft.js And Why You Should Contribute_](https://medium.com/@rajaraodv/why-draft-js-and-why-you-should-contribute-460c4a69e6c8#.jp1tsvsqc)
2.  [_How Draft.js Represents Rich Text Data_](https://medium.com/@rajaraodv/how-draft-js-represents-rich-text-data-eeabb5f25cf2#.hh0ue85lo)

#### React And Redux :

1.  [_Step by Step Guide To Building React Redux Apps_](https://medium.com/@rajaraodv/step-by-step-guide-to-building-react-redux-apps-using-mocks-48ca0f47f9a#.s7zsgq3u1)
2.  [_A Guide For Building A React Redux CRUD App_](https://medium.com/@rajaraodv/a-guide-for-building-a-react-redux-crud-app-7fe0b8943d0f#.g99gruhdz) _(3-page app)_
3.  [_Using Middlewares In React Redux Apps_](https://medium.com/@rajaraodv/using-middlewares-in-react-redux-apps-f7c9652610c6#.oentrjqpj)
4.  [_Adding A Robust Form Validation To React Redux Apps_](https://medium.com/@rajaraodv/adding-a-robust-form-validation-to-react-redux-apps-616ca240c124#.jq013tkr1)
5.  [_Securing React Redux Apps With JWT Tokens_](https://medium.com/@rajaraodv/securing-react-redux-apps-with-jwt-tokens-fcfe81356ea0#.xci6o9s6w)
6.  [_Handling Transactional Emails In React Redux Apps_](https://medium.com/@rajaraodv/handling-transactional-emails-in-react-redux-apps-8b1134748f76#.a24nenmnt)
7.  [_The Anatomy Of A React Redux App_](https://medium.com/@rajaraodv/the-anatomy-of-a-react-redux-app-759282368c5a#.7wwjs8eqo)
8.  [_Why Redux Need Reducers To Be “Pure Functions”_](https://medium.com/@rajaraodv/why-redux-needs-reducers-to-be-pure-functions-d438c58ae468#.bntrywxrf)

#### Salesforce

1.  [_Developing React Redux Apps In Salesforce’s Visualforce_](https://medium.com/@rajaraodv/developing-react-redux-apps-in-salesforce-s-visualforce-3ad7be560d1c#.f6bao6mtu)

_🎉🎉🎉_ **_If you like this post, please share it on Twitter._** [**_https://twitter.com/rajaraodv_**](https://twitter.com/rajaraodv)  _🎉🎉🎉_

Thanks for reading!!😀🙏

*   [React](https://medium.com/tag/react?source=post)
*   [Redux](https://medium.com/tag/redux?source=post)
*   [JavaScript](https://medium.com/tag/javascript?source=post)
*   [Tech](https://medium.com/tag/tech?source=post)
*   [Technology](https://medium.com/tag/technology?source=post)
