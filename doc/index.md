<aside>
  <dl>
  <dd>Thither let us bend all our thoughts, to learn</dd>
  <dd>What creatures there inhabit, of what mould</dd>
  <dd>Or substance, how endued</dd>
</dl>
</aside>
Reusable _endpoints_ for **elioBones** projects.
[elioBones Dogma](/eliobones/dogma.html)
# Ribs
Its core ribs are 10 _endpoints_. They enclose the beating heart of **elioWay** projects. You will engage them a lot!
## The TURDs
Four **elioEngage** operations - for working with the top level object - the **engaged** "thing":
<article>
  <a href="/eliobones/bones/ribs/takeupT/star.png" target="_splash">
  <img src="/eliobones/bones/ribs/takeupT/favicon.png">
  <div>
  <h4>
  <code>takeupT</code>
</h4>
  <p>As in "take up carpentry". The "record create" endpoint.  </p>
</div>
</a>
</article>
<article>
  <a href="/eliobones/bones/ribs/updateT/star.png" target="_splash">
  <img src="/eliobones/bones/ribs/updateT/favicon.png">
  <div>
  <h4>
  <code>updateT</code>
</h4>
  <p>The "record update" endpoint.  </p>
</div>
</a>
</article>
<article>
  <a href="/eliobones/bones/ribs/readT/star.png" target="_splash">
  <img src="/eliobones/bones/ribs/readT/favicon.png">
  <div>
  <h4>
  <code>readT</code>
</h4>
  <p>The "record get" endpoint.  </p>
</div>
</a>
</article>
<article>
  <a href="/eliobones/bones/ribs/destroyT/star.png" target="_splash">
  <img src="/eliobones/bones/ribs/destroyT/favicon.png">
  <div>
  <h4>
  <code>destroyT</code>
</h4>
  <p>The "record delete" endpoint.  </p>
</div>
</a>
</article>
## The LUTEs
Four **elioList** endpoints:
<article>
  <a href="/eliobones/bones/ribs/listT/star.png" target="_splash">
  <img src="/eliobones/bones/ribs/listT/favicon.png">
  <div>
  <h4>
  <code>listT</code>
</h4>
  <p>The "list all relateds record" endpoint.  </p>
</div>
</a>
</article>
<article>
  <a href="/eliobones/bones/ribs/unlistT/star.png" target="_splash">
  <img src="/eliobones/bones/ribs/unlistT/favicon.png">
  <div>
  <h4>
  <code>unlistT</code>
</h4>
  <p>The "record remove from list" endpoint.  </p>
</div>
</a>
</article>
<article>
  <a href="/eliobones/bones/ribs/takeonT/star.png" target="_splash">
  <img src="/eliobones/bones/ribs/takeonT/favicon.png">
  <div>
  <h4>
  <code>takeonT</code>
</h4>
  <p>The "record create and add to list" endpoint.  </p>
</div>
</a>
</article>
<article>
  <a href="/eliobones/bones/ribs/enlistT/star.png" target="_splash">
  <img src="/eliobones/bones/ribs/enlistT/favicon.png">
  <div>
  <h4>
  <code>enlistT</code>
</h4>
  <p>The "record add to list" endpoint.  </p>
</div>
</a>
</article>
### PS
Two **elioSchema** endpoints:
<article>
  <a href="/eliobones/bones/ribs/pingT/star.png" target="_splash">
  <img src="/eliobones/bones/ribs/pingT/favicon.png">
  <div>
  <h4>
  <code>pingT</code>
</h4>
  <p>An endpoint for checking the availability of endpoints.  </p>
</div>
</a>
</article>
<article>
  <a href="/eliobones/bones/ribs/schemaT/star.png" target="_splash">
  <img src="/eliobones/bones/ribs/schemaT/favicon.png">
  <div>
  <h4>
  <code>schemaT</code>
</h4>
  <p>An endpoint for getting metadata, or for getting a new blank record.  </p>
</div>
</a>
</article>
## The Rest
### Spine
These are called internally by the endpoints, but could be called independently for other purposes:
<article>
  <a href="/eliobones/bones/spine/engageT/star.png" target="_splash">
  <img src="/eliobones/bones/spine/engageT/favicon.png">
  <div>
  <h4>
  <code>engageT</code>
</h4>
  <p>An endpoint which is a light wrapper for opening.  </p>
</div>
</a>
</article>
<article>
  <a href="/eliobones/bones/spine/authT/star.png" target="_splash">
  <img src="/eliobones/bones/spine/authT/favicon.png">
  <div>
  <h4>
  <code>authT</code>
</h4>
  <p>An endpoint for checking the user is Permitted to call each endpoint.  </p>
</div>
</a>
</article>
<article>
  <a href="/eliobones/bones/spine/permitT/star.png" target="_splash">
  <img src="/eliobones/bones/spine/permitT/favicon.png">
  <div>
  <h4>
  <code>permitT</code>
</h4>
  <p>Called by <code>authT</code>. An endpoint for checking the user is Permitted to proceed.
  </p>
</div>
</a>
</article>
As long as the endpoint acts upon a complete `thing`, with or without a list, and returns the payload correctly formatted, it is an **elioBone**.
### IOU adons
Here are, for instance, three **elioOptimize** endpoints, the very least we could do. We expect you'll need more. You'll have to write those yourself and share them. We'll share any we write here as well. But for now... We feel it's the least we owe.
<article>
  <a href="/eliobones/bones/adons/inviteT/star.png" target="_splash">
  <img src="/eliobones/bones/adons/inviteT/favicon.png">
  <div>
  <h4>
  <code>inviteT</code>
</h4>
  <p>Create a token and corresponding Permit to <code>inviteT</code> others to view/edit your thing.</p>
</div>
</a>
</article>
<article>
  <a href="/eliobones/bones/adons/optimizeT/star.png" target="_splash">
  <img src="/eliobones/bones/adons/optimizeT/favicon.png">
  <div>
  <h4>
  <code>optimizeT</code>
</h4>
  <p>Report on the combined <code>Action.actionStatus</code> of listed things.  </p>
</div>
</a>
</article>
<article>
  <a href="/eliobones/bones/adons/undoT/star.png" target="_splash">
  <img src="/eliobones/bones/adons/undoT/favicon.png">
  <div>
  <h4>
  <code>undoT</code>
</h4>
  <p>Reverse data changes by going back a certain number of steps. Write me! It will be fun.</p>
</div>
</a>
</article>
