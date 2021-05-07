// OAuth 2.0 - gapi
const successfulAuth = data => {
    authBtn.classList.add('hide');
    userAvatar.classList.remove('hide');
    authActive.classList.add('active');
    userAvatar.src = data.getImageUrl();
    userAvatar.alt = data.getName();

    getSubscriptions(createSubsList);
};

const notAuthIn = () => {
    authBtn.classList.remove('hide');
    userAvatar.classList.add('hide');
    authActive.classList.remove('active');
    userAvatar.src = '';
    userAvatar.alt = '';
};

const signIn = () => {
    gapi.auth2.getAuthInstance().signIn();
};

const signOut = () => {
    gapi.auth2.getAuthInstance().signOut();
};

const updateStatusAuth = data => {
    data.isSignedIn.listen(() => {
        updateStatusAuth(data);
    });

    if (data.isSignedIn.get()) {
        const userData = data.currentUser.get().getBasicProfile();
        successfulAuth(userData);
    } else {
        notAuthIn();
    }
};

const initClient = () => {
    gapi.client.init({
        'apiKey': 'ADD_YOUR_API_KEY_!!!',
        'clientId': 'ADD_YOUR_CLIENT_ID_!!!',
        'scope': 'https://www.googleapis.com/auth/youtube.readonly',
        'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
    })
    .then(() => {
        updateStatusAuth(gapi.auth2.getAuthInstance());
        authBtn.addEventListener('click', signIn);
        userAvatar.addEventListener('click', signOut);
    })
    .then(loadScreenData)
    .catch(() => {
        authBtn.removeEventListener('click', signIn);
        userAvatar.removeEventListener('click', signOut);
        alert('Authorization is impossible!');
    })
  };

  gapi.load('client:auth2', initClient);