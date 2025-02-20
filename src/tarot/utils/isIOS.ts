const isIOS = () => {
  return navigator.userAgent.match(/ipad|iphone/i) !== null;
};

export default isIOS;
// isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
