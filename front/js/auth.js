// Gestion des pages (inscription, connexion, etc.)
document.getElementById('show-signup').addEventListener('click', function () {
    document.getElementById('login-page').classList.remove('active');
    document.getElementById('signup-page').classList.add('active');
});

document.getElementById('show-login').addEventListener('click', function () {
    document.getElementById('signup-page').classList.remove('active');
    document.getElementById('login-page').classList.add('active');
});

// Stockage des utilisateurs dans localStorage
let users = JSON.parse(localStorage.getItem('users')) || [];

// Vérification du formulaire d'inscription
document.getElementById('signup-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const signupError = document.getElementById('signup-error');

    // Vérification de l'adresse email
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!emailPattern.test(email)) {
        signupError.textContent = "Veuillez entrer une adresse email valide.";
        return;
    }

    // Vérification du mot de passe (au moins 8 caractères, 1 majuscule, 1 caractère spécial)
    const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordPattern.test(password)) {
        signupError.textContent = "Mot de passe invalide. Au moins 8 caractères, une majuscule et un caractère spécial.";
        return;
    }

    // Stockage de l'utilisateur (email et mot de passe)
    users.push({ email, password, personalInfo: null });
    localStorage.setItem('users', JSON.stringify(users));

    // Passage à la page des informations personnelles
    document.getElementById('signup-page').classList.remove('active');
    document.getElementById('user-info-page').classList.add('active');
});

// Sauvegarde des informations personnelles
document.getElementById('user-info-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const age = document.getElementById('age').value;
    const doctorName = document.getElementById('doctor-name').value;
    const doctorPostalCode = document.getElementById('doctor-postal-code').value;
    const doctorCity = document.getElementById('doctor-city').value;
    const doctorPhone = document.getElementById('doctor-phone').value;

    const email = users[users.length - 1].email;  // Prendre l'utilisateur récemment inscrit

    // Mise à jour des informations personnelles de l'utilisateur
    const updatedUsers = users.map(user => {
        if (user.email === email) {
            return {
                ...user,
                personalInfo: {
                    firstName,
                    lastName,
                    age,
                    doctorName,
                    doctorPostalCode,
                    doctorCity,
                    doctorPhone
                }
            };
        }
        return user;
    });

    // Mise à jour du stockage local avec les nouvelles infos
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    users = updatedUsers;  // Mise à jour de la variable locale

    // Redirection vers le tableau de bord
    document.getElementById('user-info-page').classList.remove('active');
    document.getElementById('dashboard-page').classList.add('active');
    document.getElementById('user-name').textContent = firstName;  // Afficher le prénom de l'utilisateur
});

// Connexion utilisateur (Validation des identifiants)
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Vérification des identifiants avec les utilisateurs stockés
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Connexion réussie
        document.getElementById('login-page').classList.remove('active');
        document.getElementById('dashboard-page').classList.add('active');
        document.getElementById('user-name').textContent = user.personalInfo?.firstName || 'Utilisateur';  // Affichage du prénom de l'utilisateur
    } else {
        alert("Identifiants incorrects");
    }
});