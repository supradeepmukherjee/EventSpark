// Sign Up Function (for now, it just prevents page reload)
function signUp(event) {
    event.preventDefault();
  
    let name = document.getElementById("sign-up-name").value;
    let email = document.getElementById("sign-up-email").value;
    let password = document.getElementById("sign-up-password").value;
    let confirmPassword = document.getElementById("confirm-password").value;
  
    // Check if passwords match
    if (password === confirmPassword) {
      // Placeholder: Log the details (replace with real sign-up logic, like an API call)
      console.log("Signed Up with:", name, email, password);
  
      // For now, simulate successful sign-up
      alert("Sign Up Successful!");
      // Redirect to the Sign-In page after successful sign-up
      window.location.href = "../../index.html";
    } else {
      alert("Passwords do not match!");
    }
  }
  