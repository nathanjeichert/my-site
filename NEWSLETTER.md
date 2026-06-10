# Show-Alert Newsletter

How the automatic gig-alert emails work, and the one-time setup that remains.

## Architecture (all free, no database)

- **Subscribers** live in a [Resend](https://resend.com) Audience. The old Redis
  database is gone (deleted by Redis Cloud for inactivity, Nov 2025) and nothing
  like it exists anymore — Resend's free tier has no inactivity expiration.
- **Signups**: the site form POSTs to `/api/subscribe`, which adds the contact to
  the Resend audience. Re-subscribing after an unsubscribe re-opts the contact in.
- **Alerts**: a GitHub Action (`.github/workflows/announce-shows.yml`) runs on every
  push that touches `content/shows.json`. It diffs the file against the previous
  commit and, only when genuinely **new, upcoming** shows were added, sends **one
  digest email** via a Resend Broadcast. Edits to existing shows (times, typos,
  descriptions) never email anyone. Past-dated shows never email anyone.
- **Unsubscribes**: every email carries Resend's one-click unsubscribe link.
  Resend suppresses unsubscribed contacts from future broadcasts automatically.
  Nothing to manage.

Normal operation is fully hands-off: add a show to `content/shows.json` (locally or
via the GitHub web editor), push, and subscribers get one tasteful email. Vercel
redeploys the site from the same push.

Free-tier limits (plenty for now): 3,000 emails/month, 100/day, 1,000 contacts.

## One-time setup still needed

1. **Create the Resend account** (~2 min): <https://resend.com/signup> → "Continue
   with Google" as nathanjeichert@gmail.com.
2. **Verify the sending domain**: Resend dashboard → Domains → Add Domain →
   `northerndisconnection.com` (region: us-east-1 is fine). Resend will show 3–4 DNS
   records (an MX + TXT on `send.northerndisconnection.com`, a TXT on
   `resend._domainkey`, and optionally a DMARC TXT). Add them at **Namecheap →
   Domain List → northerndisconnection.com → Advanced DNS**. They do not conflict
   with the existing email forwarding (which lives on the apex MX records — leave
   those alone). Click "Verify" in Resend once added.
3. **Create the audience**: Resend dashboard → Audiences → the default "General"
   audience works; copy its Audience ID.
4. **Create an API key**: Resend dashboard → API Keys → Create (Full access).
5. **Wire the secrets** (or ask Claude to do this part once 1–4 are done):

   ```sh
   # Vercel (powers the signup form)
   npx vercel env add RESEND_API_KEY production    # paste key; repeat for preview/development
   npx vercel env add RESEND_AUDIENCE_ID production
   npx vercel redeploy --prod   # or just push any commit

   # GitHub (powers the alert emails)
   gh secret set RESEND_API_KEY --repo nathanjeichert/my-site
   gh secret set RESEND_AUDIENCE_ID --repo nathanjeichert/my-site
   ```

## Testing / operations

- **Dry-run the alert email locally** (renders HTML, sends nothing):

  ```sh
  BEFORE_FILE=old-shows.json AFTER_FILE=content/shows.json DRY_RUN=1 node scripts/announce-shows.mjs
  ```

- **Dry-run in GitHub**: Actions → "Announce new shows" → Run workflow (dry-run
  defaults to on; it previews what the latest shows.json change would have sent).
- The Action is a graceful no-op (green, with a log message) until the secrets are
  set, so pushes are never blocked by the newsletter.
- Sender address: `shows@northerndisconnection.com`, replies go to
  nathanjeichert@gmail.com.
