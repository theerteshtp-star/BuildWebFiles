// Dynamically load images from folders
const categories = {
    Projects: "img/Projects",
    Executed: "img/Executed",
    // Video: "img/Video"
};

const portfolioContainer = document.getElementById("portfolio-container");

// Function to check if an image exists
function imageExists(path) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = path;
    });
}

// Function to dynamically add images with horizontal scrolling feature
async function loadImages(callback) {
    for (const [category, path] of Object.entries(categories)) {
        // Add category header
        const contitem = document.createElement("div");
        contitem.className = `col-12 my-3 category-header ${category}`;
        contitem.innerHTML = `
            <div class="d-flex align-items-center">
                <div style="height: 1px; background-color: #6c757d; margin-right: 10px; width:50px"></div>
                <span class="text-muted font-weight-bold mr-2">${category}</span>
                <div class="flex-grow-1" style="height: 1px; background-color: #6c757d;"></div>
            </div>`;
        portfolioContainer.appendChild(contitem);

        const categoryContainer = document.createElement("div");
        categoryContainer.className = `portfolio-category ${category} w-100`;

        // Create a horizontal scrollable container for images
        const categoryImagesContainer = document.createElement("div");
        categoryImagesContainer.className = `row portfolio-container-scrollable`;

        // let index = 1;
        // let imageCount = 0;

        // while (true) {
        //     const imgPath = `${path}/img${index}.jpg`;
        //     const exists = await imageExists(imgPath);
        //     if (!exists) break;

             // first determine highest existing image index
       let idx = 1;
       while (await imageExists(`${path}/img${idx}.jpg`)) {
           idx++;
       }
       const maxIndex = idx - 1;
       let imageCount = maxIndex;
       // now loop in reverse: img{maxIndex}, img{maxIndex-1}, …, img1
       for (let index = maxIndex; index >= 1; index--) {
           const imgPath = `${path}/img${index}.jpg`;
            // Create portfolio item
            const item = document.createElement("div");
            item.className = `col-lg-3 col-md-4 col-sm-5 p-0 portfolio-item ${category}`;
            item.innerHTML = `
                <div class="position-relative overflow-hidden shadow" style="border-radius: 2.3rem !important">
                    <div class="portfolio-img d-flex align-items-center justify-content-center" >
                        <img src="${imgPath}" alt="${category} Project" class="img-fluid p-2" data-lightbox="portfolio">
                    </div>
                    <div class="portfolio-text d-flex flex-column align-items-center justify-content-end">
                     <a class="btn w-100 text-center text-dark py-2" href="${imgPath}" style="background-color:#f78d04" data-lightbox="portfolio">View</a>        
                   
                        </div>
                </div>`;
            categoryImagesContainer.appendChild(item);
            // imageCount++;
            // index++;
        }

        // Add the image container to the portfolio
        categoryContainer.appendChild(categoryImagesContainer);
        portfolioContainer.appendChild(categoryContainer);

        // Make the images horizontally scrollable if there are more than 2 rows
        if (imageCount > 8) {
            categoryImagesContainer.style.overflowX = 'auto';
            categoryImagesContainer.style.maxHeight = 'none'; // Allow the container to expand horizontally
        }
    }

    callback(); // Call callback after all categories are processed
}


// Function to load videos from Video.txt and add them to the portfolio
async function loadVideos() {
    try {
        const response = await fetch('./Video/Video.txt', { mode: 'cors' });
        if (!response.ok) throw new Error('Network response was not ok');
        const text = await response.text();
        // Split by newlines and filter out any empty lines
        const videoLinks = text.split('\n').map(line => line.trim()).filter(line => line !== '');

        // Create Video category header
        const category = 'Video';
        const contitem = document.createElement("div");
        contitem.className = `col-12 my-3 category-header ${category}`;
        contitem.innerHTML = `
            <div class="d-flex align-items-center">
                <div style="height: 1px; background-color: #6c757d; margin-right: 10px; width:50px"></div>
                <span class="text-muted font-weight-bold mr-2">${category}s</span>
                <div class="flex-grow-1" style="height: 1px; background-color: #6c757d;"></div>
            </div>`;
        portfolioContainer.appendChild(contitem);

        // Create Video category container
        const categoryContainer = document.createElement("div");
        categoryContainer.className = `portfolio-category ${category} w-100`;

        // Create a horizontal scrollable container for video items
        const categoryVideosContainer = document.createElement("div");
        categoryVideosContainer.className = `row portfolio-container-scrollable`;

        let videoCount = 0;
        videoLinks.forEach(videoLink => {
            // Extract YouTube video ID (supports youtu.be and youtube.com/watch?v= links)
            let videoId = '';
            if (videoLink.includes('youtu.be/')) {
                videoId = videoLink.split('youtu.be/')[1].split('?')[0];
            } else if (videoLink.includes('youtube.com/watch?v=')) {
                videoId = videoLink.split('watch?v=')[1].split('&')[0];
            } else if (videoLink.includes('youtube.com/shorts/')) {
                videoId = videoLink.split('youtube.com/shorts/')[1].split('?')[0];
            }    
            if (!videoId) return; // Skip if videoId is not found

            const embedUrl = `https://www.youtube.com/embed/${videoId}`;

            // Create portfolio item for the video
            const item = document.createElement("div");
            item.className = `col-lg-4 p-0 portfolio-item ${category}`;
            // item.innerHTML = `
            //     <div class="position-relative overflow-hidden shadow" style="border-radius: 2.3rem !important; width: max-content">
            //         <div class="portfolio-img d-flex align-items-center justify-content-center">
            //             <iframe width="100%" height="100%" src="${embedUrl}" title="YouTube video player" frameborder="0" 
            //                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            //                     allowfullscreen></iframe>
            //         </div>
            //     </div>`;
            item.innerHTML = `
            <div class="position-relative overflow-hidden shadow" style="border-radius: 1.3rem !important; max-width: 560px; margin: auto;">
    <div class="portfolio-img ratio ratio-21x9" style="height:210px">
        <iframe src="${embedUrl}" 
                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
                title="YouTube video player" frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
        </iframe>
    </div>
</div>
            `
            categoryVideosContainer.appendChild(item);
            videoCount++;
        });

        categoryContainer.appendChild(categoryVideosContainer);
        portfolioContainer.appendChild(categoryContainer);

        // Optionally add horizontal scrolling if many videos are loaded
        if (videoCount > 8) {
            categoryVideosContainer.style.overflowX = 'auto';
            categoryVideosContainer.style.maxHeight = 'none';
        }
    } catch (error) {
        console.error('Error loading videos:', error);
    }
}


// Call loadImages to populate images dynamically
loadImages(() => {
    loadVideos().then(() => {
        // Trigger "All" filter on page load after images are loaded
        const allFilter = document.querySelector('#portfolio-filters li[data-filter="*"]');
        if (allFilter) {
            allFilter.click();
        }
    });
});

// JavaScript for filtering
document.addEventListener("DOMContentLoaded", () => {
    const filters = document.querySelectorAll("#portfolio-filters li");
    filters.forEach(filter => {
        filter.addEventListener("click", () => {
            // Remove active class from all filters
            filters.forEach(f => f.classList.remove("active"));
            // Add active class to clicked filter
            filter.classList.add("active");

            const filterValue = filter.getAttribute("data-filter");
            const items = document.querySelectorAll(".portfolio-item");
            const headers = document.querySelectorAll(".category-header");

            if (filterValue === "*") {
                // Show all items and headers
                items.forEach(item => item.classList.add("show"));
                headers.forEach(header => header.style.display = "");
            } else {
                items.forEach(item => {
                    if (item.classList.contains(filterValue.substring(1))) {
                        item.classList.add("show");
                    } else {
                        item.classList.remove("show");
                    }
                });
                // Show headers for visible categories

                headers.forEach(header => header.style.display = "none");

            }
        });
    });

    // Trigger "All" filter on page load
    document.querySelector('#portfolio-filters li[data-filter="*"]').click();
});
