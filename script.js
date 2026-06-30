document.addEventListener('DOMContentLoaded', () => {
    
    // --- MOBILE MENU HAMBURGER NAVIGATION ---
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.getElementById('navLinks');
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // --- ACADEMIC PLANNER DATA MANAGEMENT (planner.html) ---
    const todoForm = document.getElementById('todoForm');
    const todoInput = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList');
    const taskCount = document.getElementById('taskCount');

    if (todoForm && todoList) {
        let tasksArray = [
            { id: 1, text: "Audit network penetration guidelines criteria", completed: false },
            { id: 2, text: "Finalize responsive design stylesheets layout grid", completed: true }
        ];

        function renderTasksEngine() {
            todoList.innerHTML = '';
            let activeCounter = 0;

            tasksArray.forEach(task => {
                if(!task.completed) activeCounter++;
                const item = document.createElement('li');
                item.className = `todo-item ${task.completed ? 'completed' : ''}`;
                item.innerHTML = `
                    <span>${task.text}</span>
                    <div class="todo-actions">
                        <button class="complete-btn" data-id="${task.id}"><i class="fas ${task.completed ? 'fa-undo' : 'fa-check-circle'}"></i></button>
                        <button class="delete-btn" data-id="${task.id}"><i class="fas fa-trash"></i></button>
                    </div>
                `;
                todoList.appendChild(item);
            });
            if (taskCount) taskCount.textContent = activeCounter;
            bindTaskActions();
        }

        function bindTaskActions() {
            document.querySelectorAll('.complete-btn').forEach(btn => {
                btn.onclick = (e) => {
                    const targetId = parseInt(e.currentTarget.getAttribute('data-id'));
                    tasksArray = tasksArray.map(t => t.id === targetId ? { ...t, completed: !t.completed } : t);
                    renderTasksEngine();
                };
            });
            document.querySelectorAll('.delete-btn').forEach(btn => {
                btn.onclick = (e) => {
                    const targetId = parseInt(e.currentTarget.getAttribute('data-id'));
                    tasksArray = tasksArray.filter(t => t.id !== targetId);
                    renderTasksEngine();
                };
            });
        }

        todoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const val = todoInput.value.trim();
            if(!val) return;
            tasksArray.push({ id: Date.now(), text: val, completed: false });
            todoInput.value = '';
            renderTasksEngine();
        });

        renderTasksEngine();
    }

    // --- CONTACT SECURE INPUT INTERFACE VALIDATION (contact.html) ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('fullName').value.trim();
            const email = document.getElementById('emailAddress').value.trim();
            const phone = document.getElementById('phoneNumber').value.trim();
            const msg = document.getElementById('message').value.trim();

            const nameErr = document.getElementById('nameError');
            const emailErr = document.getElementById('emailError');
            const phoneErr = document.getElementById('phoneError');
            const msgErr = document.getElementById('messageError');
            const success = document.getElementById('formSuccess');

            let isValid = true;

            if (name === '') { nameErr.style.display = 'block'; isValid = false; } else { nameErr.style.display = 'none'; }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { emailErr.style.display = 'block'; isValid = false; } else { emailErr.style.display = 'none'; }
            if (!/^\d+$/.test(phone) || phone === '') { phoneErr.style.display = 'block'; isValid = false; } else { phoneErr.style.display = 'none'; }
            if (msg === '') { msgErr.style.display = 'block'; isValid = false; } else { msgErr.style.display = 'none'; }

            if (isValid) {
                success.style.display = 'block';
                contactForm.reset();
                setTimeout(() => { success.style.display = 'none'; }, 4000);
            }
        });
    }
});