// const {Post} = require('../../../models/index.js')

const searchBar = document.getElementById('search-bar')
const welcome = document.getElementById('welcome');
const wrapper = document.getElementById('wrapper');

console.log(document.getElementById('user').innerHTML);
console.log(document.querySelector('#user').innerHTML);

let postTitle;
let postText;
let postListItems = [];


postTitle = document.querySelector('.post-title');
postText = document.querySelector('.post-textarea');
postList = document.querySelector('.post-list');
  
//  get all posts
const getPosts = () => 
        fetch('/api/post', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
});

// get user id from username
const getUserId = (user) => {
    return fetch(`/api/user/username/${user}`)
    .then(res => {
      return res.json()})
    .then(data => {
      return data.id
    })
}

// get posts from user id
const getUserPosts = (id) => {
   return fetch(`/api/post/userID/${id}`)
   .then(res => {
    return res.json()})
  .then(data => {
    return data
  })
  }

  // get a username from id
const getUsername = (id) => {
    return fetch(`/api/user/${id}`)
      .then( res => res.json())
      .then( data => {
        return data.username;
      })
}


// Render the list of post titles
const renderPostList = async (posts) => {
  let jsonPosts = posts
  console.log(jsonPosts);
    // let jsonPosts = await posts.json();
    if (window.location.pathname === '/post') {
      postList.forEach((el) => (el.innerHTML = ''));
    }


   let postListItems = []

    // Returns HTML element 
    const createLi = async (id, user_id, post_text, post_url) => {
      const liEl = document.createElement('li');
      liEl.classList.add('card');
  
      const spanEl = document.createElement('span');
      spanEl.classList.add('card-title');
      spanEl.innerText = post_text;
      liEl.append(spanEl);

      const brEl = document.createElement('br');
      liEl.append(brEl);

      const linkEl = document.createElement('a');
      linkEl.href = post_url;
      linkEl.innerText = post_url;
      liEl.append(linkEl);

      const userEl = document.createElement('p');
      userEl.innerText = await getUsername(user_id);
      liEl.append(userEl);

      const comments = document.createElement('button');
      comments.innerText = 'comments';
      const toComments = ()=>{
        location.assign(`/post/${id}`);
      }
      comments.onclick = toComments;
      liEl.append(comments);


      return new Promise((resolve, reject)=>{
        resolve(liEl);
      });
    };
  
  
    for (let i = 0; i < jsonPosts.length; i++) {
      const li = await createLi(jsonPosts[i].id, jsonPosts[i].user_id, jsonPosts[i].post_text, jsonPosts[i].post_url);
      postListItems.push(li);   
    };

      postListItems.forEach((post) =>{
       postList.append(post)});
};
  
// get all posts and push to page
const getAndRenderPosts = () => getPosts()
  .then((res)=>{
  return res.json()})
  .then( data => { 
  renderPostList(data)
});


getUserId(document.getElementById('user').innerHTML)
.then(userId => {
  console.log(userId)
  return getUserPosts(userId)
})
.then(userPosts => {
  console.log(userPosts)
  renderPostList(userPosts)
})

// getAndRenderPosts();

// module.exports = {getUserId, getUserPosts, renderPostList}