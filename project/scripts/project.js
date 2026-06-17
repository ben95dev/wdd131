// Data Object Array representing Burundian Destinations with structured images
const locations = [
    { id: 1, title: "Gishora Drum Sanctuary", category: "culture", region: "Gitega", score: 5, image: "images/gishora.webp" },
    { id: 2, title: "Lake Tanganyika Coast", category: "nature", region: "Bujumbura", score: 4.9, image: "images/tanganyika.webp" },
    { id: 3, title: "Rusizi National Park", category: "nature", region: "Bujumbura Delta", score: 4.7, image: "images/rusizi.webp" },
    { id: 4, title: "Kera Bird Oasis", category: "nature", region: "Makamba", score: 4.5, image: "images/kera.webp" },
    { id: 5, title: "Livingstone-Stanley Monument", category: "culture", region: "Rumonge", score: 4.6, image: "images/monument.webp" }
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
        // Enforced strict template literal block execution containing image elements
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
                    <a href="#" class="learn-more-btn">Learn More &rarr;</a>
                </div>
            </div>
        `;
        mountNode.innerHTML += parsedCard;
    });
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
        event.preventDefault(); // Halt active routing requests during testing execution

        directCountValue++;
        localStorage.setItem("formSubmissionsTotal", directCountValue);

        alert(`Form details processed successfully! Your saved configuration states reflect submission index #${directCountValue}.`);
        formNode.reset();

        if (textBannerNode) {
            textBannerNode.textContent = `Thank you for remaining active! You have submitted ${directCountValue} trip planning interest inquiries here.`;
        }
    });
}