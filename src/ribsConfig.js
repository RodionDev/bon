const ribsConfig = {
  destroyT: { aliases: ["delete"], positionals: ["identifier"] },
  enlistT: {
    aliases: ["add", "addTolist"],
    positionals: ["subjectOf", "identifier"],
  },
  inviteT: {
    aliases: ["permit", "grant", "token"],
    positionals: ["subjectOf", "identifier"],
  },
  listT: { aliases: ["list"], positionals: ["identifier"] },
  pingT: { aliases: ["ping"], positionals: [] },
  readT: { aliases: ["get"], positionals: ["identifier"] },
  schemaT: {
    aliases: ["schema", "scheme", "meta"],
    positionals: ["mainEntityOfPage"],
  },
  takeonT: {
    aliases: ["createAdd"],
    positionals: ["subjectOf", "identifier"],
  },
  takeupT: { aliases: ["create", "new"], positionals: ["identifier"] },
  unlistT: {
    aliases: ["remove", "removeFromlist"],
    positionals: ["subjectOf", "identifier"],
  },
  updateT: { aliases: ["update", "patch"], positionals: ["identifier"] },
  inflateT: { aliases: ["dirInflateT"], positionals: ["identifier"] },
  optimizeT: { aliases: ["actionStatusOfT"], positionals: ["identifier"] },
  undoT: { aliases: ["undo"], positionals: ["identifier"] },
  anonifyT: { aliases: ["anon"], positionals: ["identifier"] },
  cleanT:  { aliases: ["clean"], positionals: ["identifier"] },
}
module.exports = ribsConfig
