// box-interaction.ts
document.addEventListener('DOMContentLoaded', () => {
    // Element type assertions
    const boxLeft = document.querySelector('.box-left') as HTMLElement;
    const boxCenter = document.querySelector('.box-center') as HTMLElement;
    const boxRight = document.querySelector('.box-right') as HTMLElement;
    const mainBox = document.querySelector('.main-box') as HTMLElement;

    // Event handler type
    type NavigationHandler = (this: HTMLElement, ev: MouseEvent) => any;

    // Navigation handlers
    const navigateToAnalyze: NavigationHandler = () => {
        window.location.href = 'analyze.html';
    };

    const navigateToCompare: NavigationHandler = () => {
        window.location.href = 'compare.html';
    };

    const navigateToBuy: NavigationHandler = () => {
        window.location.href = 'buy.html';
    };

    // Event listeners with proper typing
    if (boxLeft) boxLeft.addEventListener('click', navigateToAnalyze);
    if (boxCenter) boxCenter.addEventListener('click', navigateToCompare);
    if (boxRight) boxRight.addEventListener('click', navigateToBuy);

    // Optional: Add hover effect types
    if (mainBox) {
        mainBox.addEventListener('mouseenter', () => {
            mainBox.style.transform = 'scale(1.05)';
        });
        
        mainBox.addEventListener('mouseleave', () => {
            mainBox.style.transform = 'scale(1)';
        });
    }
});