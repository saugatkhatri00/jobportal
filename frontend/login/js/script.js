const BE_URL='http://localhost:8000/api';

const forms = document.querySelector(".forms"),
      pwShowHide = document.querySelectorAll(".eye-icon"),
      links = document.querySelectorAll(".link");

pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
        
        pwFields.forEach(password => {
            if(password.type === "password"){
                password.type = "text";
                eyeIcon.classList.replace("bx-hide", "bx-show");
                return;
            }
            password.type = "password";
            eyeIcon.classList.replace("bx-show", "bx-hide");
        })
        
    })
})      

// links.forEach(link => {
//     link.addEventListener("click", e => {
//        e.preventDefault(); //preventing form submit
//        forms.classList.toggle("show-signup");
//     })
// })

const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
const applyForm = document.getElementById("applyForm");



document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signupForm');

  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let confirmPassword = document.getElementById('confirm-password');

    if (email.value == '' || password.value == '') {
      alert('Ensure you input a value in both fields!');
    } else if (password.value !== confirmPassword.value) {
      alert('Password and confirm password must be the same.');
    } else {
      const data = {
        email: email.value,
        password: password.value
      };

      console.log('data', data);

      try {
        const response = await fetch(`${BE_URL}/user/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log('Success:', result);
         // copy below code to redirect the pages
         const currentURL = window.location.href;
 
         // give actual page to go to after baseUrl
         if (response.ok) {
           window.location.href = 'index.html'; // Change the URL to the desired page
         }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('Login form submitted');

    let email = document.getElementById('email');
    let password = document.getElementById('password');

    if (email.value == '' || password.value == '') {
      alert('Ensure you input a value in both fields!');
    } else {
      const data = {
        email: email.value,
        password: password.value
      };

      console.log('data', data);

      try {
        const response = await fetch(`${BE_URL}/user/login`, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        });

        const result = await response.json();
        // Assuming 'response' is the response received after a successful login API call
        const token = result.token; // Assuming 'token' is the key for the JWT in the response
        console.log(token)

        // Store the token in localStorage
        localStorage.setItem('jwtToken', token);
        console.log('Success:', result);

        // copy below code to redirect the pages
        const currentURL = window.location.href;
        const baseUrl = 'http://127.0.0.1:5500/BeRojgaar/';
        const newPath = currentURL.replace(baseUrl + 'frontend/login/', baseUrl);

        // give actual page to go to after baseUrl
        if (response.ok) {
          window.location.href = baseUrl+'frontend/apply.html'; // Change the URL to the desired page
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  });
});



document.addEventListener('DOMContentLoaded', () => {
  const applyForm = document.getElementById('applyForm');
  // Retrieve the token from localStorage
  const storedToken = localStorage.getItem('jwtToken');

  applyForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('Apply form submitted');
    let email = document.getElementById('email');
    let name = document.getElementById('name');
    let coverletter = document.getElementById('cover_letter');
    let salaryexpectation = document.getElementById('salary_expectation');
    let availability=document.getElementById('availability');
    let additionalinfo = document.getElementById('additional_info');

    if (email.value == '' || name.value == '' || coverletter.value=="") {
      alert('Ensure you input a value in all fields!');
    } else {
      const data = {
        email: email.value,
        name: name.value,
        coverletter:coverletter.value,
        salaryexpectation:salaryexpectation.value,
        availability:availability.value,
        additionalinfo:additionalinfo.value
      };
      console.log('data', data);

      try {
        const response = await fetch(`${BE_URL}/project/apply`, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            "Authorization":`Bearer ${storedToken}`,
            'Content-type': 'application/json; charset=UTF-8'
          }
        });

        const result = await response.json();

        console.log('Success:', result);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const postForm = document.getElementById('postForm');
  // Retrieve the token from localStorage
  const storedToken = localStorage.getItem('jwtToken');
  
  postForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('Post form submitted');
    let jobtitle = document.getElementById('jobTitle');
    let company = document.getElementById('company');
    let location = document.getElementById('location');
    let salary = document.getElementById('salary');
    let jobdescription=document.getElementById('jobDescription');
    let requirements= document.getElementById('requirements');
    let howtoapply= document.getElementById('howToApply');

    if (jobtitle.value == '' || company.value == '' || salary.value=="") {
      alert('Ensure you input a value in all fields!');
    } else {
      const data = {
        jobtitle: jobtitle.value,
        company: company.value,
        location:location.value,
        salary:salary.value,
        jobdescription:jobdescription.value,
        requirements:requirements.value,
        howtoapply:howtoapply.value
      };
      console.log('data', data);

      try {
        const response = await fetch(`${BE_URL}/project/post`, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            "Authorization":`Bearer ${storedToken}`,
            'Content-type': 'application/json; charset=UTF-8'
          }
        });

        const result = await response.json();

        console.log('Success:', result);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  });
});











document.addEventListener("DOMContentLoaded", () => {
  
  helloForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      try {
          const email = document.getElementById("email");
          const name = document.getElementById("name");
          const description = document.getElementById("description");

          if (email.value === "" || name.value === "") {
              alert("Ensure you input a value in both fields!");
          } else {
              const data = {
                  email: email.value,
                  name: name.value,
                  description: description.value
              };

              console.log('data', data);
              const storedToken = localStorage.getItem('jwtToken');

              const response = await fetch(`${BE_URL}/user/hello`, {
                  method: "POST",
                  headers: {
                    'Authorization': `Bearer ${storedToken}`,
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
              });

              const result = await response.json();
              console.log("Success:", result);
          }
      } catch (error) {
          console.error("Error:", error);
      }
  });
});








