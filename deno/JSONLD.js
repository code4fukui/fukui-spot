export class JSONLD {
  static make(vocab, data) {
    const context = (() => {
      if (vocab.url) {
        const context = {};
        context[vocab.prefix] = vocab.url;
        return context;
      } else {
        return vocab;
      }
    })();
    const prefix = vocab.prefix ? vocab.prefix + ":" : "";

    const list = [];
    for (const d of data) {
      const ld = { "@context": context };
      for (const name in d) {
        if (d[name] !== "") {
          ld[prefix + name] = d[name];
        }
      }
      list.push(ld);
    }
    return list;
  }
}
