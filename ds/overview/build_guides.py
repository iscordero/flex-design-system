import base64, json, re, os
man=json.load(open('gimg/manifest.json'))
SRC='../project/'   # current guide text (already carries the breadcrumb edits); read from the pre-visual snapshots in txt/
def img(name, alt):
    assert ']' not in alt and '\n' not in alt and '(' not in alt[-1:], alt
    ext=man[name][0]
    return '![%s](data:image/%s;base64,%s)' % (alt, ext, base64.b64encode(open('gimg/%s.%s'%(name,ext),'rb').read()).decode())
def blocks(md):
    """split into ('h',level,text) ('p',text) ('li',text,[sub]) ('q',[lines])"""
    out=[]; lines=md.split('\n'); i=0
    while i<len(lines):
        l=lines[i]
        if not l.strip(): i+=1; continue
        m=re.match(r'^(#{1,6})\s+(.*)$',l)
        if m: out.append(['h',len(m.group(1)),m.group(2)]); i+=1; continue
        if l.startswith('|'):
            rows=[]
            while i<len(lines) and lines[i].startswith('|'): rows.append(lines[i]); i+=1
            out.append(['p','\n'.join(rows)]); continue
        if l.startswith('- '): out.append(['li',l[2:],[]]); i+=1; continue
        if re.match(r'^\s+- ',l): out[-1][2].append(l.strip()[2:]); i+=1; continue
        if l.startswith('>'):
            q=[]
            while i<len(lines) and lines[i].startswith('>'): q.append(lines[i]); i+=1
            out.append(['q',q]); continue
        out.append(['p',l]); i+=1
    return out
def split_lead(text):
    m=re.match(r'^\*\*(.+?)\*\*\s*(.*)$',text,re.S)
    if m and m.group(1)[-1] in '.:':
        body=m.group(2).strip(); return m.group(1)[:-1], body[:1].upper()+body[1:]
    return None, text
def entry(title, viz, alt, body):
    parts=['### '+title,'']
    if viz: parts+=[img(viz,alt),'']
    parts+=[body,'']
    return parts
def build(fname, plan):
    """plan: function(blocks)->list of lines"""
    md=open('txt/'+fname).read()
    out=plan(blocks(md))
    text='\n'.join(out).rstrip('\n')+'\n'
    open(SRC+fname,'w').write(text)
    return len(text)

# ── specs: per bullet (title or None to take the bold lead, viz id, alt) ──
G1=[(None,'g1-address','Do: The Qualys Cloud Platform gives your team a single source of truth across your environment. Do not: We give users a single source of truth across their environment.'),
    (None,'g1-casing','Three cases: Title Case for the heading Detect, Prioritize, and Eliminate Risk; sentence case for body copy; all caps only for a NEW tag and a CLOUD PLATFORM eyebrow.'),
    (None,'g1-length','A heading marked 50 to 60 characters at most, above one sentence of supporting copy marked one to three sentences, 175 characters at most.'),
    ('CTAs','g1-ctas','Buttons and text links that start with a verb: Get a Demo, Get Started, Register Now, Learn More, Explore the Platform, and Download Report with a download icon. Passive labels such as More Information and Demo Request are marked wrong.'),
    (None,'g1-numbers','Running copy spells the number out, Set up in three steps; a stat uses numerals, 3,847 patched.'),
    (None,'g1-punct','The Oxford comma highlighted in Detect, Prioritize, and Eliminate Risk; an em dash highlighted in One platform, every asset; the same line with a hyphen is marked wrong.'),
    ('Dates and times','g1-dates','Five date formats: long date Mon Dec 9, 2024; short date Dec 9, 2024; date and time Mon Dec 9, 2024 10:00 to 11:00a PST; time range 8:00 AM to 12:00 PM; event card Dec 10, 2026, bullet, 11a PST.'),
    ('No emoji',None,None)]
G2=[(None,'g2-surfaces','Six surfaces stacked like page sections: Warm Off White page background, Ecru and White alternate sections, Polar Blue light blue sections, Qualys Blue sections, Charcoal dark sections and footer.'),
    (None,'g2-text','Five text colors with their tokens: text-primary for headings and body, text-secondary for metadata, text-inverted on charcoal, text-accent-primary in blue for emphasis, text-accent-secondary in red for button text links.'),
    (None,'g2-actions','A primary button in its three colors: Qualys Red by default, Crimson on hover, Pepper when pressed. Below, a blue page link that turns Cobalt on hover, an underlined inline link and a red button text link.'),
    (None,'g2-strokes','Three strokes in use: Ash around a text field, Rhino on a checkbox and a radio, White as the outline of a button on blue.'),
    (None,'g2-icons','An icon in charcoal on a light tile, in white on a dark tile, and a blue feature icon; below, an icon container in its default, hover and pressed blues.'),
    (None,'g2-utility','Four status discs, each an icon on a 10% tint: green success, amber warning, red error, blue info.'),
    (None,'g2-overlays','The same page content under a 25% black overlay and under a 50% black overlay.'),
    (None,'g2-tags','Badges in their eight status tones, from Critical to Accepted Risk, and the blue New badge; the three flag tiers; the markers in the flag colors plus a blue one; the five event types; and a default and a selected filter chip.'),
    (None,'g2-gradient','A promo strip on the blue gradient, lighter blue on the left to darker on the right, with a white heading and a red button.')]
G3=[('Families','g3-families','Wix Madefor Text in bold for display, headings, titles, tags, eyebrows, stats and button labels; IBM Plex Sans in regular for paragraphs, labels and quotes.'),
    ('Display','g3-display','Two display sizes set in bold: display-xl at 64px and display-lg at 56px.'),
    ('Headings','g3-headings','The five heading sizes: h1 44 Bold, h2 38, h3 24, h4 20 and h5 18 SemiBold.'),
    ('Paragraphs','g3-paragraphs','The five paragraph sizes from paragraph-lg 24px down to paragraph-xs 12px.'),
    ('Titles','g3-titles','The three title sizes for names: title-md 20, title-rg 18 and title-sm 16, SemiBold.'),
    ('Tags','g3-tags','Tag styles on real tags: an 18px text tag, a 16px flag, a 14px badge and a 12px small badge.'),
    ('Eyebrows','g3-eyebrows','The five eyebrow sizes in blue: eyebrow-xl 22 in Title Case, then 18, 16, 14 and 12 in uppercase.'),
    ('Letter spacing',None,''),
    ('Weight classes',None,''),
    (None,'g3-weights','Four weights and their uses: Regular 400 for paragraphs, Medium 500 for UI labels and dates, SemiBold 600 for links and buttons, Bold 700 for display and stats.'),
    ('Labels, quotes, stats and button labels','g3-misc','The two stat sizes, 86px and 64px, beside the three quote sizes, 32, 24 and 20px.')]
G4=[(None,'g4-breakpoints','Four ranges on one bar: mobile under 768, tablet 768 to 1023, desktop 1024 to 1439, large desktop from 1440.'),
    ('Page margins and gutter','g4-margins','Three frames with their side margins: 20px on mobile, 36px on tablet, 56px on desktop; and two columns 24px apart.'),
    (None,'g4-content','Two screens. Up to 1440px: the content well fills the screen between the 56px page margins. Wider than 1440px: the content well stops at 1440px and sits in the middle, with a 56px page margin either side.'),
    ('Block modules','g4-modules','Four modules stacked with no gap: Hero, GeneralContent, Stats, CtaModule; each brings its own 48px top and bottom space.'),
    (None,'g4-columns','Four items laid out three ways: four across on desktop, two by two on tablet, one column on mobile.'),
    ('Spacing','g4-spacing','The sixteen spacing steps as bars: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 32, 36, 48, 56 and 100px.'),
    ('Spacing in use','g4-spacing-use','Which steps go where: text and chips 6 to 10, between text blocks 16 to 20, text to buttons 24 to 32, buttons, headers and body 36, between buttons 48, between sections 56 or 100.'),
    (None,'g4-radius','Corner radii as tiles: 16 cards and modals, 12 buttons, 10 inputs and menus, 8 card images, 6 badges, 4 checkboxes, and a flag with only two corners rounded.'),
    (None,'g4-elevation','Six shadow tokens on white tiles: shadow-card, shadow-menu, shadow-tabs, shadow-drawer, shadow-dropdown and shadow-modal.'),
    (None,'g4-layers','The nine layers from top to bottom: toasts 9000, session timeout 8500, alert dialogs 8000, modals 7000, slide-in panels 6000, cookie banner 5500, notification bar 5000, tooltips 4000, overlay 3000.'),
    ('Modals','g4-modals','A modal centered on its overlay, 440 to 600px wide; on a phone it keeps 12px from the edges and its buttons stack full width.')]
G5=[(None,'g5-buttons','A primary button in four states: default, hover, pressed and disabled. A secondary button outlined, filled red on hover, and the alternate filled blue on hover.'),
    (None,'g5-links','A text link by default, on hover with its arrow moved 4px and a darker color, and disabled at 50% opacity.'),
    ('Tabs, menus and list rows','g5-rows','One row in three states: default with no fill, hover with a neutral 5% Charcoal tint, and active on Misty Blue with the blue marker on its left edge.'),
    (None,'g5-cards','A card at rest with only its shadow, and on hover with a 6px blue bar along the bottom and its arrow nudged.'),
    (None,'g5-focus','The focus ring around a button and a checkbox, and a blue border on a focused text field.'),
    (None,'g5-timing','Three durations as bars, 150ms for color, 200ms for buttons, inputs and cards, 300ms for larger moves, beside an ease-in-out curve.'),
    (None,'g5-overlays','How long each layer takes to appear: backdrop 200ms fade, modal 200ms growing from 95%, toast 300ms slide, cookie bar 400ms rise, tooltip 150ms after a 300ms wait.'),
    ('Toasts','g5-toasts','How long toasts stay: success and info 5 seconds, warning 8 seconds, error until dismissed.'),
    ('Carousels','g5-carousel','A row of cards running off the edge, a progress bar and previous and next buttons: it moves one card at a time, only when asked.'),
    (None,'g5-reduced','By default an element slides and fades into place; with reduced motion it simply appears in place.')]
G6A=[('Photography','g6-photo','Two photos of people at work in offices, cool to neutral in tone.'),
     ('Heroes and video banners','g6-heroes','A hero photo under a dark overlay with a white heading and a red button, and a video banner with a white play disc.'),
     ('Aspect ratios','g6-ratios','A 16:9 frame for heroes, card images and media beside copy, and a 9:16 frame for video testimonials.'),
     ('Photo heroes','g6-photoheroes','The two hero photos with the calm area marked where the copy sits: white text on the building photo, charcoal text on the office photo.'),
     ('Customer, partner and sponsor logos','g6-logos','Four neutral placeholders of equal size on white. Do: each company\'s own file on a clear ground at a similar size. Do not: redrawn, recolored or cropped logos.'),
     ('Product images','g6-product','A promo strip on the blue gradient with a white heading, a red button and a transparent product image of a laptop.'),
     ('Form headers','g6-formheader','A wide photo of people shaking hands, cropped 30 to 11, 600 by 220px.'),
     ('People photos','g6-people','A square crop with the face filling 60 to 70%, a circle crop with the face centered, and the default avatar for a missing photo.')]
G6B=[('Drawing and color','g6-icons-custom','The same search icon in charcoal on a light tile, white on a dark tile and blue for interactive use.'),
     ('Utility icons','g6-utility','The 25 utility icons in a grid, from download and arrows to the status icons.'),
     ('Event icons','g6-event','The five event types, each icon beside its label: Qualys Event, Webinar, Industry Event, Speaking Engagement, Training.'),
     ('General icons','g6-general','The three general line icons in white on Charcoal: Events, Webinar, Resource.'),
     ('Social icons','g6-social','The three social icon sizes: 24px in the 52px blue button, 15px in plain rows, 25px in Rhino in the footer.'),
     ('Feature icons','g6-feature','Four two-tone blue feature icons at 56px for cards, and one at 32px beside a drawer title.'),
     ('Link icons','g6-linkicons','Three icons and their meaning: outlink on a link that leaves qualys.com, arrow-right on a link that stays, download on a download button.')]
G6C=[('Color versions','g6-logo-colors','The logo three ways: full color on white, all white on Charcoal, and reversed with a red shield and white wordmark on the blue gradient.'),
     ('The shield','g6-shield','The shield alone in a square tile. Do: use it for square or tight spaces. Do not: redraw, recolor or re-letter the mark.'),
     ('Sizes','g6-logo-size','The logo at 37px high for the Nav, and the shield at 75px wide for the footer.')]
G7=[('Avatars and profile cards','g7-avatars','Three avatar sizes: 40px and 56px circles and the 300px square, here shown smaller.'),
    ('Navigation and footer','g7-nav','The Nav bar: logo, up to six items, utility links, search and one call to action; a breadcrumb trail under it; and the menu button it becomes below 1200px.'),
    ('Block modules','g7-modules','A page as a stack: Nav, Hero, TypographicHeader, GeneralContent, TabModule, CtaModule, Footer. One Hero with the only h1, one primary call to action per module.'),
    ('Stats sections','g7-stats','Three figures in one panel, each a number, a short label and one line of support: 150% Faster Detection, 10x Less Zero-day Threats, 99.99% More Accurate Scanning.'),
    ('Carousels','g7-carousel','Three or fewer cards sit in a grid; four or more go in a carousel with a progress bar and arrows.'),
    ('Logos','g7-logos','LogoCarousel: a moving row of five or more logos with a pause button. LogoHierarchy: logos in three tiers, the largest first.'),
    ('Events calendar','g7-calendar','The three calendar views: a month grid with colored bars, a list grouped by day, and a grid of cards.'),
    ('Modals and dialogs','g7-modals','A modal\'s parts: title and close button, body, and buttons on the right with the primary one last.'),
    ('Hover cards',None,''),
    ('Comparison tables',None,''),
    ('Notifications','g7-notifications','Four ways to tell someone something, from least to most interrupting: tooltip, toast, notification bar, dialog.'),
    ('Cookie consent','g7-cookie','The compact cookie bar leads through Manage Preferences to the panel with a switch per category.'),
    ('Forms','g7-forms','A text field empty, filled with its label floated up, and in error with a red border and message; one primary button below.'),
    ('Filters','g7-filters','The filter cloud as chips with counts, and filter dropdowns with a Reset Filters link.')]

G8=[(None,'g8-tiers','Three tiers: Tier 1 primary, red filled Get a Demo and Download buttons; Tier 2 secondary, red and blue outlined Learn More and Join Waitlist; Tier 3 utility, blue text links Show All and Next.'),
    (None,'g8-case','Do: Try Now and Speak to an Expert in Title Case. Do not: try now and speak to an expert in mixed cases.'),
    (None,'g8-gap','Do: a button pair 8px apart. Do not: the same pair spread far apart.'),
    (None,'g8-length','Do: Sign Up for Access, under 20 characters. Do not: a long lowercase sentence as a label.'),
    (None,'g8-pair','Do: a primary button beside a secondary button. Do not: two primary buttons side by side.'),
    (None,'g8-count','Do: two buttons in a row. Do not: three buttons, two of them primary.'),
    (None,'g8-verbs','Do: View Data Sheet. Do not: Datasheet.'),
    (None,'g8-hierarchy','Two page wireframes: one primary button with outlined Read More buttons below, marked right; every button filled red, marked wrong.'),
    (None,'g8-mobile','Two phones: a form with a full-width Sign Up button for tier 1, and cards with a content-width Load More button for tier 2.'),
    (None,None,None),
    (None,'g8-underline','Do: a blue, SemiBold, underlined link in a paragraph. Do not: the same link in blue with no underline.'),
    (None,'g8-sources','Do: a source URL in blue and underlined. Do not: the URL in bold black.'),
    (None,'g8-inverted','On a blue ground. Do: a white underlined link. Do not: white bold text with no underline.'),
    (None,'g8-urls','Do: a short, clean URL. Do not: a long URL with tracking strings.'),
    (None,'g8-descriptive','Do: the link is on the words Hero Group. Do not: a link on the words click here.'),
    (None,'g8-navlinks','Two lists of links used as navigation; the hovered link shows a blue arrow.'),
    (None,'g8-textlink','Do: a card with a text link button at its foot. Do not: a text link button with its arrow inside a sentence.')]
def simple(spec, keep_tail=True, head_lines=None):
    def plan(bs):
        out=[]; k=0; it=iter(spec)
        for b in bs:
            if b[0]=='h': out+=['#'*b[1]+' '+b[2],'']
            elif b[0]=='p': out+=[b[1],'']
            elif b[0]=='q': out+=b[1]+['']
            elif b[0]=='li':
                title,viz,alt=next(it); lead,body=split_lead(b[1])
                if title is None:
                    assert lead, b[1][:60]; title=lead
                else:
                    if lead is None: body=b[1]
                out+=entry(title,viz,alt,body); k+=1
                if b[2]:
                    title2,viz2,alt2=next(it); out+=entry(title2,viz2,alt2,' '.join(b[2])); k+=1
        assert next(it,None) is None, 'spec left over'
        return out
    return plan

os.makedirs('txt',exist_ok=True)

def plan_g2(bs):
    out=[]; it=iter(G2); contrast=False
    for b in bs:
        if b[0]=='h': out+=['#'*b[1]+' '+b[2],'']
        elif b[0]=='p':
            if b[1].startswith('Contrast notes'):
                contrast=True
                out+=['### Contrast notes','',img('g2-contrast','Six color pairs with their contrast: Qualys Blue on white 3.78 to 1, for 24px and larger; Cobalt 8.9 to 1 and hyperlink 4.69 to 1, fine for small text; white on Qualys Red 4.18 to 1, flagged; success 2.57 to 1 and warning 2.03 to 1, accents only.'),'',b[1],'']
            else: out+=[b[1],'']
        elif b[0]=='li':
            if contrast: out+=['- '+b[1]]
            else:
                title,viz,alt=next(it); lead,body=split_lead(b[1]); assert lead; out+=entry(title or lead,viz,alt,body)
    assert next(it,None) is None
    return out
def plan_g7(bs):
    out=[]; it=iter(G7); sec=None
    for b in bs:
        if b[0]=='h':
            out+=['#'*b[1]+' '+b[2],'']
            if b[1]==2: sec=b[2]; first=True
        elif b[0]=='p':
            out+=[b[1],'']
            if sec=='Components' and first:
                first=False
                out+=[img('g7-levels','Three levels: block modules are full-width page sections, reached for first; patterns combine components for one task; components are the single parts that fill what is left.'),'']
        elif b[0]=='li':
            if sec=='Components':
                out+=['- '+b[1]]; nxt=True
            else:
                title,viz,alt=next(it); lead,body=split_lead(b[1]); assert lead, b[1][:50]; out+=entry(title,viz,alt,body)
    assert next(it,None) is None
    # blank line after the components list
    res=[]
    for i,l in enumerate(out):
        res.append(l)
        if l.startswith('- ') and (i+1>=len(out) or not out[i+1].startswith('- ')): res.append('')
    return res
def fix_lists(lines):
    res=[]
    for i,l in enumerate(lines):
        res.append(l)
        if l.startswith('- ') and (i+1>=len(lines) or not lines[i+1].startswith('- ')) and (i+1<len(lines) and lines[i+1]!=''): res.append('')
    return res

sizes={}
sizes['guide-1-content.md']=build('guide-1-content.md', simple(G1))
sizes['guide-2-color.md']=build('guide-2-color.md', plan_g2)
sizes['guide-3-typography.md']=build('guide-3-typography.md', simple(G3))
sizes['guide-4-layout.md']=build('guide-4-layout.md', simple(G4))
sizes['guide-5-states-motion.md']=build('guide-5-states-motion.md', simple(G5))
sizes['guide-6-imagery-icons-logo.md']=build('guide-6-imagery-icons-logo.md', simple(G6A+G6B+G6C))
sizes['guide-7-patterns-components.md']=build('guide-7-patterns-components.md', plan_g7)
sizes['guide-8-buttons-links.md']=build('guide-8-buttons-links.md', simple(G8))
print(sizes, sum(sizes.values()))
used=set(re.findall(r'gimg/(g\d-[a-z-]+)', open(__file__).read()))
