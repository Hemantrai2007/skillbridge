
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
  const name  = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const pw    = document.getElementById('password').value;
  const terms = document.getElementById('terms').checked;

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const nameErr = !name;
  const emailErr = !emailRe.test(email);
  const pwErr = pw.length < 8;
  const termsErr = !terms;

  showError('nameError', nameErr);     
  setFieldError('fullName', nameErr);

  showError('emailError', emailErr);    
  setFieldError('email', emailErr);

  showError('passwordError', pwErr);    
  setFieldError('password', pwErr);

  document.getElementById('termsError').style.display = termsErr ? 'block' : 'none';

  if (nameErr || emailErr || pwErr || termsErr) return;

  const btn = document.getElementById('createBtn');
  btn.disabled = true;
  btn.textContent = 'Creating account…';

  // try {
    const res = await fetch("http://localhost:8000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: pw
      })
    });


    const data = await res.json();
    
    showToast(data.message, true);

    if(data.success){
      setTimeout(()=>{
        const value= email;
        localStorage.setItem("gmail",value);
        window.location.href="skills.html"},2000);
    }
    else{
      setTimeout(()=>{
        location.reload()},2000);
    }
   

  }



  function socialLogin(provider) {
    showToast(`Connecting to ${provider}…`, true);
  }
 
  ['fullName','email','password'].forEach(id => {
    document.getElementById(id).addEventListener('input', function () {
      this.classList.remove('error');
      const errMap = { fullName: 'nameError', email: 'emailError', password: 'passwordError' };
      showError(errMap[id], false);
    });
  });

const searchInput = document.getElementById('pc-search-input'); 

searchInput.addEventListener('keyup', () => {
    const query = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll('.profile-card');

    cards.forEach(card => {
        // We use textContent to see if the skill exists in the card
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(query) ? 'flex' : 'none';
    });
});
// Select all sidebar items
const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(item => {
    item.addEventListener('click', function() {
        // Remove 'active' class from all others
        navItems.forEach(i => i.classList.remove('active'));
        // Add to the one we just clicked
        this.classList.add('active');
    });
});
