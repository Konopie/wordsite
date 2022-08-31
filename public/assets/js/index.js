const dashBtn = document.querySelector("#dash-btn");

dashBtn.addEventListener('click', ()=>{
    location.pathname = '/posts'
})

async function logIn() {
    const response = await fetch('/api/user/logIn', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
    });
  
    if (response.ok) {
      document.location.replace('/login');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('#logIn').addEventListener('click', logIn);