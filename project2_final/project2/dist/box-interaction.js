"use strict";
// box-interaction.ts
document.addEventListener('DOMContentLoaded', () => {
    // Element type assertions
    const boxLeft = document.querySelector('.box-left');
    const boxCenter = document.querySelector('.box-center');
    const boxRight = document.querySelector('.box-right');
    const mainBox = document.querySelector('.main-box');
    // Navigation handlers
    const navigateToAnalyze = () => {
        window.location.href = 'analyze.html';
    };
    const navigateToCompare = () => {
        window.location.href = 'compare.html';
    };
    const navigateToBuy = () => {
        window.location.href = 'buy.html';
    };
    // Event listeners with proper typing
    if (boxLeft)
        boxLeft.addEventListener('click', navigateToAnalyze);
    if (boxCenter)
        boxCenter.addEventListener('click', navigateToCompare);
    if (boxRight)
        boxRight.addEventListener('click', navigateToBuy);
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
