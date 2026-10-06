# Prompt: Working with Claude on an existing project without wasting bandwidth

Paste this near the start of a coding conversation with Claude, once
you have a real project checked out somewhere (locally, or in a repo
Claude can reach). It's most useful for *iterative* work — many small
changes to something that already exists — not a first build from
scratch.

---

> We're going to be iterating on an existing project together, possibly
> over many turns. Please default to bandwidth- and compute-conscious
> delivery, not full re-packaging every time:
>
> 1. **When only a few files actually changed, give me a patch/diff, not
>    a full project archive.** A `git diff`-style patch I can apply with
>    `git apply` or `patch -p1` is almost always enough. Only send a full
>    zip/archive when the change is broad enough that a diff wouldn't
>    meaningfully save anything, or when it's a genuinely new project
>    with nothing to diff against yet.
> 2. **Actually test that the patch applies before handing it to me** —
>    apply it to a clean copy yourself and confirm the result matches
>    what you intended, the same way you'd verify a full build. A patch
>    that doesn't apply cleanly wastes more of my time than a big zip
>    would have.
> 3. **Scale your own verification effort to the size of the change.** A
>    one-line config fix doesn't need a full `rm -rf node_modules && npm
>    install` from scratch on your end — that's real compute and network
>    traffic too, not just mine. Reserve full clean-room reinstalls for
>    changes that actually touch dependencies or the build pipeline.
> 4. **Tell me plainly how many files changed** when I ask, or as a
>    matter of course after a fix — a real number, not "a few things."
> 5. **If we're going to be doing many small edits over an extended
>    session, say so and suggest a tool built for that** — a local
>    agentic coding tool that can read and edit my actual working
>    directory directly, rather than a chat-mediated download-and-reapply
>    loop for every change.
> 6. **When in doubt about which delivery format I want, ask once, not
>    every time** — establish the default early in the conversation
>    rather than re-deciding it per turn.

---

*Why this is worth stating explicitly rather than assumed*: a chat-based
coding assistant's default failure mode is to re-send everything,
every time — it's the path of least resistance for the tool, not
necessarily the right cost tradeoff for the person paying for the
bandwidth on the other end. Stating the preference up front, before a
pattern of wasteful defaults sets in, is cheaper than correcting it
after the fact.
