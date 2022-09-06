const newPostBtn = document.querySelector('#post');
const postTextEl = document.querySelector('#post-text');
const postLinkEl = document.querySelector('#post-link');

const getPostIdForEdit = ()=>{
   postId = window.location.href.slice(-1);
   createNewPost(postId)
}

const getPostIdForDelete = ()=>{
    postId = window.location.href.slice(-1);
    deletePost(postId)
 }

const createNewPost = function (id){
    let postText = postTextEl.value.trim();
    let postLink = postLinkEl.value.trim();

    const obj = JSON.stringify({
        post_text: postText,
        post_link: postLink
    })

    fetch(`../api/post/${id}` , {
        method: 'put',
        body: JSON.stringify({
            post_text: postText,
            post_url: postLink
        }),
        headers: { 'Content-Type': 'application/json' }
      })
    .then(response => {
        if(response.ok){
            document.location.replace('/');
        }else{
            alert(response.statusText);
        }
    })
}
    
deletePost = (postId)=>{
    fetch(`/api/post/${postId}`, {
    method: 'delete',
    headers: {
        'Content-Type': 'application/json',
}})};
    
    document.querySelector('.delete').addEventListener('click', getPostIdForDelete)

newPostBtn.addEventListener('click', getPostIdForEdit);
