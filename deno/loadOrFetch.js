export const loadOrFetch = async (url, fn) => {
  const n = url.lastIndexOf("/");
  fn = fn || url.substring(n + 1);
  try {
    const html = await Deno.readTextFile("src/" + fn);
    return html;
  } catch (e) {
  }
  const html = await (await fetch(url)).text();
  await Deno.writeTextFile("src/" + fn, html);
  return html;
};
