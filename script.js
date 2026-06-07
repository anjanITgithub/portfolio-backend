document.addEventListener("DOMContentLoaded", () => {
    // ---------------- Elements ----------------
    const adminBtn = document.getElementById("adminBtn");
    const adminModal = document.getElementById("adminModal");
    const closeBtn = document.querySelector(".close-btn");

    const adminDashboard = document.getElementById("adminDashboard");
    const closeDashboardBtn = document.querySelector(".close-dashboard-btn");
    const logoutBtn = document.getElementById("logoutBtn");
    const messagesContainer = document.getElementById("messagesContainer");

    // Backend API URL (আপনার Node.js সার্ভারের লিংক)
    const API_BASE_URL = "http://localhost:5000/api";

    // ---------------- UI Logic (Modals) ----------------
    adminBtn.addEventListener("click", () => { adminModal.style.display = "flex"; });
    closeBtn.addEventListener("click", () => { adminModal.style.display = "none"; });
    closeDashboardBtn.addEventListener("click", () => { adminDashboard.style.display = "none"; });
    
    window.addEventListener("click", (e) => {
        if (e.target === adminModal) adminModal.style.display = "none";
        if (e.target === adminDashboard) adminDashboard.style.display = "none";
    });

    // ---------------- 1. Public API: Send Message to DB ----------------
    document.getElementById('contactForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // ফর্ম থেকে ডেটা নেওয়া
        const name = e.target[0].value;
        const email = e.target[1].value;
        const message = e.target[2].value;

        try {
            // ব্যাক-এন্ডে রিকোয়েস্ট পাঠানো
            const response = await fetch(`${API_BASE_URL}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message })
            });
            const data = await response.json();

            if (data.success) {
                alert('Success! Your message has been safely stored in the database.');
                e.target.reset(); // ফর্ম ফাঁকা করে দেওয়া
            } else {
                alert('Error sending message. Please try again.');
            }
        } catch (err) {
            console.error(err);
            alert('Server Error. Please make sure the backend (Node.js) is running on port 5000.');
        }
    });

    // ---------------- 2. Auth API: Admin Login ----------------
    document.getElementById('adminForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = e.target[0].value;
        const password = e.target[1].value;

        try {
            const response = await fetch(`${API_BASE_URL}/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();

            if (data.success) {
                // লগইন সফল হলে টোকেন সেভ করা
                localStorage.setItem('adminToken', data.token);
                adminModal.style.display = 'none'; // লগইন ফর্ম বন্ধ করা
                e.target.reset();
                
                // সঠিক ইউজারনেম ও পাসওয়ার্ড পেলেই User Responses ড্যাশবোর্ড খুলবে
                fetchAndShowMessages(); 
            } else {
                alert('Invalid Username or Password! Access Denied.');
            }
        } catch (err) {
            console.error(err);
            alert('Server error during login.');
        }
    });

    // ---------------- 3. Secure API: Fetch Messages ----------------
    async function fetchAndShowMessages() {
        const token = localStorage.getItem('adminToken');
        if (!token) return;

        // ড্যাশবোর্ড দৃশ্যমান করা
        adminDashboard.style.display = 'flex';
        messagesContainer.innerHTML = '<p>Loading database records...</p>';

        try {
            // টোকেন সহ ব্যাক-এন্ডে রিকোয়েস্ট পাঠানো
            const response = await fetch(`${API_BASE_URL}/admin/messages`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();

            if (data.success) {
                messagesContainer.innerHTML = ''; 
                
                if (data.data.length === 0) {
                    messagesContainer.innerHTML = '<p>Database is empty. No messages yet.</p>';
                    return;
                }

                // ডেটাবেসের মেসেজগুলো লুপ করে দেখানো
                data.data.forEach(msg => {
                    const date = new Date(msg.date).toLocaleString();
                    const msgDiv = document.createElement('div');
                    msgDiv.className = 'message-card';
                    msgDiv.innerHTML = `
                        <h4>Name: ${msg.name}</h4>
                        <p><strong>Email:</strong> ${msg.email}</p>
                        <p><strong>Message:</strong> ${msg.message}</p>
                        <small>Received via DB on: ${date}</small>
                    `;
                    messagesContainer.appendChild(msgDiv);
                });
            } else {
                alert('Session expired or unauthorized.');
                logoutAdmin();
            }
        } catch (err) {
            console.error(err);
            messagesContainer.innerHTML = '<p>Error fetching messages from Database.</p>';
        }
    }

    // ---------------- 4. Logout Logic ----------------
    logoutBtn.addEventListener('click', logoutAdmin);

    function logoutAdmin() {
        localStorage.removeItem('adminToken'); // টোকেন মুছে ফেলা
        adminDashboard.style.display = 'none';
        alert('Logged out securely.');
    }
});