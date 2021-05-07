// subscriptionsList
const createSubsList = listVideo => {
    subscriptionsList.textContent = '';
    listVideo.forEach(item => {
        subscriptionsList.insertAdjacentHTML('beforeend', `
            <li class="nav-item">
                <a href="#" class="nav-link" data-channel-id="${item.snippet.resourceId.channelId}" data-title="${item.snippet.title}">
                    <img src="${item.snippet.thumbnails.high.url}" alt="${item.snippet.title}" class="nav-image">
                    <span class="nav-text">${item.snippet.title}</span>
                </a>
            </li>
        `);
    })
};