let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav ul li a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            })
        }
    })
}
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}
document.getElementById('contact-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(this); // Collect form data
    const popup = document.getElementById('popup-notification'); // Pop-up notification

    // Hide popup initially
    popup.classList.add('hidden');

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            showPopup('Message successfully sent!', 'success');
            this.reset(); // Reset form fields
        } else {
            showPopup('Error sending message. Please try again later.', 'error');
        }
    } catch (error) {
        showPopup('Error sending message. Please try again later.', 'error');
    }
});

/*
 * Function to Show Pop-up Notification
 */
function showPopup(message, type) {
    const popup = document.getElementById('popup-notification');
    popup.textContent = message;

    // Add success or error class
    popup.className = `popup ${type}`;

    // Show popup
    popup.classList.remove('hidden');

    // Hide popup after 3 seconds 
    setTimeout(() => {
        popup.classList.add('hidden');
    }, 3000);
}

// Fade-in animation for timeline containers
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.experience .container[data-animate]').forEach(el => {
  observer.observe(el);
});

