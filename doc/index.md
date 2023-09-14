# bones
> "Can you get this done by Wednesday?" **Rosalind Codrington**
**bones** REST API for <https://schema.org> mongoose schema spidered the elioWay.
![experimental](/eliosin/icon/devops/experimental/favicon.ico "experimental")
## WTF
Reusable endpoints for **elioBones** projects.
[elioBones Dogma](/eliobones/dogma.html)
## Ribs
Its ribs are 12 endpoints. Thet are the beating heart of **elioWay** projects. You will engage them a lot!
### The TURDs
Four **elioEngage** operations - for working with the top level object - the **engaged** "thing":
<article>
  <a href="/eliobones/bones/ribs/takeupT/">
  <img src="/eliobones/bones/ribs/takeupT/apple-touch-icon.png">
  <div>
  <h4>
  <code>takeupT</code>
</h4>
  <p>As in "take up carpentry". The "record create" endpoint.  </p>
</div>
</a>
</article>
<article>
  <a href="/eliobones/bones/ribs/updateT/">
  <img src="/eliobones/bones/ribs/updateT/apple-touch-icon.png">
  <div>
  <h4>
  <code>updateT</code>
</h4>
  <p>The "record update" endpoint.  </p>
</div>
</a>
</article>
<article>
  <a href="/eliobones/bones/ribs/readT/">
  <img src="/eliobones/bones/ribs/readT/apple-touch-icon.png">
  <div>
  <h4>
  <code>readT</code>
</h4>
  <p>The "record get" endpoint.  </p>
</div>
</a>
</article>
<article>
  <a href="/eliobones/bones/ribs/destroyT/">
  <img src="/eliobones/bones/ribs/destroyT/apple-touch-icon.png">
  <div>
  <h4>
  <code>destroyT</code>
</h4>
  <p>The "record delete" endpoint.  </p>
</div>
</a>
</article>
### The LUTEs
Four **elioList** endpoints:
<article>
  <a href="/eliobones/bones/ribs/listT/">
  <img src="/eliobones/bones/ribs/listT/apple-touch-icon.png">
  <div>
  <h4>
  <code>listT</code>
</h4>
  <p>The "list all relateds record" endpoint.  </p>
</div>
</a>
</article>
<article>
  <a href="/eliobones/bones/ribs/unlistT/">
  <img src="/eliobones/bones/ribs/unlistT/apple-touch-icon.png">
  <div>
  <h4>
  <code>unlistT</code>
</h4>
  <p>The "record remove from list" endpoint.  </p>
</div>
</a>
</article>
<article>
  <a href="/eliobones/bones/ribs/takeonT/">
  <img src="/eliobones/bones/ribs/takeonT/apple-touch-icon.png">
  <div>
  <h4>
  <code>takeonT</code>
</h4>
  <p>The "record create and add to list" endpoint.  </p>
</div>
</a>
</article>
<article>
  <a href="/eliobones/bones/ribs/enlistT/">
  <img src="/eliobones/bones/ribs/enlistT/apple-touch-icon.png">
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
  <a href="/eliobones/bones/ribs/pingT/">
  <img src="/eliobones/bones/ribs/pingT/apple-touch-icon.png">
  <div>
  <h4>
  <code>pingT</code>
</h4>
  <p>An endpoint for checking the availability of endpoints.  </p>
</div>
</a>
</article>
<article>
  <a href="/eliobones/bones/ribs/schemaT/">
  <img src="/eliobones/bones/ribs/schemaT/apple-touch-icon.png">
  <div>
  <h4>
  <code>schemaT</code>
</h4>
  <p>An endpoint for getting metadata, or for getting a new blank record.  </p>
</div>
</a>
</article>
### Auth
Two **elioEngage** endpoints:
<article>
  <a href="/eliobones/bones/ribs/loginT/">
  <img src="/eliobones/bones/ribs/loginT/apple-touch-icon.png">
  <div>
  <h4>
  <code>loginT</code>
</h4>
  <p>An endpoint for logging into a thing. You won't ever log into elioWay - you log into every app separately.  </p>
</div>
</a>
</article>
<article>
  <a href="/eliobones/bones/ribs/logoutT/">
  <img src="/eliobones/bones/ribs/logoutT/apple-touch-icon.png">
  <div>
  <h4>
  <code>logoutT</code>
</h4>
  <p>An endpoint for logging out of an app.  </p>
</div>
</a>
</article>
## Other bones
## Spine
These are called internally by the endpoints, but could be called independently for other purposes:
<article>
  <a href="/eliobones/bones/spine/engageT/">
  <img src="/eliobones/bones/spine/engageT/apple-touch-icon.png">
  <div>
  <h4>
  <code>engageT</code>
</h4>
  <p>An endpoint which is a light wrapper for opening.  </p>
</div>
</a>
</article>
<article>
  <a href="/eliobones/bones/spine/authT/">
  <img src="/eliobones/bones/spine/authT/apple-touch-icon.png">
  <div>
  <h4>
  <code>authT</code>
</h4>
  <p>An endpoint for checking the user is Permitted to call each endpoint.  </p>
</div>
</a>
</article>
<article>
  <a href="/eliobones/bones/spine/permitT/">
  <img src="/eliobones/bones/spine/permitT/apple-touch-icon.png">
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
### IOU
Here are, for instance, three **elioOptimize** endpoints, the very least we could do. We expect you'll need more. You'll have to write those yourself and share them. We'll share any we write here as well. But for now... We feel it's the least we owe.
<article>
  <a href="/eliobones/bones/ribs/xxxT/">
  <img src="/eliobones/bones/ribs/inflateT/apple-touch-icon.png">
  <div>
  <h4>
  <code>inflateT</code>
</h4>
  <p>Search subdirectores to <code>takeonT</code> any which contain a <code>thing.json</code> file.  </p>
</div>
</a>
</article>
<article>
  <a href="/eliobones/bones/ribs/optimizeT/">
  <img src="/eliobones/bones/ribs/optimizeT/apple-touch-icon.png">
  <div>
  <h4>
  <code>optimizeT</code>
</h4>
  <p>Report on the combined <code>Action.actionStatus</code> of listed things.  </p>
</div>
</a>
</article>
<article>
  <a href="/eliobones/bones/ribs/undoT/">
  <img src="/eliobones/bones/ribs/undoT/apple-touch-icon.png">
  <div>
  <h4>
  <code>undoT</code>
</h4>
  <p>Reverse data changes by going back a certain number of steps.  </p>
</div>
</a>
</article>
