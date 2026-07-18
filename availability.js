/* ============================================================
   LIDM — Booking availability: ONE source of truth.
   Flip a value here and BOTH the homepage and /links update.
     takingNewCampaignClients  -> group DM sessions / campaign roster
     takingSoloSessions        -> one-on-one (personal) DM advice
   ============================================================ */
window.LIDM_AVAILABILITY = {
  takingNewCampaignClients: false,   // groups: currently FULL (waitlist)
  takingSoloSessions: true           // solo 1-on-1: OPEN for booking
};
