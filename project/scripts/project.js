// Data Object Array representing Burundian Destinations with structural images
const locations = [
    { id: 1, title: "Gishora Drum Sanctuary", category: "culture", region: "Gitega", score: 5, image: "project/images/gishora.jpg" },
    { id: 2, title: "Lake Tanganyika Coast", category: "nature", region: "Bujumbura", score: 4.9, image: "project/images/tanganyika.jpg" },
    { id: 3, title: "Rusizi National Park", category: "nature", region: "Bujumbura Delta", score: 4.7, image: "project/images/rusizi.jpg" },
    { id: 4, title: "Kera Bird Oasis", category: "nature", region: "Makamba", score: 4.5, image: "project/images/kera.jpg" },
    { id: 5, title: "Livingstone-Stanley Monument", category: "culture", region: "Rumonge", score: 4.6, image: "project/images/monument.jpg" }
];

// Document Initialization lifecycle check
document.addEventListener("DOMContentLoaded", () => {
    // Inject Footer Date Metrics
    setupFooterMetadata();
    
    // Mobile Responsive Menu Toggle Configuration
    setupNavigationMenu();

    // Context Evaluation for Homepage Elements
    const gridDisplayContainer = document.querySelector("#destinations-grid");
    if (gridDisplayContainer) {
        initializeDynamicCards(gridDisplayContainer);
    }

    // Context Evaluation for Form Submissions Page
    const feedbackFormElement = document.querySelector("#travel-form");
    if (feedbackFormElement) {
        initializeFormTracker(feedbackFormElement);
    }
});

// Utility 1: Handle Date Metadata injection inside footer
function setupFooterMetadata() {
    const trackingYear = document.querySelector("#current-year");
    const modificationSpan = document.querySelector("#last-modified");
    
    if (trackingYear) {
        trackingYear.textContent = new Date().getFullYear();
    }
    if (modificationSpan) {
        modificationSpan.textContent = document.lastModified;
    }
}

// Utility 2: Menu Toggle Actions
function setupNavigationMenu() {
    const trigger = document.querySelector("#menu-toggle");
    const linksMenu = document.querySelector("#nav-menu");

    if (trigger && linksMenu) {
        trigger.addEventListener("click", () => {
            linksMenu.classList.toggle("show");
        });
    }
}

// Utility 3: Display Dynamic Location Cards with filter buttons
function initializeDynamicCards(targetContainer) {
    // Initial Full Render loop execution
    renderCardElements(locations, targetContainer);

    // Grab configuration tracking nodes
    const buttonAll = document.querySelector("#btn-all");
    const buttonNature = document.querySelector("#btn-nature");
    const buttonCulture = document.querySelector("#btn-culture");

    if (buttonAll && buttonNature && buttonCulture) {
        buttonAll.addEventListener("click", () => renderCardElements(locations, targetContainer));
        
        buttonNature.addEventListener("click", () => {
            const isolatedNature = locations.filter(loc => loc.category === "nature");
            renderCardElements(isolatedNature, targetContainer);
        });

        buttonCulture.addEventListener("click", () => {
            const isolatedCulture = locations.filter(loc => loc.category === "culture");
            renderCardElements(isolatedCulture, targetContainer);
        });
    }
}

// Rendering Core using Strict Template Literals with Image Integrations
function renderCardElements(dataset, mountNode) {
    mountNode.innerHTML = ""; // Wipe content block safely

    if (dataset.length === 0) {
        mountNode.innerHTML = `<p>No destinations found matching this profile.</p>`;
        return;
    }

    // Iterative compilation engine
    dataset.forEach(place => {
        const parsedCard = `
            <div class="card">
                <div class="card-image-container">
                    <img src="${place.image}" alt="${place.title}" loading="lazy">
                </div>
                <div class="card-content">
                    <h3>${place.title}</h3>
                    <p><strong>Location Focus:</strong> ${place.region}</p>
                    <p><strong>Category Classification:</strong> ${place.category.toUpperCase()}</p>
                    <p><strong>Visitor Assessment:</strong> ⭐ ${place.score} / 5</p>
                    <button class="learn-more-btn" data-title="${place.title}" data-region="${place.region}">Learn More &rarr;</button>
                </div>
            </div>
        `;
        mountNode.innerHTML += parsedCard;
    });

    // Fire event listener registration for modal interaction loops
    setupModalEventHandlers();
}

// Intercept clicks on custom generated elements to open the modal
function setupModalEventHandlers() {
    const infoModal = document.querySelector("#info-modal");
    const modalTitle = document.querySelector("#modal-title");
    const modalText = document.querySelector("#modal-text");
    const closeModalBtn = document.querySelector("#close-modal");

    // Capture clicks on dynamically created buttons
    document.querySelectorAll(".learn-more-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const title = e.target.getAttribute("data-title");
            const region = e.target.getAttribute("data-region");

            if (infoModal && modalTitle && modalText) {
                modalTitle.textContent = title;
                modalText.textContent = `Welcome to the breathtaking ${title}! Located in the pristine ${region} region, this point of interest highlights the best of Burundi's beauty. Book an inquiry or explore our guides section to learn how you can experience this destination up close.`;
                infoModal.style.display = "flex";
            }
        });
    });

    // Close window interaction
    if (closeModalBtn && infoModal) {
        closeModalBtn.addEventListener("click", () => {
            infoModal.style.display = "none";
        });

        // Close if the user clicks anywhere outside the white modal content box
        window.addEventListener("click", (e) => {
            if (e.target === infoModal) {
                infoModal.style.display = "none";
            }
        });
    }
}

// Utility 4: Form Actions & Client Tracker (localStorage manipulation)
function initializeFormTracker(formNode) {
    const textBannerNode = document.querySelector("#stats-banner");
    
    // Retrieve submission count or instantiate zero state
    let directCountValue = Number(localStorage.getItem("formSubmissionsTotal")) || 0;

    if (textBannerNode) {
        if (directCountValue > 0) {
            textBannerNode.textContent = `Thank you for remaining active! You have submitted ${directCountValue} trip planning interest inquiries here.`;
        } else {
            textBannerNode.textContent = `Welcome to our tracking service! Submit your first travel inquiry using the interface fields listed below.`;
        }
    }

    // Intercept form operations on client
    formNode.addEventListener("submit", (event) => {
        event.preventDefault();

        directCountValue++;
        localStorage.setItem("formSubmissionsTotal", directCountValue);

        // Message de succès intégré dans la page (sans alert popup)
        formNode.reset();

        const successMsg = document.createElement("p");
        successMsg.textContent = `✅ Inquiry #${directCountValue} submitted successfully! We will get back to you soon.`;
        successMsg.style.color = "green";
        successMsg.style.fontWeight = "bold";
        successMsg.style.textAlign = "center";
        successMsg.style.marginTop = "1rem";

        // Supprimer l'ancien message s'il existe
        const oldMsg = formNode.querySelector(".success-msg");
        if (oldMsg) oldMsg.remove();

        successMsg.classList.add("success-msg");
        formNode.appendChild(successMsg);

        // Faire disparaître le message après 4 secondes
        setTimeout(() => successMsg.remove(), 4000);

        if (textBannerNode) {
            textBannerNode.textContent = `Thank you for remaining active! You have submitted ${directCountValue} trip planning interest inquiries here.`;
        }
    });
}