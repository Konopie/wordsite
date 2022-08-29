const newPostBtn = document.querySelector('#post-submit');
const postTextEl = document.querySelector('#post-text');
const postLinkEl = document.querySelector('#post-link');

const createNewPost = function (){
    let postText = postTextEl.value.trim();
    let postLink = postLinkEl.value.trim();

    const obj = JSON.stringify({
        post_text: postText,
        post_link: postLink
    })

    fetch('/api/post' , {
        method: 'post',
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

newPostBtn.addEventListener('click', createNewPost);