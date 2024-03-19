const ribsConfig = {
  destroyT: { aliases: ["delete", "destroy"], positionals: ["identifier"] },
  enlistT: {
    aliases: ["add", "addTolist", "enlist"],
    positionals: ["subjectOf", "identifier"],
  },
  inviteT: {
    aliases: ["permit", "grant", "token"],
    positionals: ["subjectOf", "identifier"],
  },
  listT: { aliases: ["list"], positionals: ["identifier"] },
  pingT: { aliases: ["ping"], positionals: [] },
  readT: { aliases: ["get", "read"], positionals: ["identifier"] },
  schemaT: {
    aliases: ["schema", "scheme", "meta"],
    positionals: ["mainEntityOfPage"],
  },
  takeonT: {
    aliases: ["createAdd", "takeon"],
    positionals: ["subjectOf", "identifier"],
  },
  takeupT: { aliases: ["create", "new", "takeup"], positionals: ["identifier"] },
  unlistT: {
    aliases: ["remove", "removeFromlist"],
    positionals: ["subjectOf", "identifier"],
  },
  updateT: { aliases: ["update", "patch"], positionals: ["identifier"] },
  inflateT: { aliases: ["dirInflateT"], positionals: ["identifier"] },
  optimizeT: { aliases: ["actionStatusOfT"], positionals: ["identifier"] },
  undoT: { aliases: ["undo"], positionals: ["identifier"] },
  anonifyT: { aliases: ["anon"], positionals: ["identifier"] },
  cleanT: { aliases: ["clean"], positionals: ["identifier"] },
}
module.exports = ribsConfig
