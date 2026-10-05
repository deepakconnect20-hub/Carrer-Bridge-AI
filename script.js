const translations = {
    en: { home: "Home", assessment: "Assessment", careers: "Careers", scholarships: "Scholarships", colleges: "Colleges", assistant: "AI Assistant", dashboard: "Dashboard" },
    ta: { home: "முகப்பு", assessment: "மதிப்பீடு", careers: "வேலைவாய்ப்புகள்", scholarships: "உதவித்தொகை", colleges: "கல்லூரிகள்", assistant: "AI உதவியாளர்", dashboard: "முகப்பு பலகை" },
    hi: { home: "होम", assessment: "मूल्यांकन", careers: "करियर", scholarships: "छात्रवृत्ति", colleges: "कॉलेज", assistant: "AI सहायक", dashboard: "डैशबोर्ड" }
};

const careersData = [
    { title: "Software Engineer", category: "Technology", salary: "₹6 - ₹18 LPA", growth: "High", desc: "Design and build software systems and applications." },
    { title: "Agriculture Technologist", category: "Agriculture", salary: "₹4 - ₹10 LPA", growth: "Very High", desc: "Implement smart farming and modern agricultural tech." },
    { title: "Clinical Nurse", category: "Healthcare", salary: "₹3.5 - ₹8 LPA", growth: "High", desc: "Provide patient care and medical support." }
];

const scholarshipsData = [
    { title: "National Rural Merit Scholarship", amount: "₹25,000 / year", deadline: "31st Oct 2026", status: "Demo / Unverified" },
    { title: "Post Matric Scholarship for Rural Students", amount: "₹15,000 / year", deadline: "15th Nov 2026", status: "Demo / Unverified" }
];

const collegesData = [
    { name: "Rural Institute of Technology", location: "District HQ", courses: "B.Tech Computer Science, ECE" },
    { name: "Government Agri-Sciences College", location: "Regional Center", courses: "B.Sc Agriculture, Horticulture" }
];

document.addEventListener("DOMContentLoaded", () => {
    setupNavigation();
    setupLanguageSelector();
    loadCareers();
    loadScholarships();
    loadColleges();
});

function navigateTo(sectionId) {
    document.querySelectorAll("main > section").forEach(sec => sec.style.display = "none");
    const target = document.getElementById(sectionId);
    if (target) target.style.display = "block";
    
    document.querySelectorAll(".navbar nav a").forEach(a => a.classList.remove("active"));
    const activeLink = document.querySelector(`.navbar nav a[href="#${sectionId}"]`);
    if (activeLink) activeLink.classList.add("active");
}

document.querySelectorAll(".navbar nav a").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        navigateTo(targetId);
    });
});

function setupLanguageSelector() {
    const selector = document.getElementById("langSelect");
    selector.addEventListener("change", (e) => {
        const lang = e.target.value;
        const t = translations[lang] || translations.en;
        document.querySelector('nav a[href="#home"]').textContent = t.home;
        document.querySelector('nav a[href="#assessment"]').textContent = t.assessment;
        document.querySelector('nav a[href="#careers"]').textContent = t.careers;
        document.querySelector('nav a[href="#scholarships"]').textContent = t.scholarships;
        document.querySelector('nav a[href="#colleges"]').textContent = t.colleges;
        document.querySelector('nav a[href="#assistant"]').textContent = t.assistant;
        document.querySelector('nav a[href="#dashboard"]').textContent = t.dashboard;
    });
}

function loadCareers() {
    const grid = document.getElementById("careerGrid");
    grid.innerHTML = careersData.map(c => `
        <div class="card">
            <h3>${c.title}</h3>
            <p><strong>Category:</strong> ${c.category}</p>
            <p><strong>Avg Salary:</strong> ${c.salary}</p>
            <p><strong>Growth:</strong> ${c.growth}</p>
            <p style="margin-top:0.5rem;">${c.desc}</p>
        </div>
    `).join("");
}

function loadScholarships() {
    const grid = document.getElementById("scholarshipGrid");
    grid.innerHTML = scholarshipsData.map(s => `
        <div class="card">
            <h3>${s.title}</h3>
            <p><strong>Amount:</strong> ${s.amount}</p>
            <p><strong>Deadline:</strong> ${s.deadline}</p>
            <p><small style="color: #d97706;">Status: ${s.status}</small></p>
        </div>
    `).join("");
}

function loadColleges() {
    const grid = document.getElementById("collegeGrid");
    grid.innerHTML = collegesData.map(c => `
        <div class="card">
            <h3>${c.name}</h3>
            <p><strong>Location:</strong> ${c.location}</p>
            <p><strong>Courses:</strong> ${c.courses}</p>
        </div>
    `).join("");
}

function sendChatMessage() {
    const input = document.getElementById("chatInput");
    const chatBox = document.getElementById("chatBox");
    const question = input.value.trim();
    if (!question) return;

    chatBox.innerHTML += `<div class="chat-message user">${question}</div>`;
    input.value = "";

    setTimeout(() => {
        let reply = "That is a great question! For rural students, we recommend exploring government scholarships and vocational pathways in agriculture and technology.";
        if (question.toLowerCase().includes("scholarship")) {
            reply = "You can check our Scholarships tab for active listings such as the National Rural Merit Scholarship.";
        } else if (question.toLowerCase().includes("career")) {
            reply = "Take our Career Assessment to receive tailored, AI-analyzed career recommendations!";
        }
        chatBox.innerHTML += `<div class="chat-message bot">${reply}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 600);
}
