export const loadOrFetch = async (url) => {
  const n = url.lastIndexOf("/");
  const fn = url.substring(n + 1);
  try {
    const html = await Deno.readTextFile("src/" + fn);
    return html;
  } catch (e) {
  }
  const html = await (await fetch(url)).text();
  await Deno.writeTextFile("src/" + fn, html);
  return html;
};
