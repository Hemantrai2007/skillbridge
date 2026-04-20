
  const eyeOpenPath  = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
  const eyeClosedPath = '<path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>';
 
  document.getElementById('togglePw').addEventListener('click', function () {
    const pw = document.getElementById('password');
    const icon = document.getElementById('eyeIcon');
    if (pw.type === 'password') {
      pw.type = 'text';
      icon.innerHTML = eyeClosedPath;
    } else {
      pw.type = 'password';
      icon.innerHTML = eyeOpenPath;
    }
  });
 
  document.getElementById('password').addEventListener('input', function () {
    const val = this.value;
    let score = 0;
    if (val.length >= 8)  score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
 
    const colors = ['#ef5350','#ffa726','#66bb6a','#43a047'];
    const labels = ['Weak','Fair','Good','Strong'];
    const bars = [document.getElementById('s1'),document.getElementById('s2'),document.getElementById('s3'),document.getElementById('s4')];
    bars.forEach((b, i) => { b.style.background = i < score ? colors[score - 1] : '#eee'; });
    document.getElementById('strengthLabel').textContent = val.length ? labels[score - 1] || '' : '';
    document.getElementById('strengthLabel').style.color = val.length ? colors[score - 1] : '#aaa';
  });
 
  function showError(id, show) {
    const el = document.getElementById(id);
    el.style.display = show ? 'block' : 'none';
  }
 
  function setFieldError(inputId, hasError) {
    const el = document.getElementById(inputId);
    if (hasError) el.classList.add('error'); else el.classList.remove('error');
  }
 
  function showToast(msg, success = true) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.style.background = success ? '#2e7d32' : '#c62828';
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3500);
  }
 
 async function handleSubmit() {
  const email = document.getElementById('email').value.trim();   // ✅ FIX
  const pw    = document.getElementById('password').value.trim();

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const emailErr = !email || !emailRe.test(email);
  const pwErr = pw.length < 8;

  showError('emailError', emailErr);
  setFieldError('email', emailErr);

  showError('passwordError', pwErr);
  setFieldError('password', pwErr);

  if (emailErr || pwErr) return;

  const btn = document.getElementById('createBtn');
  btn.disabled = true;

  try {
    const res = await fetch("http://localhost:8000/auth/signin", {   
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,    
        password: pw
      })
    });

    const data = await res.json();
    showToast(data.message,true);

    if(data.success == true){

     
      setTimeout(()=>{
        window.location.href="homepage.html"
      },2000);
    }
    else{
      setTimeout(()=>{
        location.reload()
      },2000);
    }

 } catch (err) {
    console.error(err);
    showToast("Server error! Try again.", false);
  }

  btn.disabled = false;
}

  // ['fullName','email','password'].forEach(id => {
  //   document.getElementById(id).addEventListener('input', function () {
  //     this.classList.remove('error');
  //     const errMap = { fullName: 'nameError', email: 'emailError', password: 'passwordError' };
  //     showError(errMap[id], false);
  //   });


