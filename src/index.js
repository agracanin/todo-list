import openModal from "./modal";
import Task from "./task";
import projectManager from "./projectManager";
import Project from "./project";

const createNew = document.querySelector('.new-project');
createNew.addEventListener('click', openModal);

document.addEventListener("DOMContentLoaded", function () {
    const navContainer = document.querySelector('.nav');

    navContainer.addEventListener('click', function (e) {
        let targetElement = e.target;
        while (targetElement !== null && !targetElement.classList.contains('nav-item-toggler')) {
            targetElement = targetElement.parentElement;
        }
        if (targetElement) {
            const navItems = document.querySelectorAll('.nav-item-toggler');

            navItems.forEach(item => {
                item.classList.remove('active-nav-item');
            });

            targetElement.classList.add('active-nav-item');
        }
    });
});
