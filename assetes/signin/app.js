// Sign In Function (for now, it just prevents page reload)
function signIn(event) {
    event.preventDefault();
  
    let email = document.getElementById("sign-in-email").value;
    let password = document.getElementById("sign-in-password").value;
  
    // Placeholder: Log email and password (replace with real authentication logic)
    console.log("Signed In with:", email, password);
  
    // For now, simulate successful login
    alert("Sign In Successful!");
    // Redirect to the main page (you can change the URL as per your requirement)
    window.location.href = "../../index.html";
  }
  