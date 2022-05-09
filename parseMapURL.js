export const parseMapURL = (url) => {
  const n = url.match(/q=([\d\.]+),([\d\.]+)&zoom=(\d+)/);
  //console.log(n);
  //Deno.exit();
  if (!n) {
    return ["", "", ""];
  }
  return [n[1], n[2], n[3]];
};
