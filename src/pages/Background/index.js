import '../../assets/img/logo16.png';
import '../../assets/img/logo48.png';
import '../../assets/img/logo128.png';

console.log('This is the background page.');
console.log('Put the background scripts here.');

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ color: '#3aa757' }, function () {
    console.log('The color is green.');
  });
});

const getUserCookie = () => {
  // for this to work
  // permissions key in manifest should have
  // cookies and url for url used (or url pattern)
  return new Promise((resolve, reject) => {
    const cookieDetails = {
      url: 'https://angora.techpacker.io',
      name: 'user',
    };
    chrome.cookies.get(cookieDetails, (cookie) => {
      // chrome.cookies.get takes callback as 2nd parameter
      // when callback returns we resolve
      resolve(cookie);
    });
  });
};

const getUserId = async () => {
  let userId = '';
  // getUserCookie returns a Promise
  // so using await to wait for it to return
  const userCookie = await getUserCookie();
  if (userCookie) {
    // decode cookie value using decodeURIComponent
    let userInfo = decodeURIComponent(userCookie.value);
    // it is string so parse to object
    userInfo = JSON.parse(userInfo);
    userId = userInfo.id;
  } else {
    console.log(
      'user cookie for angora.techpacker.io. Check if you are logged in'
    );
  }
  return userId;
};

// get userId returns a Promise
getUserId().then((userId) => {
  console.log('userId:', userId);
});
