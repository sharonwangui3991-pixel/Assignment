//get elements
document.addEventListener('DOMContentLoaded', () => {
  const regForm = document.getElementById("regform");
  const themebtn = document.getElementById("theme");
  const memberList = document.getElementById("memberList");
  const countSpan = document.getElementById("count");
  const successMsg = document.getElementById("successMsg");

  let memberCount = 0;

  // 1. Dark Mode Toggle
 const theme= document.getElementById("theme"
 );
  theme.addEventListener("click",function () {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
      theme.textContent = "light Mode";
    } else {
      theme.textContent = "Dark Mode";
    }
  });

  // 2. Form Validation & Submission
  regForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Clear previous errors
    clearErrors();

    // record each field's value for validation and subsequent processing
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const gender = document.getElementById('gender').value;
    const dob = document.getElementById('dob').value;
    const country = document.getElementById('country').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const bio = document.getElementById('bio').value.trim();

    let isValid = true;

    // Validation checks
    if (!name) {
      showError('nameError', 'Full name is required.');
      isValid = false;
    }

    if (!email || !email.includes('@')) {
      showError('emailError', 'Please enter a valid email address.');
      isValid = false;
    }

    if (!password || password.length < 6) {
      showError('passwordError', 'Password must be at least 6 characters.');
      isValid = false;
    }

    if (password !== confirmPassword) {
      showError('confirmError', 'Passwords do not match.');
      isValid = false;
    }

    if (!gender) {
      showError('genderError', 'Please select a gender.');
      isValid = false;
    }

    if (!dob) {
      showError('dobError', 'Date of birth is required.');
      isValid = false;
    }

    if (!country) {
      showError('countryError', 'Country is required.');
      isValid = false;
    }

    if (!phone) {
      showError('phoneError', 'Phone number is required.');
      isValid = false;
    }

    if (!isValid) return;

    // Add member to the list
    addMember({ name, email, gender, country, phone, bio });

    // Reset form and show success message
    regForm.reset();
    successMsg.textContent = 'Member registered successfully!';
    successMsg.classList.remove('hidden');

    setTimeout(() => {
      successMsg.classList.add('hidden');
    }, 4000);
  });

  function showError(id, message) {
    const errorElement = document.getElementById(id);
    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  function clearErrors() {
    const errors = document.querySelectorAll('.error');
    errors.forEach((err) => (err.textContent = ''));
  }

  // 3. Add Member Structure with dynamic Removal Action
  function addMember(data) {
    // Remove the placeholder empty element if it exists in the DOM
    const emptyNote = document.getElementById('emptyNote');
    if (emptyNote) {
      emptyNote.remove();
    }

    memberCount++;
    countSpan.textContent = memberCount;

    const li = document.createElement('li');
    li.classList.add('member-item');
    li.style.position = 'relative'; // Anchor positioning context for a clean delete button placement
    
    li.innerHTML = `
      <div class="member-details">
        <strong>${escapeHTML(data.name)}</strong> (${escapeHTML(data.gender)})<br>
        <span>Email: ${escapeHTML(data.email)}</span> | <span>Country: ${escapeHTML(data.country)}</span><br>
        <span>Phone: ${escapeHTML(data.phone)}</span>
        ${data.bio ? `<p class="member-bio" style="margin-top: 5px; font-style: italic;">"${escapeHTML(data.bio)}"</p>` : ''}
      </div>
      <button class="delete-btn" style="position: absolute; top: 10px; right: 10px; padding: 4px 8px; font-size: 0.8rem; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">Remove</button>
    `;

    // Bind event handling mechanics directly onto the local removal trigger element
    li.querySelector('.delete-btn').addEventListener('click', () => {
      li.remove();
      memberCount--;
      countSpan.textContent = memberCount;

      // Re-render empty condition template when local state counter reaches zero
      if (memberCount === 0) {
        const resetEmptyNode = document.createElement('li');
        resetEmptyNode.id = 'emptyNote';
        resetEmptyNode.className = 'empty';
        resetEmptyNode.textContent = 'No members yet. Register someone to begin.';
        memberList.appendChild(resetEmptyNode);
      }
    });

    memberList.appendChild(li);
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          "'": '&#39;',
          '"': '&quot;'
      }[tag] || tag)
    );
  }
});
