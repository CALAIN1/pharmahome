// Mise à jour de la date et de l'heure en temps réel (fuseau Paris)
function updateDateTime() {
    const options = {
        timeZone: 'Europe/Paris',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    const now = new Date().toLocaleDateString('fr-FR', options);
    document.getElementById('current-date').textContent = now;  // Mise à jour du texte de l'élément avec id "current-date"
}

updateDateTime();
// Fonction pour se déconnecter
document.getElementById('logout-btn').addEventListener('click', function () {
    // Retirer la page du dashboard et revenir à la page de connexion
    document.getElementById('dashboard-page').classList.remove('active');
    document.getElementById('login-page').classList.add('active');

    // Optionnel : tu peux aussi nettoyer des informations liées à la session de l'utilisateur ici
    document.getElementById('user-name').textContent = '';
});
// Fonction pour se déconnecter
document.getElementById('logout-btn').addEventListener('click', function () {
    // Retirer la page du dashboard et revenir à la page de connexion
    document.getElementById('dashboard-page').classList.remove('active');
    document.getElementById('login-page').classList.add('active');

    // Vider les champs d'email et de mot de passe
    document.getElementById('login-email').value = '';
    document.getElementById('login-password').value = '';

    // Optionnel : tu peux aussi nettoyer des informations liées à la session de l'utilisateur ici
    document.getElementById('user-name').textContent = '';
});
// Fonction pour afficher les initiales de l'utilisateur
function setUserInitials(fullName) {
    const initials = fullName.split(' ').map(name => name.charAt(0)).join('');
    document.getElementById('user-initials').textContent = initials;
}

// Au clic sur la bulle, afficher les infos personnelles
document.getElementById('user-initials').addEventListener('click', function () {
    const userDetails = document.getElementById('user-details');
    userDetails.classList.toggle('hidden');
});

// Fonction pour gérer la déconnexion
document.getElementById('logout-btn').addEventListener('click', function () {
    // Retirer la page du dashboard et revenir à la page de connexion
    document.getElementById('dashboard-page').classList.remove('active');
    document.getElementById('login-page').classList.add('active');

    // Vider les champs d'email et de mot de passe
    document.getElementById('login-email').value = '';
    document.getElementById('login-password').value = '';

    // Réinitialiser les infos affichées
    document.getElementById('user-name').textContent = '';
    document.getElementById('user-initials').textContent = '';
    document.getElementById('user-details').classList.add('hidden');
});

// Remplissage des informations utilisateur
function setUserDetails(firstName, lastName, age, ssn, doctorName, doctorPostalCode, doctorCity, doctorPhone) {
    document.getElementById('full-name').textContent = firstName + ' ' + lastName;
    document.getElementById('user-age').textContent = age + ' ans';
    document.getElementById('user-ssn').textContent = ssn;
    document.getElementById('doctor-name').textContent = doctorName;
    document.getElementById('doctor-details').textContent = `${doctorPostalCode}, ${doctorCity}, Tel: ${doctorPhone}`;
}

// Lors de la connexion, appeler la fonction pour afficher les détails de l'utilisateur
setUserDetails('Claude', 'Henri', 45, '123456789012', 'Martin', '75001', 'Paris', '0102030405');
setUserInitials('Claude Henri');

// Fonction pour afficher la page des informations personnelles et pré-remplir les champs
document.getElementById('edit-info-btn').addEventListener('click', function () {
    // Bascule sur la page des informations personnelles
    document.getElementById('dashboard-page').classList.remove('active');
    document.getElementById('user-info-page').classList.add('active');

    // Pré-remplir les champs avec les informations actuelles
    const user = users.find(u => u.personalInfo && u.personalInfo.firstName === document.getElementById('user-name').textContent);

    if (user && user.personalInfo) {
        document.getElementById('first-name').value = user.personalInfo.firstName;
        document.getElementById('last-name').value = user.personalInfo.lastName;
        document.getElementById('age').value = user.personalInfo.age;
        document.getElementById('doctor-name').value = user.personalInfo.doctorName;
        document.getElementById('doctor-postal-code').value = user.personalInfo.doctorPostalCode;
        document.getElementById('doctor-city').value = user.personalInfo.doctorCity;
        document.getElementById('doctor-phone').value = user.personalInfo.doctorPhone;
    }
});


