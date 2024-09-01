const isMobile = () => { 
    // return /Android|iPhone|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
    return window.matchMedia('(pointer:coarse)').matches;
    // return true;

}; // =========> mobile device check function

export default isMobile;