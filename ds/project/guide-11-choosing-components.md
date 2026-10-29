# Choosing Components

Which component to reach for, by the job it has to do. Start with the page module that fits the section, then fill it with components. Each component's card has the details.

## Building a page

A page is a stack of page modules, top to bottom. Most pages use this order, leaving out what they don't need: Nav, Hero, LogoCarousel, content sections, proof (Stats, testimonials), CtaModule, Footer.

### Opening the page

| Use | When |
| --- | --- |
| **Hero** | The top of every landing, product and campaign page. Split with media for products, on a photo for brand and event pages, with a form when the page exists to capture a lead. One per page. |
| **TypographicHeader** | Opening a page or a long section with words alone: legal, resource hubs, search results, text-heavy pages. |
| **Breadcrumbs** | Under the Nav on pages two or more levels deep. |

### Explaining the product

| Use | When |
| --- | --- |
| **GeneralContent** | One idea with an image or video beside it. The default content section; alternate media left and right down the page. |
| **CardModule** | Two to eight parallel ideas of equal weight: features, capabilities, benefits. |
| **TabModule** | Three to eight related views of one subject, where people pick the one that applies to them (by role, step or product). |
| **AccordionModule** | Four to twelve items people scan and open one at a time: FAQs, capability lists, specifications. |
| **Stats** | Three or four figures that prove a claim. Usually one Stats section per page, so the numbers keep their weight. |

Choosing between them: if every item deserves to be seen, use cards; if people only need one at a time, use tabs (few, visual) or an accordion (many, text).

### Proof and social proof

| Use | When |
| --- | --- |
| **LogoCarousel** | A strip of customer logos near the top, to say "trusted by". |
| **LogoHierarchy** | Sponsors or partners in tiers, such as an event's partner pavilion. |
| **TestimonialCarousel** | Customer quotes or video stories. Use the video version when you have recordings. |
| **Carousel** | A row of resources, events or blog posts people browse sideways ("Latest Resources"). |

### Comparing

| Use | When |
| --- | --- |
| **FeatureMatrix** | Many features, yes or no for Qualys and each competitor. |
| **DetailComparison** | Fewer topics, where each difference needs a sentence. |
| **MarketingTable** | A short, branded list of statements with the Qualys column featured; for campaign pages rather than detailed comparisons. |

### Closing the page

| Use | When |
| --- | --- |
| **CtaModule** | The last section of almost every page: a form beside an image for sign-ups, or the dark card with buttons when the next step is a link. |
| **InlinePromoCard** | A promotion inside the page (in a card row or between sections), not the page's main call to action. |

## Forms

| Use | When | Where |
| --- | --- | --- |
| **Hero with a form** | The page's whole purpose is the sign-up (free trial, campaign landing page). | Top of the page |
| **CtaModule with a form** | The page informs first, then asks for the sign-up. The most common lead form. | Bottom of the page |
| **Form** on its own | A form inside your own layout: a gated resource page, a contact page, beside other content. | Anywhere in a section |
| **FormModal** | A short form opened by a button, so the page stays in place (download a report, register for a webinar). | Over the page |
| **DemoRequestWizard** | A demo or contact request that needs several groups of questions: split into short steps, ending on a confirmation. | Over the page |
| **ExitIntent** | One last offer with one field as someone leaves. Once per visit, and never over another modal. | Over the page |
| **SearchBar** | Finding content, not capturing leads. | Nav, resource hubs, filter rows |

- Ask for as little as possible: an email address is often enough. Each extra field loses sign-ups.
- One form per page. A page with a lead-form Hero doesn't need one in the CtaModule as well.
- After a form, show **SuccessConfirmation** in its place, rather than sending people to a new page.

## Cards

| Use | When |
| --- | --- |
| **Card** | A feature, capability or benefit: icon, heading, short copy, a link. Usually in a CardModule. |
| **ResourceCard** | A whitepaper, report, datasheet or other download. |
| **BlogCard** | A blog post, with its author and reading time. |
| **EventCard** | An in-person or virtual event with a date. |
| **WebinarCard** | A webinar, with its speakers. |
| **IntegrationCard** | A partner integration in the integrations directory. |
| **StatCard** | One figure with its label; usually inside Stats. |
| **TestimonialCard** | One customer quote; usually inside TestimonialCarousel. |
| **InlinePromoCard** | A promotion for something else on the site, in a dark or blue card. |
| **ProfileCard** | A person: a speaker, an executive, a team member. Several make a ProfileGrid. |

Keep one kind of card per row. Mixing a ResourceCard and a BlogCard in one carousel is fine; mixing a Card with a ResourceCard is not. Cards in a row share one height, with their calls to action lined up along the bottom, and a card's text-link CTA is always blue.

## Buttons and links

| Use | When |
| --- | --- |
| **Button**, primary | The one most important action in a view: "Get a Demo", "Start Free Trial". |
| **Button**, secondary | A second action beside the primary, or the main action inside a card or on mobile. |
| **TextLink** | A lighter action that leads somewhere: "Learn More", "View All Events". Use the download icon for downloads. |
| **Hyperlink** | A link inside a sentence of body copy. Never with an arrow. |
| **SocialButton** | A link to a Qualys social profile. |

## Messages and overlays

| Use | When |
| --- | --- |
| **Toast** | A short confirmation that something happened ("Saved"). It disappears by itself. |
| **NotificationBar** | Something everyone on the site should know: maintenance, a release, an event. One line across the top. |
| **NavBanner** | Promoting one event above the Nav. |
| **SuccessConfirmation** | The result of a form or action, in place of the form. |
| **Modal** | Content that needs focus without leaving the page: a video, a short form, details. |
| **AlertDialog** | A decision that must be answered before going on: delete, leave without saving. |
| **Tooltip** | A short label for an icon or a term, on hover and focus. |
| **HoverCard** | A logo or headshot that needs a line of explanation and a link. |
| **ProfileModal** | A person's full bio, opened from a ProfileCard. |
| **CookieBanner**, **SessionTimeout**, **ExitIntent** | Their own single jobs: consent, signing out, a last offer. |

Interrupt as little as possible: prefer a Toast to a NotificationBar, and a NotificationBar to a Modal.

## Showing more without a longer page

| Use | When |
| --- | --- |
| **Tabs** | Switching between a few views of the same thing, all of equal weight. |
| **Accordion** (Drawer rows) | Many items people open one at a time: FAQs, specifications, legal text. |
| **Accordion** (DrawerCard) | Agendas and session lists, where each item has a time and an action. |
| **Carousel** | More cards than fit in a row, when people are browsing rather than looking for one thing. |

## Filtering lists

| Use | When |
| --- | --- |
| **FilterBar** | A resource or event list with a few filter categories, on desktop. |
| **FilterChipGroup** | One category with a handful of options, shown all at once ("All", "Webinars", "Reports"). |
| **FilterDrawer** | The same filters on mobile, in a panel. |
| **AppliedFilters** | The filters in force, with the number of results, under the search. |
