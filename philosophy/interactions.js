// Interactive Book Grid and Modal System
class PhilosophyApp {
    constructor() {
        this.currentFilter = 'all';
        this.selectedBook = null;
        this.scene = null;
        
        // Wait for scene to be ready
        const checkScene = setInterval(() => {
            if (window.almondEyeScene) {
                this.scene = window.almondEyeScene;
                clearInterval(checkScene);
                this.init();
            }
        }, 100);
    }

    init() {
        this.setupFilterButtons();
        this.renderBooks();
        this.setupModalEvents();
        this.setupSmoothScroll();
        this.playAmbientSound();
    }

    setupFilterButtons() {
        const buttons = document.querySelectorAll('.filter-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                buttons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.renderBooks();
            });
        });
    }

    renderBooks() {
        const grid = document.getElementById('books-grid');
        grid.innerHTML = '';
        
        const filteredBooks = this.currentFilter === 'all' 
            ? booksData 
            : booksData.filter(book => book.category === this.currentFilter);
        
        filteredBooks.forEach((book, index) => {
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card';
            bookCard.innerHTML = `
                <div class="book-cover-wrapper">
                    <img src="${book.cover}" alt="${book.title}" class="book-cover" loading="lazy">
                </div>
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">${book.author}</p>
            `;
            
            bookCard.addEventListener('click', () => {
                this.openBookDetail(book);
            });
            
            // Stagger animation
            gsap.from(bookCard, {
                opacity: 0,
                y: 30,
                duration: 0.6,
                delay: index * 0.05,
                ease: "power2.out"
            });
            
            grid.appendChild(bookCard);
        });
    }

    openBookDetail(book) {
        this.selectedBook = book;
        
        // Play click sound
        this.playClickSound();
        
        // Zoom camera into pupil
        this.scene.zoomInToPupil(() => {
            this.showModal(book);
        });
    }

    showModal(book) {
        const modal = document.getElementById('book-detail-modal');
        
        // Populate modal content
        document.getElementById('modal-cover').src = book.cover;
        document.getElementById('modal-title').textContent = book.title;
        document.getElementById('modal-author').textContent = book.author;
        document.getElementById('modal-genre').textContent = book.genre;
        document.getElementById('modal-summary').textContent = book.summary;
        document.getElementById('modal-core-idea').textContent = book.coreIdea;
        
        // Reality rating bar animation
        const fillPercentage = (book.realityRating / 10) * 100;
        const realityFill = document.getElementById('reality-fill');
        realityFill.style.setProperty('--width', fillPercentage + '%');
        document.getElementById('reality-text').textContent = `${book.realityRating}/10 Reality Rating`;
        
        // Trigger animation
        gsap.fromTo(realityFill, 
            { width: '0%' },
            { width: fillPercentage + '%', duration: 0.8, ease: "power2.out" }
        );
        
        modal.classList.add('active');
    }

    closeModal() {
        const modal = document.getElementById('book-detail-modal');
        modal.classList.remove('active');
        
        // Zoom back out
        this.scene.zoomOutFromPupil();
        this.selectedBook = null;
    }

    setupModalEvents() {
        // Close button
        document.getElementById('modal-close').addEventListener('click', () => {
            this.closeModal();
        });
        
        // Click outside modal
        document.getElementById('book-detail-modal').addEventListener('click', (e) => {
            if (e.target.id === 'book-detail-modal') {
                this.closeModal();
            }
        });
        
        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.selectedBook) {
                this.closeModal();
            }
        });
    }

    setupSmoothScroll() {
        // Use Lenis for smooth scrolling if available
        if (typeof Lenis !== 'undefined') {
            const lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                direction: 'vertical',
                gestureDirection: 'vertical',
                smooth: true,
                mouseMultiplier: 1,
                smoothTouch: false,
                touchMultiplier: 2,
                infinite: false,
            });

            function raf(time) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }

            requestAnimationFrame(raf);
        }
    }

    playClickSound() {
        // Create a soft analog click sound using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const now = audioContext.currentTime;
            
            // High-frequency click
            const osc1 = audioContext.createOscillator();
            osc1.frequency.setValueAtTime(150, now);
            osc1.frequency.exponentialRampToValueAtTime(50, now + 0.1);
            
            const gain1 = audioContext.createGain();
            gain1.gain.setValueAtTime(0.3, now);
            gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            
            osc1.connect(gain1);
            gain1.connect(audioContext.destination);
            
            osc1.start(now);
            osc1.stop(now + 0.1);
            
        } catch (e) {
            // Audio API not available, silently fail
        }
    }

    playAmbientSound() {
        // Optional: Play subtle ambient tone at page load
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const now = audioContext.currentTime;
            
            // Subtle hum (very quiet)
            const osc = audioContext.createOscillator();
            osc.frequency.value = 60;
            
            const gain = audioContext.createGain();
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.02, now + 0.5);
            
            osc.connect(gain);
            gain.connect(audioContext.destination);
            
            osc.start(now);
            osc.stop(now + 2);
            
        } catch (e) {
            // Audio not available
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure scene is initialized
    setTimeout(() => {
        window.philosophyApp = new PhilosophyApp();
    }, 500);
});

// Navigation back to main page
document.querySelector('.nav-logo').addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '/';
});
