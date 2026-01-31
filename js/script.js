const instagramNavbarMenu = document.querySelector('.instagram-navbar-menu');
const menuClicked = document.querySelector('.menu-clicked');
const leftPartMenuClicked = document.querySelector('.left-part-menu-clicked');

let deviceID = localStorage.getItem('unique_user_id');
if (!deviceID) {
    deviceID = 'user-' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('unique_user_id', deviceID);
}

instagramNavbarMenu.addEventListener('click', function (event) {
    event.preventDefault();
    if (menuClicked.style.display == 'flex') {
        menuClicked.style.display = 'none';
    } else {
        menuClicked.style.display = 'flex';
    }
});

leftPartMenuClicked.addEventListener('click', function (event) {
    menuClicked.style.display = 'none';
});

function liked(number) {
    const postId = '#post' + number;
    const post = document.querySelector(postId);
    if (!post) return;

    const likeText = post.querySelector('.interactions .likes span');
    const likeImage = post.querySelector('.interactions .likes img');
    const likes = Number(likeText.innerHTML);

    const storageKey = deviceID + '_post_' + number;
    let isLiked = localStorage.getItem(storageKey) === 'true';

    if (isLiked) {
        likeText.innerHTML = String(likes - 1);
        likeImage.style.filter = "invert(100%) brightness(200%)";
        localStorage.setItem(storageKey, 'false');
    } else {
        likeText.innerHTML = String(likes + 1);
        likeImage.style.filter = "invert(60%) sepia(100%) hue-rotate(190deg) saturate(5000%)";
        localStorage.setItem(storageKey, 'true');
    }
}

// THIS PART IS CRITICAL: It runs when the page loads to restore the "Liked" look
document.querySelectorAll('[id^="post"]').forEach(post => {
    const number = post.id.replace('post', '');
    const storageKey = deviceID + '_post_' + number;
    const isLiked = localStorage.getItem(storageKey) === 'true';

    if (isLiked) {
        const likeText = post.querySelector('.interactions .likes span');
        const likeImage = post.querySelector('.interactions .likes img');
        if (likeText && likeImage) {
            likeText.innerHTML = String(Number(likeText.innerHTML) + 1);
            likeImage.style.filter = "invert(60%) sepia(100%) hue-rotate(190deg) saturate(5000%)";
        }
    }
});