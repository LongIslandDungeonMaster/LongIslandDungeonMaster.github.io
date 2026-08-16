# The Night Watchman: Product Specification (v2 Rebuild)

**Status:** Spec approved for drafting. The v1 draft is not in this repository and is presumed tombstoned on the Cerberus disk; this spec supersedes it rather than rehabbing it.
**Product line:** LIDM Solo Lane, Rung 1 (free funnel).
**Owner:** Long Island Dungeon Master.
**Red-team:** Codex, against the Acceptance Criteria in section 12. A draft that fails any MUST item does not ship.

---

## 1. Product identity

| Field | Value |
|---|---|
| Title | The Night Watchman |
| Format | Keyed-entry solo adventure (no DM required) |
| System | D&D 5e, SRD 5.2.1 content only (no Product Identity; publishable on our own site and itch) |
| Character | One 3rd-level PC, bring-your-own or included pregen, plus an optional sidekick |
| Night Rating | 2 of 5 lanterns (see section 5.0) |
| Play time | 2 to 2.5 hours per run; replayable |
| Length target | 120 to 180 keyed entries, 45 to 70 PDF pages |
| Deliverables | `downloads/the-night-watchman.html` (hyperlinked, self-contained, site styling) and `downloads/the-night-watchman.pdf` |
| Price | Free, in the Hoard, alongside the other free chests |
| Setting | Brackenford (ties the solo line to the setting we own) |

**Job of this product:** prove the solo lane. It is the funnel piece that a stranger from r/Solo_Roleplaying can download, finish in an evening, and come away convinced that a 30-year DM lives in the page. Everything else (toolkit, paid gamebooks, browser editions) hangs off whether this lands.

## 2. Premise

You are the night watchman of Brackenford. One lantern, one route, seven posts, and the hours between dusk and dawn. Tonight something is moving in the dark that should not be, and nobody is coming to help you until sunrise.

Why this premise is load-bearing for solo play:

- **One character is the fiction, not a compromise.** A lone watchman explains why there is no party. The action economy problem becomes the theme.
- **The watch is a natural clock.** The night divides into three watches (acts), giving pacing, rest points, and a built-in doom clock (dawn arrives whether you succeeded or not).
- **A route is a natural hub map.** The watchman's circuit gives us the hub-and-spoke structure the best gamebooks use, with a reason to revisit locations as the night worsens.
- **It grows the brand's existing thread.** The Wilderness Table Pack already sells "the campfire, the night watch, and what's out there in the dark." This is that promise made playable.

## 3. Design pillars (non-negotiable)

These are distilled from the market's documented quality bar (see The Solo Lane brief). Every entry, encounter, and revision is checked against them.

1. **Fail forward, never dead-end.** A failed check always branches to a complication, cost, or detour. No unforeseeable item gates. No "you die, close the book" outside Dark Watch tier rules.
2. **Closure per run.** The night ends at dawn with one of several complete endings. No sequel bait as a substitute for an ending.
3. **Scripted monster tactics.** The player never plays the enemy honestly. Every combat entry carries a behavior script and a morale line.
4. **One-PC balance is solved for the player, not by the player.** Stated level, hand-tuned encounters, sidekick option, tier system (section 5). The buyer never has to house-rule survivability.
5. **Class-conditional entries.** Minimum 25 entries with conditional lines ("If you can cast a light cantrip...", "If your passive Perception is 14 or higher...") spread across martial, caster, skill, and species capabilities, so any build feels seen.
6. **Hyperlinked everything.** Every entry reference is a link in the HTML edition. The map reveals progressively.
7. **Primer up front.** Two pages teaching how to play alone, before the adventure starts. Assume the reader has never soloed.
8. **Reincorporation over randomness.** State (codewords, the Dawn Track, NPC dispositions) feeds back into later entries. Random tables in the appendix are for continuing play after the story, not a substitute for authored play inside it.
9. **Every tracker earns its keep.** The player tracks exactly four things: HP/resources (their sheet), codewords, the Dawn Track, and lamp oil. Nothing else. If a mechanic demands a fifth tracker it must replace one of these or be cut.
10. **The prose is the DM.** Section 9 is the writing standard. This was v1's stated weakness and is this rebuild's first acceptance criterion.
11. **A taught mechanic fires or dies (Frank, 2026-08-12, HARD BUILD RULE).** If the rules teach a mechanic, entries must use it; if a resource exists, the night must tax or expend it; if state is granted, something must read it. A mechanic that never fires is a lie about the product. ENFORCER: the MECHANIC LINT in `tools/build_keeper.py` fails the build on any grant-without-consume, resource-without-tax, or tracker-without-read.
12. **Gygax-clear (Frank, 2026-08-12, HARD BUILD RULE).** Plain fantasy language beats literary compression everywhere the player must understand something to act: rules, tactics, conditions, transitions. Spend more words when they buy clarity ("a rope hauled back and forth violently by somebody who has stopped counting" beats "a bell is a shape"). Name things by what they do (the chaser, the catcher), never by a private metaphor (the driver, the waiter). The test: if the warmest reader stumbles, the line is wrong, whatever it cost to cut.
13. **The interactive edition speaks auto-state language (Frank, 2026-08-12, HARD BUILD RULE).** The Keeper never instructs bookkeeping it performs itself: no "write this down", no "tick a box", no "mark off one oil". State changes render as statements ("The night remembers: VOUCHED", "The Dawn Track ticks", "The lamp drinks a unit of oil"). Resolved conditionals show only the earned line with the If-clause stripped. Rules the book can enforce (the circuit staging, the hub visit budget, the full Dawn Track), the engine enforces. Each mechanic explains itself the first time it fires. The print edition keeps the imperatives; the transforms live in the build.

## 4. Structure

### 4.1 Acts: the three watches

| Act | Fiction | Function | Entry budget |
|---|---|---|---|
| **First Watch** (dusk to midnight) | The route as normal: posts, townsfolk, small wrongnesses | Tutorial in disguise: teaches checks, the map, the codewords; a guaranteed mid-act encounter | 64 authored, ~36 played (drafted) |
| **Middle Watch** (the dead hours) | The threat surfaces; the route breaks; choices about who and what to protect | The open middle: posts can be visited in player-chosen order; consequences accumulate | ~60 entries |
| **Last Watch** (toward dawn) | Confrontation shaped by accumulated state | Convergence: 3 to 4 distinct finales selected by codewords, not by a single "true path" | ~45 entries |

### 4.2 The route map

Five posts on the watchman's circuit, mapped onto canonical Brackenford locations: **the Broken Wheel** (the inn), **the Shrine of the Quiet Hand**, **Greel's Yard**, **the Square and the Well**, and **the Broken Bridge** (with the Drowned Lane across the water). The ford is the circuit's start and end rather than a post. Revised from seven generic posts to five canonical ones during First Watch drafting: seven proved to be more ground than a two-hour night can cover, and Brackenford already had better locations than the placeholders. The map ships in the book (and as progressive-reveal regions in the HTML edition). Travel between posts is an entry choice; some transitions have night encounters that vary by act and by the Dawn Track.

### 4.3 State: codewords and the Dawn Track

- **Codewords:** maximum 12 slots in the whole adventure, of which First Watch spends eight (ICEBOUND, VOUCHED, MUGSET, HANDSIGN, WITNESS, BLACKNAIL, LARDER, BLOODED); Middle Watch adds four (DOORHELD, RELIEVED, TOLLPAID, and the two-faced SHELTERED/TAKEN slot, whose faces never coexist) and Last Watch adds none. Written on the sheet when granted; later entries branch on them. Codewords are the memory of the night. Separately, the night may write up to two **dawn marks** (SCARRED, CARRIED): same notation, granted only by the finale or by the Ember collapse rule in 5.2 (ruled v1.6: an Ember collapse IS that watchman's finale), read only by the dawn epilogue, so they never load the player's memory during play and do not count against the 12. ~~(Tombstoned 2026-08-12: previously allowed "at most four new" later-act codewords with THAWED among them; THAWED encoded nothing, since its entry is on every path, and was folded into the act structure.)~~
- **The Dawn Track:** a 12-step track. Certain failures, rests, and deliberate delays advance it. When it fills, dawn breaks and the finale begins *in whatever state the night is in*. The track is the pacing engine and the anti-turtling mechanism: resting is allowed but costs night.
- **Lamp oil:** a 4-unit resource. Light matters mechanically (darkness imposes disadvantage on route events; some entries need the lamp). Oil is the one supply decision the player makes all night. It exists because the tiers (below) hook into it.

## 5. Difficulty: the Night Rating and the Watch Lamps

### 5.0 Two different questions

Difficulty in a solo *line* has to answer two questions that do not have the same answer, so the system has two parts.

**"How hard is this module?" is a shelf question.** It is asked once, before purchase, by someone choosing between six modules on a page. It is answered by the **Night Rating**: 1 to 5 lanterns, printed on the cover, in the listing, and on the Hoard card. A 1-lantern night is a gentle haunted evening; a 5-lantern night expects a played-out character and will end runs. This is what gives the line range and lets a returning customer pick their next night by appetite. It costs nothing to author because it is a description of the module we were going to build anyway.

**"How hard is tonight, for me?" is a table question.** It is asked by the person holding the dice, and the honest answers vary from "I am here to write in a journal and I do not want to lose the character" to "I want it to be able to kill me." That is the **Watch Lamp** tier, chosen and changeable at play time.

Dropping the tiers and keeping only the rating was considered and rejected: a rating alone means a player who finds module three too punishing has no move except to stop buying the line, and a player who finds module one toothless has no move except to stop caring. The tiers keep both of them in the line. Critically, the tiers were designed so they are nearly free to author: **they change dials, never text**, so a rated-and-tiered module costs the same to write as a rated one.

**The two interlock.** The Night Rating sets where the module's Lantern Watch sits; Ember and Dark flex around that anchor. So Lantern Watch on a 4-lantern module is genuinely harder than Lantern Watch on a 2-lantern module, and Ember on a 5-lantern night is still a real night. The rating is the module's identity. The tier is the player's accommodation. Neither substitutes for the other.

| Night Rating | What Lantern Watch means on that module |
|---|---|
| 1 lantern | Atmosphere and mystery; combat avoidable throughout; failure costs time and story, not the character |
| 2 lanterns | *The Night Watchman.* One or two real fights, losable, with rescue-with-cost branches everywhere |
| 3 lanterns | Resource attrition matters; the character can die to carelessness |
| 4 lanterns | Expects system mastery and a built character; death on a bad sequence of choices |
| 5 lanterns | Expects a survivor of earlier nights; death on a bad sequence of rolls |

### 5.1 The Watch Lamps

Three tiers, chosen at the start of the night, switchable at any rest with no penalty and no scolding text. The tier system is the answer to the two truths the research surfaced: 5e math wants four PCs, and solo players range from journal-first storytellers to ironman grognards. One book must serve both.

**Design rule that keeps this affordable to author: tiers never fork entries.** All three tiers read the same numbered entries. A tier changes dials, not text branches. The dials live in a one-line **Watch Lamp sidebar** inside every combat and hazard entry.

### 5.2 The tiers

| | 🕯️ **Ember Watch** (story) | 🏮 **Lantern Watch** (standard) | 🌑 **Dark Watch** (veteran) |
|---|---|---|---|
| Pitch to the player | "Live the night. The story is the point." | "The night as intended." | "The night does not care about you." |
| Watchman's Resolve (temp HP at start of each act) | 10 + level | 5 + level | none |
| Rekindle tokens (per night) | 2 | 1 | 0 |
| Enemy dial | Low HP value in each Lamp sidebar; enemies use the *cautious* tactic line | High HP value; standard tactic line | High HP value; standard tactics, plus the *cruel* line where the sidebar has one; enemies win initiative ties |
| Check DCs | As printed, minus 2 | As printed | As printed, plus 2 on Dawn Track steps 9+ |
| Dawn Track | Advances only on the entry's listed triggers | As printed | Also advances on every short rest |
| Lamp oil | 5 units | 4 units | 3 units |
| At 0 HP | You are dragged to safety by dawn; take the dawn mark SCARRED and read the aftermath entry. The night continues without you and the finale reflects it. | Death saves as normal; every dying situation has a rescue-with-cost branch (a codeword, a lost post, a debt) | Death is death. The run ends; the book invites you to bury the watchman and start a new one. |
| Who it serves | First-time soloists, journal-first players, kids at the table with a parent | Most players | The r/Solo_Roleplaying ironman crowd; streamers; replay value |

**Rekindle token:** spend one to reroll any d20 you just rolled, or to auto-stabilize at 0 HP, or to refill 1 lamp oil. One mechanic, three uses, zero extra tracking (it is two checkboxes on the sheet).

### 5.3 The Watch Lamp sidebar format

Every combat/hazard entry ends with one compact line, always in the same order, so the eye learns where to look:

> **Watch Lamp** · Ember: the ghast has 22 HP and will not pursue past the lychgate. · Lantern: 33 HP. · Dark: 33 HP; it targets whoever carries the lamp.

### 5.4 Tier rules for the red team

- Ember must be completable by the pregen with median dice and no system mastery (verify by scripted playthrough).
- Lantern must be losable but not swingy: no single enemy action may deal more than 60% of the pregen's max HP **on a non-critical hit** (ruled v1.5: any d8 attack's critical breaks a literal 60% cap at 3rd level; criticals are the dice's jurisdiction, and the tier system, rescue branches, and Ember's no-death rule are the safety net for them). The Dark-only arch push at the bridge is sanctioned as a stacked worst case: it is avoidable by not fighting on the arch, and Dark's shelf promise is that it can kill you.
- Dark must be winnable: at least one route to each finale must exist that a careful player can find without foreknowledge (no luck-only survival).
- The three Lamp lines in any sidebar must differ only in dials (HP, targets, morale, DCs), never in story outcome. **One sanctioned exception:** the Middle Watch crisis hub's visit count (Ember reaches three of the four crises, Lantern and Dark reach two). It widens how much of the night an Ember player sees without changing any scene's outcome, it is disclosed in the tier descriptions up front, and it is the only tier dial permitted to touch story breadth.

## 6. Character rules

- **Bring your own:** any 3rd-level 5e character (2014 or 2024 rules; entries reference checks and saves in edition-neutral wording).
- **Pregen included:** the default watchman, a human champion fighter with a sensible sheet, one page, ready in two minutes. A second pregen (a cleric of the dawn) ships in the appendix for replay contrast.
- **The watch-dog (optional sidekick):** a mastiff-pattern companion with a simple sidekick block (attack, help, guard; three abilities, no spell list). It solves the action economy the friendly way and gives the night a second heartbeat. Entries occasionally address it ("If the dog is with you..."), which doubles as conditional-content coverage. On Ember it cannot die, only flee.
- **SRD 5.2.1 compliance:** all creatures and effects drawn from or reskinned within SRD content. No named WotC IP. This keeps every distribution channel open, including our own site, itch, and DriveThruRPG later.

## 7. Entry format standard

Every entry follows one shape:

1. **Number** (three digits, e.g. 047; the HTML edition anchors and links them).
2. **Prose** per section 9. Hard cap 160 words of READ-ALOUD PROSE before the first choice or check; typical 80 to 120. Stat blocks, tactics scripts, Watch Lamp sidebars and procedure text are reference matter, not prose, and are measured separately (ruled v1.9: a combat entry's block is looked at, not read aloud).
3. **Conditional lines** where earned (class, species, skill, codeword, dog).
4. **Mechanics block** when present: check with DC, both outcomes as entry links, both of which move the night forward (pillar 1).
5. **Watch Lamp sidebar** if combat/hazard.
6. **Choices**: 2 to 4, concrete, phrased as actions the watchman would actually weigh, never "turn to 12 to be right / 13 to be wrong."

Combat entries additionally carry the **script block**: initiative note, per-round behavior ("round 1 it...; when below half HP it..."), morale/flee line and where fleeing enemies go (an entry number, so the world stays persistent), and what the enemy does if the player retreats.

## 8. The primer and the appendix

- **Primer (2 pages):** what solo play is, what you track (the four trackers only), how checks work, how to pick a Watch Lamp tier, the one-paragraph contract ("when the book is silent, you decide; err toward what makes the night more interesting"), and a worked example entry.
- **Appendix A: After the Dawn.** A compact d6-oracle (yes/no with "but/and" on 1 and 6) plus pointers into the Wilderness Table Pack tables, so a finished reader can keep playing Brackenford freeform. This is the on-ramp to Solo Lane Rung 2 and it cross-sells an existing product.
- **Appendix B:** the two pregens and the watch-dog block.
- **Appendix C:** the codeword sheet and Dawn Track, print-friendly, one page.

## 9. Prose standard (the v1 rehab, codified)

The voice is the brand: a DM who has run thirty years of tables, talking directly to one player at night. Rules:

- Second person, present tense, concrete and sensory. Name sounds, temperatures, and light; the night is the co-star.
- No filler intensifiers (very, truly, incredibly). No "you feel a sense of." If the prose works, the player feels it without being told to.
- Read-aloud beats of 80 to 120 words; nothing over 160 before the player gets a verb.
- NPCs get one physical tell and one want each; dialogue is choice-menued (ask/press/leave-style) with codeword consequences, because NPC talk is the category's documented weak pillar and we intend to win it.
- House style: no em dashes (site-wide convention); serial commas; blank line between prose and mechanics.
- Every entry must survive the read-aloud test: spoken aloud, it should sound like a DM, not like a manual.

## 10. HTML edition requirements

- Self-contained single HTML file in `downloads/`, matching the conventions of existing free chests (inline styling consistent with site palette, no external dependencies beyond the site's standard fonts).
- Every entry reference is an anchor link; back-to-map link on every entry; the route map reveals regions via the same lightweight localStorage pattern the site already uses for secret chests.
- Optional inline d20 roller button per check (the LIDM Table Engine pattern from Where the Road Ends). If time-boxed out of v2.0, it ships in v2.1; the anchors and structure must support it either way.
- PDF is generated from the same content, page-referenced (entry numbers, not hyperlinks, do the work there).

## 11. Distribution and metrics

- Ships as a free chest in the Hoard next to the Field Kit and the Wilderness Pack, plus an itch.io listing (the solo crowd's native habitat) pointing back to the site.
- Positioning line: hand-written by a human DM, every word. (The solo community is loudly averse to AI-generated content; our claim is the craft.)
- Success metrics for the lane go/no-go: downloads vs. the other Hoard chests over 60 days, itch collection adds, mailing-list joins attributed to the watchman page, and unsolicited session reports (the solo scene posts actual-plays when a product lands).

## 12. Acceptance criteria (Codex red-team checklist)

MUST items; a failure on any blocks release.

1. **No dead ends:** traverse every failure branch; each leads to a live entry that advances or complicates the night. Zero "restart" outcomes outside Dark Watch death.
2. **No orphans or broken links:** every entry reachable from some path; every referenced entry exists; HTML anchors all resolve.
3. **Closure:** every finale is a complete ending with aftermath text reflecting at least 3 codewords.
4. **Tactics scripts:** every combat has behavior, morale, and retreat lines. Sample-play each combat on all three tiers per the tier rules in 5.4.
5. **Balance bounds:** verify the 60% single-hit cap (Lantern), Ember completability, and Dark winnability by scripted playthroughs with the pregen.
6. **Conditional coverage:** count the conditional entries; at least 25, touching martial, caster, skill-monkey, and dog, with no capability referenced that a 3rd-level SRD character cannot have.
7. **Tracker audit:** confirm nothing beyond the four trackers is ever required.
8. **Tier integrity:** confirm no Watch Lamp sidebar changes story outcome, only dials.
9. **Prose audit:** every entry passes the read-aloud test and the section 9 banned-list grep (including the em dash check); flag any entry over the word caps.
10. **SRD compliance:** no Product Identity terms anywhere in text or art references.
11. **Primer test:** a reader who has never soloed can start playing within 10 minutes using only the primer (test with a cold reader).
12. **State audit:** all 12 codewords are both grantable and consumed somewhere; the Dawn Track's every step is reachable; lamp oil can run out and the book says what happens when it does.

## 13. Changelog

**v1.1.** Character level revised from 1st to 3rd. Reasons, in order of weight: (a) at 1st level a single critical hit ends a solo run, which makes Dark Watch a coin flip rather than a challenge and makes fail-forward branching cosmetic, because the player is dead before the branch fires; (b) 3rd level puts the subclass online, and the subclass is the single richest source of the class-conditional entries that pillar 5 requires, since two 1st-level fighters are nearly the same character and two 3rd-level fighters are not; (c) roughly 25 to 30 hit points gives the encounters room to hurt without killing, which is the range the tier dials are built to work in; (d) the fiction survives it, since a watchman with a couple of years behind them is still a humble figure. Consequence: encounter budgets, the pregens, and the 60% single-hit cap are all recalculated against a 3rd-level baseline.

**v1.2.** Difficulty restructured into the Night Rating (per module, shelf-facing) plus the Watch Lamps (per session, player-facing). See section 5.0 for why both are kept.

**v1.7 (2026-08-14, Codex round three closed).** Seven findings, all closed. (a) The P0
inversion: choice buttons now pass the same `navGuard` as links (truly one gate), and an
**authored fail-forward route supersedes the generic collapse states** — a standing character
cannot claim 486, a collapsed Ember or Lantern character at 483 is routed to it instead of the
generic absence, and 486's own CARRIED/SCARRED grants are preserved. (b) 521's TAKEN line is
chained behind CARRIED, so a recovered Ada never reads as lost. (c) BLACKNAIL is knowledge, not
paper: 101 and the dawn line no longer assert possession of a sheet the route may never have
touched. (d) 407's returned list is TOLLPAID-conditional. (e) The Dark death ending carries five
conditional aftermath lines (TOLLPAID, DOORHELD, RELIEVED, VOUCHED, Nell), satisfying the
three-codeword closure MUST on every finale including burial. (f) Rekindle validates before it
spends: no refilling a full lamp, no stabilising the healthy, no burning a token on garbage
input. (g) The MUGSET dawn line no longer invents the player's disbelief. Codex's acceptance of
the v1.6 rulings (any-death ledger, quiet-ground tier switches) stands.

**v1.6 (2026-08-13, Codex round two closed).** Codex confirmed the v1.5 repairs held, then broke
the still-live controls; ten findings, all closed. Rulings: (a) **one navigation gate** — prose
entry links now pass the same guard as choice buttons (hub budget, unresolved checks, the 444
adjudication, 483's fail-forward requiring 0 HP); (b) **death and collapse are states, not
advisories** — a dead Dark watchman can only be buried (535, whose ledger line now states that
any death the night takes counts toward the eleven), and an Ember collapse writes SCARRED and
routes to the dawn, with all play locked in both states; (c) **a Rekindle reroll refunds the
failed roll's Dawn tick** before the new roll re-charges it, and only the most recent roll
qualifies, expiring on navigation; (d) **Watch Lamp switches are blocked at any entry with a
check or a creature**, which is the enforceable reading of "at any rest"; (e) the dawn epilogue
now carries a line for **every codeword and mark** (eight added), so any run's ending reflects
all of its earned state; (f) the **Keeper primer speaks auto-state language** end to end;
(g) the build lint's second extractor compares **operation identities** (codeword names, tick
sizes, oil direction) using separately derived patterns, not bare counts; (h) the Dark nest's
break line names all three shrikes; (i) dawn-mark timing reconciled in 4.3 (the Ember collapse
is that watchman's finale).

**v1.5 (2026-08-13, Codex red-team REVISE closed).** Codex ran three seeded playthroughs plus a
static engine attack and returned 13 findings; all closed. New rulings this version: (a) **roll
integrity** — a rolled result stands, rerolls cost a Rekindle token, outcome branches and all
choices in a check entry lock until the dice are thrown; (b) **tier transition arithmetic** — on a
Watch Lamp switch, temporary hit points, oil, and Rekindle clamp DOWN to the new tier's values and
nothing refills until the next act begins; (c) the 60% single-hit cap measures non-critical hits
(see 5.4); (d) the **full Dawn Track routes to 312**, not 315, so Hett's return (313) and the
dawn-band read (314) stay in the fiction, and the finales are time-neutral about the remaining
night; (e) the crisis hub never offers the same crisis twice, on paper and in the engine; (f) 444
is a three-save sequence the engine runs as three gated rolls; (g) explicit per-tier DCs printed
in a check override the generic tier dials; (h) dark-lamp disadvantage auto-applies only to
Wisdom (Perception); (i) 0 HP transitions are enforced (Ember auto-writes SCARRED; Dark routes to
the burial ending, now location-neutral); (j) the build lint gained an INDEPENDENT second
extractor that fails the build whenever the parser's manifest disagrees with a dumb regex pass
over the raw markdown — the class fix for silently dropped operations.

**v1.4 (2026-08-12, Frank's playtest).** Frank played the Keeper edition into Act Three and returned the pass that produced pillars 11-13. Changes: Dawn Track rebalanced from 34 tick sites to 21 (good-deed and conversation ticks cut; ALL Last Watch ticks cut, since the finale reads the track rather than filling it; a thorough run now enters Last Watch at 9-10 of 12) and the full-track event now routes (rule in "What you track": twelfth box before Last Watch sends you to 315; the engine banners it). Prose clarity pass per pillar 12: the dusk-bell rhythm line (Frank's own wording), Anselm's lock speech, the square-fight tactics renamed chaser/catcher with a proper combat setup and "Roll initiative" on all three fights, the Nell-shields-the-child line, the SHELTERED doors line, "fortnight" replaced with "two weeks" everywhere, and every dawn epilogue line extended with a closing beat. Keeper engine per pillar 13: auto-state language, resolved-only conditionals, first-use teaching, circuit and dawn enforcement, candle icons replacing the red lanterns on the cover.

**v1.3 (2026-08-12, post-QC).** Six findings from the first full QC pass closed in the draft sources. (1) Lamp oil wired for real: the lamp drinks a unit at the cold's arrival (090) and at deep night (310), plus one path spend in each finale route (vigil 441, barred door 460, the ice 480, the walked round 500); Mara sells nothing but hands the watch a spare flask (032, +1 capped at tier start); dark-lamp lines exist and fail forward (400, 480, 500), so oil can run out and the book says what happens. (2) The watch-dog Nell is now noticed by nine entries across all three acts (009, 076, 090, 220, 277, 400, 483, and the dawn), including two mechanical assists, making Appendix B's claim true. (3) THAWED folded into the act structure per the draft's own red-team note. (4) Codeword accounting settled at 12 slots plus two finale-only dawn marks (SCARRED, CARRIED), defined in 4.3. (5) The assembled edition no longer duplicates the primer: the First Watch source's "Before you begin" recap is a standalone-review aid that the assembler strips. (6) The crisis-hub visit count sanctioned as the single tier exception in 5.4.

## 14. Out of scope for v2.0

- The browser-native interactive edition with auto-tracked state (Rung 4): structure must support it, but it does not gate this release.
- The standalone solo toolkit (Rung 2): Appendix A is the teaser, not the product.
- Print-on-demand.
- Any second adventure. One perfect night first.
