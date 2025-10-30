    const patientBtn = document.getElementById("patientBtn");
    const therapistBtn = document.getElementById("therapistBtn");
    const therapistFields = document.getElementById("therapistFields");
    const form = document.getElementById("registerForm");

    // Role switch behavior
    patientBtn.onclick = function() {
      patientBtn.classList.add("active");
      therapistBtn.classList.remove("active");
      therapistFields.style.display = "none";
    };

    therapistBtn.onclick = function() {
      therapistBtn.classList.add("active");
      patientBtn.classList.remove("active");
      therapistFields.style.display = "block";
    };

    // Handle form submission
    form.onsubmit = function(e) {
      e.preventDefault();

      const role = therapistBtn.classList.contains("active") ? "Therapist" : "Patient";
      const name = document.getElementById("fullname").value;
      const email = document.getElementById("email").value;

      if (role === "Therapist") {
        const specialization = document.getElementById("specialization").value;
        const license = document.getElementById("license").value;
        alert(`Therapist Registered:\nName: ${name}\nEmail: ${email}\nSpecialization: ${specialization}\nLicense: ${license}`);
      } else {
        alert(`Patient Registered:\nName: ${name}\nEmail: ${email}`);
      }

      form.reset();
      therapistFields.style.display = "none";
      patientBtn.classList.add("active");
      therapistBtn.classList.remove("active");
    };
  