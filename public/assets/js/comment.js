async function commentFormHandler(event) {
    event.preventDefault();

    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();

    const post_id = window.location.toString().split('/')[window.location.toString().split('/').length -1]

    if(comment_text){
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(response.ok){
            document.location.reload();
        }else{
            alert(response.statusText);
        }
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);

document.querySelector('.delete').addEventListener('click', (id)=>{
    fetch(`/api/post/${id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    })

    document.querySelector('#post').addEventListener('click', (id)=>{
        fetch(`/api/post/${id}`, {
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        })

        