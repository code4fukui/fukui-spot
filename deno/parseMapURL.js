export const parseMapURL = (url) => {
  const n = url.match(/q=([\d\.]+),([\d\.]+)&zoom=(\d+)/);
  if (n) {
    return [n[1], n[2], n[3]];
  }
  
  const n2 = url.match(/\!2d([\d\.]+)\!3d([\d\.]+)/);
  if (n2) {
    const zoom = 15;
    return [n2[2], n2[1], zoom]; // おかしい??
  }
  
  return ["", "", ""];
};
