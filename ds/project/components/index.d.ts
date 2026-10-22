import type * as React from 'react';

/** Names in the Qualys utility icon set. download and the arrows come from the Figma Buttons sheet; chevrons, check and search from the Inputs sheet; event-* from the Tagging System (24px, colored by EventType); time and general-* from the Cards page (general-* are 56 x 43: size sets the height). */
export type IconName = 'download' | 'arrow-right' | 'arrow-left' | 'outlink' | 'search' | 'check' | 'filter' | 'menu' | 'time' | 'general-events' | 'general-webinar' | 'general-resource' | 'social-linkedin' | 'social-x' | 'social-facebook' | 'social-instagram' | 'social-vimeo' | 'social-youtube' | 'social-url' | 'event-qualys' | 'event-webinar' | 'event-industry' | 'event-speaking' | 'event-training' | 'chevron-right' | 'chevron-left' | 'chevron-up' | 'chevron-down' | 'plus' | 'cross' | 'view-list' | 'view-month' | 'view-grid' | 'alert-triangle' | 'alert-circle' | 'check-circle' | 'x-circle' | 'file' | 'party' | 'cookie';

/** A Hugeicons drawing as exported by @hugeicons/core-free-icons, e.g. `import { Alert01Icon } from '@hugeicons/core-free-icons'`. */
export type HugeiconData = ReadonlyArray<readonly [string, Record<string, string | number>]>;
/** Preset icon sizes: xs 12px (1px stroke), sm 16px (1.25px), md 20px (1.5px), lg 24px (1.5px), xl 32px (2px). */
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export interface IconProps {
  /** a Qualys utility icon, or a bundled Hugeicon as "hi:<name>" (e.g. "hi:alert-01", "hi:arrow-right-01"); see Icon.hugeicons */
  name?: IconName | `hi:${string}`;
  /** any Hugeicons free icon, passed as its data (instead of `name`) */
  icon?: HugeiconData;
  /** a preset (xs–xl, recommended: sets the stroke weight too) or px; default 16 */
  size?: IconSize | number;
  /** approved colors: black (icon-default), blue (icon-feature), white (icon-inverted); default: the surrounding text color */
  tone?: 'black' | 'blue' | 'white';
  /** stroke icons: override the preset's stroke weight (px) */
  strokeWidth?: number;
  /** accessible name; omit for decorative icons */
  title?: string;
  className?: string;
}
export declare const Icon: ((props: IconProps) => React.ReactElement | null) & { /** the bundled Hugeicons sets: [set name, names] */ hugeicons: Array<[string, string[]]> };

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Figma: Primary, Primary inverted, Secondary, Secondary alt, Secondary inverted */
  variant?: 'primary' | 'primary-inverted' | 'secondary' | 'secondary-alt' | 'secondary-inverted';
  /** lg = 50px tall (default), sm = 40px */
  size?: 'lg' | 'sm';
  /** renders an <a> when set */
  href?: string;
  /** e.g. 'download' */
  iconLeft?: IconName | React.ReactNode;
  /** e.g. 'arrow-right' */
  iconRight?: IconName | React.ReactNode;
  disabled?: boolean;
  children?: React.ReactNode;
}
export declare function Button(props: ButtonProps): React.ReactElement;

export interface TextLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** red / blue / inverted text, or neutral (charcoal text with a blue arrow) */
  tone?: 'red' | 'blue' | 'neutral' | 'inverted';
  /** rg = 16px (default), sm = 14px */
  size?: 'rg' | 'sm';
  /** trailing arrow that nudges forward on hover */
  arrow?: boolean;
  /** an icon before the label: an icon name or your own node, 16px */
  iconLeft?: IconName | React.ReactNode;
  /** renders an <a> when set, else a <button> */
  href?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}
export declare function TextLink(props: TextLinkProps): React.ReactElement;

export interface HyperlinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** @deprecated ignored: links in body copy never show an arrow (use TextLink for a link with an arrow) */
  arrow?: boolean | 'always';
  /** 50% opacity, out of the tab order, announced as unavailable */
  disabled?: boolean;
  /** 'inverted': white, for dark or blue grounds; still underlined (default: blue) */
  tone?: 'default' | 'inverted';
  children?: React.ReactNode;
}
export declare function Hyperlink(props: HyperlinkProps): React.ReactElement;

/** Badge tones, named for the status they carry; 'blue' is the default brand badge (New, Privately Disclosed). */
export type TagStatusTone = 'critical' | 'high' | 'medium' | 'low' | 'informational' | 'fixed' | 'accepted-risk' | 'blue';
/** @deprecated color names, kept as aliases: dark-red = critical, red = high, orange = medium, yellow = low, purple = informational, green = fixed, gray, slate and dark = accepted-risk (the one gray) */
export type TagColorTone = 'purple' | 'dark-red' | 'red' | 'green' | 'orange' | 'yellow' | 'gray' | 'grey' | 'slate' | 'dark';
export type TagTone = TagStatusTone | TagColorTone;
export interface TagProps {
  /** badge styles for status: 'fill' (default), 'light' (15% tint), 'outline'; 'text' = text-style tag for categories (18px Medium, blue, no fill);
      'label' = 16px Regular descriptor; 'eyebrow' = 12px SemiBold capitals */
  variant?: 'fill' | 'light' | 'outline' | 'text' | 'label' | 'eyebrow';
  /** badge color, default 'blue' (ignored by 'text') */
  tone?: TagTone;
  /** badge size: 'rg' = 14px Bold, 26px tall (default); 'sm' = 12px Bold, 25px tall */
  size?: 'rg' | 'sm';
  /** text, label and eyebrow styles: renders a link */
  href?: string;
  className?: string;
  children?: React.ReactNode;
}
export declare function Tag(props: TagProps): React.ReactElement;

export interface FilterChipProps {
  /** selected state (blue tint) */
  active?: boolean;
  /** shown after the label in brackets, e.g. 320 → "(320)"; numbers over 999 show as "1k+" */
  count?: number | string;
  /** 'lg' = 45px (the filter cloud); 'rg' = 36px, 16px text (default); 'sm' = 30px, 14px */
  size?: 'lg' | 'rg' | 'sm';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** when set, a selected chip shows a remove (cross) button; with `removable`, called by the cross */
  onRemove?: () => void;
  /** an applied filter: a gray chip that isn't a toggle, with a cross button */
  removable?: boolean;
  /** start of the cross button's accessible name, default "Remove" */
  removeLabel?: string;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}
export declare function FilterChip(props: FilterChipProps): React.ReactElement;

export interface FlagProps {
  /** 'tier-1' (default) | 'tier-2' | 'tier-3' */
  tone?: 'tier-1' | 'tier-2' | 'tier-3';
  /** 'lg' = 32px tall, 16px Medium (default); 'sm' = 26px tall, 14px SemiBold */
  size?: 'lg' | 'sm';
  className?: string;
  children?: React.ReactNode;
}
export declare function Flag(props: FlagProps): React.ReactElement;

export interface MarkerProps {
  /** color 1 (the default), 2 or 3 (the flag tiers), or 'default' (marker-default, Qualys Blue, for an active item); 'blue' is the old name for 'default' */
  tone?: 1 | 2 | 3 | 'default' | 'blue';
  /** when set, the bar opens into a pill showing this number */
  count?: number | string;
  /** accessible text, e.g. "88 unread"; omit when decorative */
  label?: string;
  /** the edge it sits on: 'left' (default) rounds the right corners, 'right' the left ones */
  side?: 'left' | 'right';
  className?: string;
  style?: React.CSSProperties;
}
export declare function Marker(props: MarkerProps): React.ReactElement;

export interface EventTypeProps {
  type: 'qualys' | 'webinar' | 'industry' | 'speaking' | 'training';
  /** overrides the default label ("Qualys Event", "Webinar", "Industry Event", "Speaking Engagement", "Training") */
  children?: React.ReactNode;
  className?: string;
}
export declare function EventType(props: EventTypeProps): React.ReactElement;

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  /** shown as the placeholder until the field is focused or filled, then floats up as the small label */
  label?: string;
  /** 'float' (default) or 'static' — the small label always showing */
  labelMode?: 'float' | 'static';
  /** error message under the field; turns the stroke Qualys Red */
  error?: string;
  hint?: string;
  value?: string;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}
export declare function TextField(props: TextFieldProps): React.ReactElement;

export interface SelectProps {
  label?: string;
  labelMode?: 'float' | 'static';
  options: Array<string | { value: string; label: string }>;
  value?: string | null;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** shown under the raised label while nothing is chosen; default "Select" */
  placeholder?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  defaultOpen?: boolean;
  /** posts the chosen value with a form */
  name?: string;
  id?: string;
  className?: string;
}
export declare function Select(props: SelectProps): React.ReactElement;

export interface FilterDropdownProps {
  label: string;
  options: Array<string | { value: string; label: string }>;
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  /** first row that checks or clears every option; default "All", null to hide */
  allLabel?: string | null;
  /** one choice only: rows are radios and there is no "All" row */
  single?: boolean;
  defaultOpen?: boolean;
  id?: string;
  className?: string;
}
export declare function FilterDropdown(props: FilterDropdownProps): React.ReactElement;

/** Filters (Figma: Filters). */
export interface FilterOption { value: string; label: string; /** number of results; 0 disables a chip */ count?: number; disabled?: boolean }
export interface FilterChipGroupProps {
  options: Array<string | FilterOption>;
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  /** chip size, default 'lg' (45px) */
  size?: 'lg' | 'rg' | 'sm';
  /** accessible name of the group, default "Filters" */
  label?: string;
  className?: string;
}
export declare function FilterChipGroup(props: FilterChipGroupProps): React.ReactElement;

export interface AppliedFiltersProps {
  /** the filters in force */
  items: Array<string | { value: string; label: string }>;
  onRemove?: (value: string) => void;
  /** show this many chips, then a "+N more" chip */
  max?: number;
  /** called by the "+N more" chip; usually opens the filter drawer */
  onMore?: () => void;
  /** a number ("640 results") or your own text */
  results?: number | string;
  /** shows a "Clear all" link after the chips */
  onClearAll?: () => void;
  clearLabel?: string;
  /** accessible name of the chip group, default "Applied filters" */
  label?: string;
  className?: string;
}
export declare function AppliedFilters(props: AppliedFiltersProps): React.ReactElement | null;

export interface FilterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { /** default "Filter" */ label?: string }
export declare function FilterButton(props: FilterButtonProps): React.ReactElement;

export type FilterValue = { [id: string]: string[] };
export interface FilterSection {
  id: string;
  title: string;
  options: Array<string | { value: string; label: string; count?: number }>;
  /** show this many options, the rest behind "N more" */
  limit?: number;
  /** one choice only: radios */
  single?: boolean;
}
export interface FilterDrawerProps {
  open?: boolean;
  onClose?: () => void;
  sections: FilterSection[];
  /** the filters in force; the panel starts from these each time it opens */
  value?: FilterValue;
  /** called with every section's selection when "Apply Filters" is pressed */
  onApply?: (value: FilterValue) => void;
  onReset?: () => void;
  /** 'divided' (default): ruled rows with counts and "Clear all". 'plain': larger checkboxes, "Reset Filters" in the footer */
  variant?: 'divided' | 'plain';
  /** "Clear all" in each section header; default on for 'divided' */
  sectionClear?: boolean;
  /** "Reset Filters" in the footer; default on for 'plain' */
  reset?: boolean;
  /** accessible name of the dialog, default "Filters" */
  title?: string;
  applyLabel?: string;
  resetLabel?: string;
  clearLabel?: string;
  lessLabel?: string;
  closeLabel?: string;
  /** show the panel in the page flow, with no backdrop */
  inline?: boolean;
  id?: string;
  className?: string;
}
export declare function FilterDrawer(props: FilterDrawerProps): React.ReactElement | null;

export interface FilterBarFilter { id: string; label: string; options: Array<string | { value: string; label: string }>; single?: boolean; allLabel?: string | null; defaultOpen?: boolean }
export interface FilterBarProps {
  /** five at most */
  filters: FilterBarFilter[];
  value?: FilterValue;
  defaultValue?: FilterValue;
  onChange?: (value: FilterValue) => void;
  /** 'auto' (default) follows the screen width; 'desktop' or 'mobile' forces one layout */
  layout?: 'auto' | 'desktop' | 'mobile';
  /** default "Reset Filters" */
  resetLabel?: string;
  /** default "Apply Filters" */
  applyLabel?: string;
  /** the single mobile control, default "Filter" */
  mobileLabel?: string;
  closeLabel?: string;
  className?: string;
}
export declare function FilterBar(props: FilterBarProps): React.ReactElement;

export interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** 'line' (default) or 'contained' */
  variant?: 'line' | 'contained';
  /** accessible name if different from the placeholder */
  label?: string;
  /** show the 16px search icon before the text (off for now) */
  icon?: boolean;
}
export declare function SearchBar(props: SearchBarProps): React.ReactElement;

export interface ChoiceProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> { label?: React.ReactNode; children?: React.ReactNode }
/** `size="sm"` gives a 16px box (filter drawer rows); default 20px. */
export declare function Checkbox(props: ChoiceProps & { size?: 'rg' | 'sm' }): React.ReactElement;
export declare function Radio(props: ChoiceProps): React.ReactElement;
/** A switch: checked / defaultChecked / onChange as on a checkbox. */
export declare function Toggle(props: ChoiceProps): React.ReactElement;

export interface TabItem { /** stable key; defaults to the index */ id?: string; /** one or two words */ label: React.ReactNode; /** shown below the bar while this tab is active */ content?: React.ReactNode }
export interface TabsProps {
  /** 3 to 6 tabs */
  items: TabItem[];
  /** accessible name for the tab list */
  label?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (id: string, index: number) => void;
  /** opens the next tab by itself: true = every 6 seconds, or a time in ms (3000 at least). Waits on hover and focus, stops once the reader picks a tab, off under reduced motion */
  autoplay?: boolean | number;
  /** names of the pause/play button, default "Pause the tabs" / "Play the tabs" */
  pauseLabel?: string;
  playLabel?: string;
  id?: string;
  className?: string;
}
export declare function Tabs(props: TabsProps): React.ReactElement;

export interface DrawerProps {
  /** the row's title, Title Case */
  title: React.ReactNode;
  /** optional feature icon: a URL (shown at 32px) or a node */
  icon?: string | React.ReactNode;
  /** optional call to action under the body: a small Button or a TextLink */
  cta?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onToggle?: (open: boolean) => void;
  /** heading level of the title, default 3 */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  /** the open row can't be closed (Accordion sets this with collapsible={false}) */
  locked?: boolean;
  /** 'auto' (default) follows the screen width; 'mobile' forces the phone layout at any width (documentation, narrow embeds) */
  layout?: 'auto' | 'mobile';
  id?: string;
  className?: string;
  /** body copy shown when open */
  children?: React.ReactNode;
}
export declare function Drawer(props: DrawerProps): React.ReactElement;

export interface DrawerSpeaker { name: string; designation?: string; company?: string; /** company logo for the profile hover card */ logo?: string; logoAlt?: string; /** headshot URL; a placeholder shows without one */ image?: string; /** LinkedIn profile, drawn as the social icon in the profile hover card */ link?: { href: string; label?: string } }
export interface DrawerCardProps {
  /** overline above the title, e.g. "Noon – 12:45 PM" */
  time?: React.ReactNode;
  /** up to 180 characters; clamps at two lines */
  title: React.ReactNode;
  /** zero or more profiles; the layout adapts to the count */
  speakers?: DrawerSpeaker[];
  /** 'auto' (default) follows the screen width; 'mobile' forces the phone layout at any width (documentation, narrow embeds) */
  layout?: 'auto' | 'mobile';
  /** accessible name for the profile list, default "Speakers" */
  speakersLabel?: string;
  /** optional call to action, usually a secondary Button ("Register") */
  cta?: React.ReactNode;
  /** 'always' (default) or 'open-only': the closed card leaves the button out */
  ctaVisibility?: 'always' | 'open-only';
  /** 'always' (default) or 'open-only': the closed card leaves the speakers out */
  speakerVisibility?: 'always' | 'open-only';
  /** every headshot opens a profile HoverCard */
  profileCards?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onToggle?: (open: boolean) => void;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  /** the open card can't be closed (Accordion sets this with collapsible={false}) */
  locked?: boolean;
  id?: string;
  className?: string;
  /** body copy shown when open, under 500 characters */
  children?: React.ReactNode;
}
export declare function DrawerCard(props: DrawerCardProps): React.ReactElement;

export interface AccordionItem {
  /** stable key; defaults to the index */
  id?: string;
  title: React.ReactNode;
  /** body shown when open */
  content?: React.ReactNode;
  cta?: React.ReactNode;
  /** standard only: feature icon URL or node — give every item one, or none */
  icon?: string | React.ReactNode;
  /** cards only */
  time?: React.ReactNode;
  /** cards only */
  speakers?: DrawerSpeaker[];
}
export interface AccordionProps {
  /** 4 to 12 drawers */
  items: AccordionItem[];
  /** 'standard' = ruled Drawer rows (default); 'cards' = DrawerCards 16px apart */
  variant?: 'standard' | 'cards';
  /** item id or index (or a list) to start open; default all closed */
  defaultOpen?: string | number | Array<string | number>;
  /** let several sections stay open; default one at a time */
  multiple?: boolean;
  /** false keeps one item open: the open item can't be closed, only swapped. Default true */
  collapsible?: boolean;
  /** receives the ids of the open items */
  onChange?: (open: string[]) => void;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  /** cards only: accessible name for each profile list */
  speakersLabel?: string;
  /** 'auto' (default) follows the screen width; 'mobile' forces the phone layout of every row at any width (documentation, narrow embeds) */
  layout?: 'auto' | 'mobile';
  className?: string;
}
export declare function Accordion(props: AccordionProps): React.ReactElement;

/** Shared by every card: href makes the whole card one link. */
export interface CardLinkProps {
  href?: string;
  /** opens in a new tab */
  external?: boolean;
  /** heading level of the title, default 3 */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

export interface CardProps extends CardLinkProps {
  /** Title Case, at most 60 characters */
  title: React.ReactNode;
  /** at most 120 characters */
  description?: React.ReactNode;
  /** feature icon: a URL (shown at 56px) or a node */
  icon?: string | React.ReactNode;
  /** uppercase overline above the heading */
  eyebrow?: string;
  /** blue category above the heading; used when there is no eyebrow */
  tagName?: string;
  /** light blue small badges under the copy */
  tags?: string[];
  /** one fill badge; replaces tags, and moves to the top when there is no icon */
  badge?: string;
  /** text-link label, e.g. "Learn More" */
  cta?: string;
}
export declare function Card(props: CardProps): React.ReactElement;

export interface IntegrationCardProps extends CardLinkProps {
  name: string;
  /** square thumbnail URL, shown at 56px */
  image?: string;
  /** wide logo URL, shown at 37px tall; replaces the thumbnail and name */
  logo?: string;
  type?: React.ReactNode;
  worksWith?: string[];
  /** how many "works with" tags show before "+N", default 2 */
  maxTags?: number;
  dataFetched?: React.ReactNode;
  category?: React.ReactNode;
  /** rename the four labels */
  labels?: { type?: string; worksWith?: string; dataFetched?: string; category?: string };
}
export declare function IntegrationCard(props: IntegrationCardProps): React.ReactElement;

/** Shared by the Event, Webinar, Resource and Blog cards. */
export interface ContentCardBase extends CardLinkProps {
  title: React.ReactNode;
  /** 16:9 image URL */
  image?: string;
  imageAlt?: string;
  /** Flag text on the image's top left corner */
  flag?: string;
  flagTone?: 'tier-1' | 'tier-2' | 'tier-3';
}
export interface CardPerson { name: string; company?: string; /** headshot URL; a placeholder shows without one */ image?: string }

export interface EventCardProps extends ContentCardBase {
  /** the event type, e.g. "Qualys Event" */
  category?: string;
  /** e.g. "Conference" */
  format?: string;
  /** "Dec 10, 2026 • 11a PST" */
  date?: string;
  /** 'featured' = full width, image left, from 1024px */
  layout?: 'default' | 'featured';
  /** featured only */
  description?: React.ReactNode;
}
export declare function EventCard(props: EventCardProps): React.ReactElement;

export interface WebinarCardProps extends ContentCardBase {
  /** default "Webinar" */
  category?: string;
  /** e.g. "Episode" */
  format?: string;
  /** e.g. "13 min" */
  duration?: string;
  speakers?: CardPerson[];
  /** accessible name for the speaker group, default "Speakers" */
  speakersLabel?: string;
  /** "Tue Dec 10, 2026" */
  date?: string;
  layout?: 'default' | 'featured';
  /** featured only */
  description?: React.ReactNode;
}
export declare function WebinarCard(props: WebinarCardProps): React.ReactElement;

export interface ResourceCardProps extends ContentCardBase {
  /** e.g. "Whitepaper" */
  resourceType?: string;
  /** 'link' = date and outlink icon (default); 'download' = download text link; 'cta' = text link with an arrow */
  action?: 'link' | 'download' | 'cta';
  /** link action: "Dec 10, 2026" */
  date?: string;
  /** download or cta action: the label */
  cta?: string;
  /** cta action only */
  description?: React.ReactNode;
}
export declare function ResourceCard(props: ResourceCardProps): React.ReactElement;

export interface BlogCardProps extends ContentCardBase {
  /** default "Blog" */
  category?: string;
  /** reading time, e.g. "13 min" */
  duration?: string;
  description?: React.ReactNode;
  author?: CardPerson;
  layout?: 'default' | 'featured';
}
export declare function BlogCard(props: BlogCardProps): React.ReactElement;

export interface StatItem {
  /** the number, already formatted: "150", "99.99" */
  value: React.ReactNode;
  /** small text after the number: "%", "x" */
  suffix?: React.ReactNode;
  /** small text before the number: "#" */
  prefix?: React.ReactNode;
  label?: React.ReactNode;
  description?: React.ReactNode;
  /** a Feature Icon address, or a node */
  icon?: string | React.ReactNode;
  /** false stops the number counting up from 0 when it scrolls into view */
  countUp?: boolean;
}
export interface StatCardProps extends StatItem {
  /** 'solid' = qualys-blue with white figures (default); 'outline' = blue outline and figures */
  tone?: 'solid' | 'outline';
  /** lg = stat-lg 86px (three in a row), md = stat-md 64px (four in a row) */
  size?: 'lg' | 'md';
  className?: string;
}
export declare function StatCard(props: StatCardProps): React.ReactElement;

export interface StatsProps {
  items: StatItem[];
  /** 'block' = one panel (default); 'cards' = separate StatCards */
  layout?: 'block' | 'cards';
  tone?: 'solid' | 'outline';
  /** default: lg for up to three items, md for four */
  size?: 'lg' | 'md';
  /** false stops every figure counting up from 0; default true */
  countUp?: boolean;
  /** accessible name of the section */
  label?: string;
  id?: string;
  className?: string;
}
export declare function Stats(props: StatsProps): React.ReactElement;

export interface CardModuleProps {
  /** the cards: Card props, usually icon, title, description and cta */
  items: CardProps[];
  eyebrow?: string;
  title?: React.ReactNode;
  body?: React.ReactNode;
  actions?: React.ReactNode;
  /** cards per row on desktop; default 1–4 by count, 3 for six, 4 for eight */
  columns?: 1 | 2 | 3 | 4;
  /** 'left' (default) or 'center' for the copy block (and a single card) */
  align?: 'left' | 'center';
  /** heading level of the module title (default 2); card titles sit one below it */
  titleLevel?: 2 | 3 | 4;
  /** accessible name when there is no title */
  label?: string;
  id?: string;
  className?: string;
}
export declare function CardModule(props: CardModuleProps): React.ReactElement;

export interface InlinePromoCardProps {
  /** 'light' = the blue gradient (default); 'dark' = Charcoal */
  color?: 'light' | 'dark';
  /** 'vertical' (default), 'horizontal' (wide) or 'banner'; wide and banner stack on mobile */
  layout?: 'vertical' | 'horizontal' | 'banner';
  title: React.ReactNode;
  description?: React.ReactNode;
  /** the reversed Qualys logo URL; not shown on the banner */
  logo?: string;
  logoAlt?: string;
  /** product image URL */
  image?: string;
  imageAlt?: string;
  /** vertical only: a general icon name, an image URL or a node */
  icon?: 'general-events' | 'general-webinar' | 'general-resource' | string | React.ReactNode;
  /** the call-to-action label */
  cta?: string;
  /** 'primary' (default; banner defaults to 'tertiary') */
  button?: 'primary' | 'tertiary';
  href?: string;
  /** default 2 */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}
export declare function InlinePromoCard(props: InlinePromoCardProps): React.ReactElement;

/** Social buttons (Figma: Social). */
export type SocialNetwork = 'linkedin' | 'x' | 'facebook' | 'instagram' | 'vimeo' | 'youtube' | 'url';
export interface SocialButtonProps {
  /** which glyph to show; defaults to "url" */
  network?: SocialNetwork;
  /** with an href it renders a link (new tab by default); without one, a button */
  href?: string;
  /** accessible name; defaults to the network name ("LinkedIn", "Website") */
  label?: string;
  /** "button" (default): 52px blue button. "plain": the 15px glyph alone */
  variant?: 'button' | 'plain';
  /** button only: 'md' (default) 52px, or 'sm' 36px with a 20px glyph and `radius-sm` (the profile card) */
  size?: 'sm' | 'md';
  /** an official icon (URL or element) for a network that isn't in the library */
  icon?: string | React.ReactNode;
  /** set false to open in the same tab */
  newTab?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}
export declare function SocialButton(props: SocialButtonProps): React.ReactElement;

/** Avatars (Figma: Avatars). */
export interface AvatarProps {
  /** photo URL; the default silhouette shows without one or if it fails to load */
  image?: string;
  /** "sm" 40px circle (default), "md" 56px circle, "lg" 300px square */
  size?: 'sm' | 'md' | 'lg';
  /** the person's name, when the avatar stands alone; leave out when the name is written beside it */
  alt?: string;
  className?: string;
}
export declare function Avatar(props: AvatarProps): React.ReactElement;

export interface ProfileLink {
  href: string;
  /** which glyph the chip shows; defaults to "linkedin" */
  network?: SocialNetwork;
  /** accessible name; defaults to "{name} on {network}" */
  label?: string;
  /** an official icon (URL or element) for a network that isn't in the library */
  icon?: string | React.ReactNode;
}
export interface ProfileBase {
  name: string;
  /** job title, e.g. "President and CEO" */
  designation?: string;
  /** photo URL, cropped square with the face at 60 to 70% of the frame */
  image?: string;
  imageAlt?: string;
  /** company logo URL, shown 40px tall */
  logo?: string;
  logoAlt?: string;
  /** the blue chip on the photo's top right corner; opens in a new tab */
  link?: ProfileLink;
}
export interface ProfileCardProps extends ProfileBase {
  /** makes the card interactive: hover or focus shows "Read Bio", click calls this */
  onOpen?: () => void;
  /** defaults to "Read Bio" */
  bioLabel?: string;
  /** no card ground or padding; used inside the combined container */
  bare?: boolean;
  className?: string;
}
export declare function ProfileCard(props: ProfileCardProps): React.ReactElement;

export interface ProfileSocialLink { href: string; network?: SocialNetwork; /** accessible name, or the visible text when there is no network or icon */ label?: string; icon?: string | React.ReactNode }
export interface ProfileModalProps extends ProfileBase {
  open?: boolean;
  onClose?: () => void;
  /** social links shown bottom right of the bio, as plain SocialButtons */
  links?: ProfileSocialLink[];
  /** defaults to "About" */
  aboutLabel?: string;
  /** defaults to "Close" */
  closeLabel?: string;
  /** heading level of the name, defaults to 2 */
  headingLevel?: number;
  /** show the panel in the page flow, with no backdrop or close button */
  inline?: boolean;
  id?: string;
  className?: string;
  /** the bio: a string or paragraphs */
  children?: React.ReactNode;
}
export declare function ProfileModal(props: ProfileModalProps): React.ReactElement | null;

export interface ProfileItem extends ProfileBase {
  id?: string;
  /** with a bio the card opens a modal; without one it is not interactive */
  bio?: React.ReactNode;
  links?: ProfileSocialLink[];
}
export interface ProfileGridProps {
  items: ProfileItem[];
  /** "featured" (default): 200px profiles, up to 5 in a row. "keynote": 384px profiles with larger text, up to 3 in a row. Rows are centered and never leave one profile alone */
  size?: 'featured' | 'keynote';
  /** the most profiles in a row: up to 5 for featured, 3 for keynote */
  maxPerRow?: number;
  bioLabel?: string;
  aboutLabel?: string;
  closeLabel?: string;
  className?: string;
}
export declare function ProfileGrid(props: ProfileGridProps): React.ReactElement;

/** Navigation (Figma: Navigation). */
export interface NavLink { label: string; href?: string; /** true shows a "New" tag; a string sets its wording */ badge?: boolean | string }
export interface NavGroup { title: string; href?: string; badge?: boolean | string; links: Array<string | NavLink> }
export interface NavMegaMenu {
  /** the block at the top of the rail */
  overview?: { eyebrow?: string; title: string; description?: string; href?: string };
  /** eyebrow over the filter list, default "Capabilities" */
  railLabel?: string;
  /** first row of the filter list, default "All" */
  allLabel?: string;
  /** eyebrow over the groups, e.g. "Platform Apps" */
  groupsLabel?: string;
  /** columns of groups: 3 (default) or 2 */
  groupColumns?: 2 | 3;
  groups: NavGroup[];
}
export interface NavColumnsMenu { columns: Array<{ title?: string; links: Array<string | NavLink> }> }
export interface NavItem {
  label: string;
  href?: string;
  /** marks this item as the current section (the blue bar) */
  current?: boolean;
  badge?: boolean | string;
  /** a mega menu (with `groups`) or a column dropdown (with `columns`) */
  menu?: NavMegaMenu | NavColumnsMenu;
  /** older shape: a flat list of links, shown as one column */
  items?: Array<string | NavLink>;
}
export interface NavProps {
  logoSrc?: string;
  logoAlt?: string;
  logoHref?: string;
  /** site name beside the logo, e.g. "COMMUNITY" */
  label?: string;
  items?: NavItem[];
  /** label of the current item; or set `current` on the item */
  current?: string;
  /** links on the right: "Community", "Login", "Contact Us" */
  /** utility links; `collapse: true` hides one when the desktop bar is narrow (below 1366px), e.g. Community and Contact Us */
  utility?: Array<string | (NavLink & { collapse?: boolean })>;
  /** true shows the search icon (and the search field in the mobile menu) */
  /** without href or onClick, the icon opens a search panel under the bar: a contained SearchBar (focused) and optional suggested searches */
  search?: boolean | { href?: string; label?: string; placeholder?: string; onClick?: () => void; onSearch?: (query: string) => void; suggestions?: Array<string | NavLink>; suggestionsLabel?: string };
  /** the one call to action: a small primary Button, full width in the mobile menu */
  cta?: { label: string; href?: string; onClick?: () => void };
  /** custom right-hand buttons instead of `cta` */
  actions?: React.ReactNode;
  /** 'center' centers the items in the space beside the logo (Community) */
  align?: 'start' | 'center';
  /** false makes menus open on click only; default opens on hover too */
  hover?: boolean;
  /** 'auto' (default) switches at 1200px; 'desktop' or 'mobile' forces one layout */
  layout?: 'auto' | 'desktop' | 'mobile';
  /** index of the item whose menu starts open */
  /** which menu starts open: an item's index, or 'search' for the search panel */
  defaultOpen?: number | 'search';
  /** documentation: show the mobile menu in the page flow, optionally at a level ([item] or [item, 'all' | group]) */
  inlinePanel?: boolean;
  defaultPath?: Array<number | 'all'>;
  defaultMobileOpen?: boolean;
  navLabel?: string;
  menuLabel?: string;
  closeLabel?: string;
  id?: string;
  className?: string;
}
export declare function Nav(props: NavProps): React.ReactElement;

export interface NavBannerProps {
  title: React.ReactNode;
  /** date and place, shown after the title separated by "|" */
  meta?: string[];
  cta?: { label: string; href?: string; onClick?: () => void };
  /** false hides the close button */
  dismissible?: boolean;
  onClose?: () => void;
  /** accessible name of the region, default "Announcement" */
  label?: string;
  closeLabel?: string;
  className?: string;
}
export declare function NavBanner(props: NavBannerProps): React.ReactElement | null;

export interface MediaProps {
  /** image address; with a video it is the poster */
  src?: string;
  alt?: string;
  /** a video file address, or true to show the play button and handle onPlay yourself */
  video?: string | boolean;
  poster?: string;
  /** called when play is pressed; call event.preventDefault() to stop the inline player */
  onPlay?: (event: React.MouseEvent) => void;
  /** accessible name of the play button, default "Play video" */
  playLabel?: string;
  /** CSS aspect-ratio, for example "16 / 9" */
  ratio?: string | number;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}
export declare function Media(props: MediaProps): React.ReactElement;

/** the copy every page module takes */
export interface ModuleCopy {
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  /** heading level; the default depends on the module */
  titleLevel?: number;
  body?: React.ReactNode;
  /** Buttons and TextLinks */
  actions?: React.ReactNode;
}

export interface HeroBackground {
  /** the photo, or the poster of a background video */
  src?: string;
  alt?: string;
  /** a video file address; it plays silent and looped */
  video?: string | boolean;
  /** 'dark' (default): black 50% under white copy. 'light': white 25% under dark copy */
  tone?: 'dark' | 'light';
  /** a 1140px card instead of edge to edge; default for centered heroes and videos */
  contained?: boolean;
}
export interface HeroProps extends ModuleCopy {
  /** default: 'form' with form, 'split' with media, else 'left' */
  layout?: 'split' | 'left' | 'center' | 'form';
  /** 'lg' is Impact (64px heading, default), 'rg' is Standard (56px) */
  size?: 'lg' | 'rg';
  /** split: the image or video beside the copy */
  media?: MediaProps | string | React.ReactElement;
  /** puts the copy over a photo or video */
  background?: HeroBackground | string;
  /** lead form hero: Form props, or your own form */
  form?: FormProps | React.ReactElement;
  /** lead form hero: a decorative graphic behind the form (an image address or a node) */
  visual?: string | React.ReactNode;
  /** older name for body */
  subtitle?: React.ReactNode;
  id?: string;
  className?: string;
}
export declare function Hero(props: HeroProps): React.ReactElement;

export interface TypographicHeaderProps extends ModuleCopy {
  align?: 'left' | 'center';
  id?: string;
  className?: string;
}
export declare function TypographicHeader(props: TypographicHeaderProps): React.ReactElement;

export interface GeneralContentProps extends ModuleCopy {
  layout?: 'media-right' | 'media-left' | 'full' | 'banner';
  media?: MediaProps | string | React.ReactElement;
  id?: string;
  className?: string;
}
export declare function GeneralContent(props: GeneralContentProps): React.ReactElement;

export interface TabModuleItem extends ModuleCopy {
  id?: string | number;
  /** the tab's name */
  label: React.ReactNode;
  media?: MediaProps | string | React.ReactElement;
}
export interface TabModuleProps {
  items: TabModuleItem[];
  /** where the tabs sit, default 'left' */
  align?: 'left' | 'center';
  value?: string | number | null;
  defaultValue?: string | number;
  onChange?: (id: string, index: number) => void;
  /** what the tabs are, for screen readers */
  label?: string;
  /** heading level of each tab's title, default 2 */
  titleLevel?: number;
  /** media for tabs that don't set their own */
  media?: MediaProps | string | React.ReactElement;
  /** passed to Tabs: true = every 6 seconds, or a time in ms */
  autoplay?: boolean | number;
  pauseLabel?: string;
  playLabel?: string;
  id?: string;
  className?: string;
}
export declare function TabModule(props: TabModuleProps): React.ReactElement;

/** A row's call to action as data: the module draws a small Button, or a neutral TextLink with the arrow when the copy block has a primary Button (and always in the list). */
export interface AccordionModuleCta { label: React.ReactNode; href?: string; onClick?: (e: React.MouseEvent) => void; target?: string; rel?: string }
export interface AccordionModuleItem extends Omit<AccordionItem, 'cta' | 'time' | 'speakers'> {
  /** { label, href }, or a node. A primary Button passed here is redrawn as a TextLink when the copy block already has one */
  cta?: AccordionModuleCta | React.ReactNode;
}
export interface AccordionModuleProps extends ModuleCopy {
  /** 'full' = heading over a full-width accordion; 'split' = copy block beside it; 'media-left' | 'media-right' = image or video beside it;
      'list' = rows on the left with the open item's content on the right (an accordion under 1024px).
      Default: 'media-right' with media, 'split' with an eyebrow, body or actions, otherwise 'full' */
  layout?: 'full' | 'split' | 'media-left' | 'media-right' | 'list';
  /** 4 to 12 standard drawers: { id, title, icon, content, cta } */
  items: AccordionModuleItem[];
  /** 'list' only: tone of the Marker that slides to the open row (default 'default'); false hides it */
  marker?: 1 | 2 | 3 | 'default' | 'blue' | false;
  /** media-left and media-right only; shown at 546 x 460 (max 560px wide) */
  media?: MediaProps | string | React.ReactElement;
  /** item id or index to start open; 'list' opens the first */
  defaultOpen?: string | number | Array<string | number>;
  /** let several rows stay open (not in 'list') */
  multiple?: boolean;
  /** false keeps one row open (always so in 'list') */
  collapsible?: boolean;
  /** receives the ids of the open items */
  onChange?: (open: string[]) => void;
  /** heading level of each row's title; default one below the module title, or 3 */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  id?: string;
  className?: string;
}
export declare function AccordionModule(props: AccordionModuleProps): React.ReactElement;

export interface CtaModuleProps extends ModuleCopy {
  /** default: 'media-right' with a form, 'card' without */
  layout?: 'media-right' | 'media-left' | 'bleed' | 'background' | 'card';
  /** Form props (it is drawn bare, variant 'full'), or your own form */
  form?: FormProps | React.ReactElement;
  media?: MediaProps | string | React.ReactElement;
  id?: string;
  className?: string;
}
export declare function CtaModule(props: CtaModuleProps): React.ReactElement;

export interface FormField {
  /** key in the submitted values, and the field's name when the form posts */
  name: string;
  label: string;
  /** input type, default 'text'; 'select' (or passing `options`) makes it a Select */
  type?: 'text' | 'email' | 'tel' | 'url' | 'number' | 'password' | 'select';
  /** choices for a Select */
  options?: Array<string | { value: string; label: string }>;
  required?: boolean;
  /** two neighboring half fields share one row on desktop */
  half?: boolean;
  defaultValue?: string;
  placeholder?: string;
  hint?: string;
  /** a message to show straight away, for example from the server */
  error?: string;
  /** default "This field is required" */
  requiredMessage?: string;
  /** shown when an email field doesn't look like an address */
  invalidMessage?: string;
  /** return a message to block submitting, or nothing when the value is fine */
  validate?: (value: string, values: FormValues) => string | null | undefined;
  autoComplete?: string;
  inputMode?: 'text' | 'email' | 'tel' | 'url' | 'numeric' | 'decimal' | 'search' | 'none';
  maxLength?: number;
  disabled?: boolean;
}
export type FormValues = { [name: string]: string | boolean };
/** The banner on top of a form: a photo; a headline on a color; a headline with an image on the right; or a headline over a photo. */
export interface FormBanner {
  /** the headline on the left; up to about 50 characters */
  title?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  /** with a title: 'right' (default) puts the image on the right; 'background' puts the headline over it */
  imagePosition?: 'right' | 'background';
  /** 'white' (default with an image on the right), 'gradient' (default otherwise), 'blue', 'polar', 'dark', or any color or var(--token) */
  background?: 'white' | 'polar' | 'blue' | 'gradient' | 'dark' | string;
  /** white text on a custom background */
  inverted?: boolean;
}
export interface FormProps {
  /** 'full' (default): centered heading with the shield. 'extended': left heading, link under the button. 'gate' and 'minimal': tighter card, link beside the button. */
  variant?: 'full' | 'extended' | 'gate' | 'minimal';
  title?: React.ReactNode;
  /** heading level, default 2 */
  titleLevel?: number;
  subtitle?: React.ReactNode;
  /** the shield from Logos, shown above a centered heading */
  logoSrc?: string;
  logoAlt?: string;
  /** a photo header, cropped to 30:11 */
  image?: string;
  imageAlt?: string;
  /** a banner on top of the card: an image URL (a photo), or a headline with an optional image and background */
  banner?: string | FormBanner;
  fields?: FormField[];
  /** the opt-in checkbox: its label, or `{ label, name (default 'optIn'), defaultChecked, required }` */
  consent?: string | { label: React.ReactNode; name?: string; value?: string; defaultChecked?: boolean; required?: boolean; requiredMessage?: string };
  /** default "Submit" */
  submitLabel?: string;
  /** the text link for people who already have an account */
  link?: string | { label: string; href?: string; onClick?: React.MouseEventHandler };
  /** the consent line under the button */
  legal?: React.ReactNode;
  /** called with the values once every field passes; the page doesn't reload */
  onSubmit?: (values: FormValues, event: React.FormEvent) => void;
  /** where the form posts when there is no onSubmit */
  action?: string;
  method?: string;
  /** default "This field is required" */
  requiredMessage?: string;
  disabled?: boolean;
  /** accessible name when there is no title */
  label?: string;
  /** 'bare' drops the card (no ground, shadow or padding), for use inside CtaModule */
  appearance?: 'card' | 'bare';
  /** 'inverted' turns the heading, opt-in and consent line white, over a dark picture */
  tone?: 'default' | 'inverted';
  /** extra content between the opt-in and the button, such as a reCAPTCHA */
  children?: React.ReactNode;
  id?: string;
  className?: string;
}
export declare function Form(props: FormProps): React.ReactElement;

export interface CarouselProps {
  /** the cards */
  children?: React.ReactNode;
  /** names the set, for screen readers */
  label?: string;
  /** 'multi' = cards of slideWidth (default); 'single' = one card as wide as the column */
  variant?: 'multi' | 'single';
  /** card width in the multi variant, default 350 */
  slideWidth?: number | string;
  /** 'lg' gives 100px above and below instead of 48px */
  spacing?: 'rg' | 'lg';
  prevLabel?: string;
  nextLabel?: string;
  id?: string;
  className?: string;
}
export declare function Carousel(props: CarouselProps): React.ReactElement;

export interface TestimonialCardProps {
  quote: React.ReactNode;
  name?: React.ReactNode;
  company?: React.ReactNode;
  /** the customer's logo: an image address or a node */
  logo?: string | React.ReactNode;
  logoAlt?: string;
  /** a photo address; false hides the avatar */
  avatar?: string | boolean;
  link?: string | { label?: string; href?: string; onClick?: React.MouseEventHandler };
  /** 'lg' = quote 32px (default); 'sm' = quote 24px */
  size?: 'lg' | 'sm';
  /** a photo behind the card; the quote moves onto a white panel */
  image?: string;
  /** a clip beside the quote: Media props, or true for the placeholder */
  video?: MediaProps | boolean;
  className?: string;
}
export declare function TestimonialCard(props: TestimonialCardProps): React.ReactElement;

export interface TestimonialCarouselProps {
  items: TestimonialCardProps[];
  /** card width and quote size: 'lg' 939px, 'sm' 500px, 'video' 836px */
  size?: 'lg' | 'sm' | 'video';
  label?: string;
  prevLabel?: string;
  nextLabel?: string;
  id?: string;
  className?: string;
}
export declare function TestimonialCarousel(props: TestimonialCarouselProps): React.ReactElement;

export interface LogoCard { title?: React.ReactNode; body?: React.ReactNode; /** image address or your own node */ badge?: string | React.ReactNode; badgeAlt?: string; link?: { label?: React.ReactNode; href: string; onClick?: (event: React.MouseEvent) => void }; closable?: boolean }
export interface LogoItem { src: string; alt?: string; href?: string; /** opens a logo HoverCard from the logo */ card?: LogoCard; /** optical nudge for visual weight: about 0.85–0.95 for dense, dark or heavy logos, 1.05–1.15 for thin, light ones; default 1 */ scale?: number }
export interface LogoCarouselProps {
  title?: React.ReactNode;
  titleLevel?: number;
  logos: Array<LogoItem | string>;
  /** seconds for one full loop; default about four per logo */
  duration?: number;
  /** start paused */
  paused?: boolean;
  pauseLabel?: string;
  playLabel?: string;
  /** on phones: 'stack' (default) shows up to `mobileMax` logos in two still columns; 'carousel' keeps the moving row */
  mobile?: 'stack' | 'carousel';
  /** stack only: how many logos to show on phones; default 8 */
  mobileMax?: number;
  /** false fits every logo to its tile instead of balancing their visual size; default true */
  optical?: boolean;
  id?: string;
  className?: string;
}
export declare function LogoCarousel(props: LogoCarouselProps): React.ReactElement;

export interface LogoHierarchyProps {
  title?: React.ReactNode;
  titleLevel?: number;
  tiers: Array<{
    label?: React.ReactNode;
    logos: Array<LogoItem | string>;
    /** 'signature' draws the logos larger (320 × 84 cells); default: the first tier when it has one or two logos */
    level?: 'signature' | 'standard';
    /** on phones: one or two columns; 'auto' (default) uses one column up to four logos and two from five */
    mobileColumns?: 1 | 2 | 'auto';
  }>;
  /** the default mobileColumns for every tier */
  mobileColumns?: 1 | 2 | 'auto';
  /** false fits every logo to its cell instead of balancing their visual size; default true */
  optical?: boolean;
  id?: string;
  className?: string;
}
export declare function LogoHierarchy(props: LogoHierarchyProps): React.ReactElement;

export type EventTypeName = 'qualys' | 'industry' | 'webinar' | 'speaking' | 'training';
export type CalendarView = 'list' | 'month' | 'grid';
export interface CalendarEvent {
  id?: string | number;
  title: string;
  type?: EventTypeName;
  /** overrides the type's name, e.g. "Qualys Event" */
  typeLabel?: string;
  /** e.g. "In-Person", "Virtual" */
  format?: string;
  /** first day, as YYYY-MM-DD or a Date */
  start: string | Date;
  /** last day, for an event of several days */
  end?: string | Date;
  /** the time as shown, e.g. "10a – 11a PST" */
  time?: string;
  href?: string;
  /** open the link in a new tab */
  external?: boolean;
  image?: string;
  imageAlt?: string;
  flag?: string;
  flagTone?: 'tier-1' | 'tier-2' | 'tier-3';
  speakers?: Array<{ name: string; company?: string; photo?: string }>;
  duration?: string;
  /** the list view's button: a label, its props, or false for none. Default "Register" */
  action?: string | false | { label?: string; href?: string; variant?: 'secondary' | 'secondary-alt' | 'primary'; onClick?: React.MouseEventHandler };
}
export interface EventCalendarLabels {
  view?: string; list?: string; month?: string; grid?: string; prev?: string; next?: string; current?: string;
  search?: string; type?: string; format?: string; reset?: string; filter?: string; legend?: string;
  action?: string; allDay?: string; loadMore?: string; browse?: string; empty?: string; emptyMonth?: string;
}
export interface EventCalendarProps {
  events: CalendarEvent[];
  /** the view in use (controlled) */
  view?: CalendarView;
  defaultView?: CalendarView;
  onViewChange?: (view: CalendarView) => void;
  /** which views the toggle offers, in order; default all three */
  views?: CalendarView[];
  /** the month shown, as YYYY-MM or a Date (controlled) */
  month?: string | Date;
  defaultMonth?: string | Date;
  onMonthChange?: (firstDay: Date) => void;
  /** the day marked as today; default the real date */
  today?: string | Date;
  /** 0 = weeks start on Sunday (default), 1 = Monday */
  weekStart?: 0 | 1;
  /** for month and weekday names; default 'en-US' */
  locale?: string;
  /** replaces the Event Type and Format filters; each id is read from the event */
  filters?: Array<{ id: string; label: string; options: Array<string | { value: string; label: string }>; single?: boolean }>;
  defaultFilters?: { [filterId: string]: string[] };
  onFilterChange?: (filters: { [filterId: string]: string[] }, query: string) => void;
  /** false hides the search and filter bar */
  toolbar?: boolean;
  search?: boolean;
  /** false hides the legend */
  legend?: boolean;
  /** month view bars: 'auto' = compact when a day has several events (default); true or false forces it */
  compact?: boolean | 'auto';
  /** false turns off the card shown on hover in the month view */
  hoverCard?: boolean;
  /** the grid view's heading; default "Browse Events" */
  title?: React.ReactNode;
  titleLevel?: number;
  /** grid view: 'desc' = newest first (default) */
  gridOrder?: 'desc' | 'asc';
  /** grid view: tiles per page, default 9 */
  pageSize?: number;
  /** grid view: an InlinePromoCard among the cards */
  promo?: InlinePromoCardProps;
  /** where the promo sits, counting from 0; default 5 */
  promoIndex?: number;
  typeLabels?: Partial<Record<EventTypeName, string>>;
  labels?: EventCalendarLabels;
  onEventClick?: (event: CalendarEvent, e: React.MouseEvent) => void;
  id?: string;
  className?: string;
}
export declare function EventCalendar(props: EventCalendarProps): React.ReactElement;

export interface FooterLink { label: string; href?: string }
export interface FooterProps {
  /** the shield from Logos, shown in the notch */
  logoSrc?: string;
  logoAlt?: string;
  logoHref?: string;
  heading?: React.ReactNode;
  /** heading level, default 2 */
  headingLevel?: number;
  body?: React.ReactNode;
  /** older name for `body` */
  blurb?: React.ReactNode;
  /** the URL field with its submit button */
  form?: { placeholder?: string; /** accessible name of the field, default the placeholder */ label?: string; /** accessible name of the arrow button */ buttonLabel?: string; action?: string; method?: string; name?: string; type?: string; required?: boolean; onSubmit?: (value: string, event: React.FormEvent) => void };
  social?: Array<{ label: string; href?: string; network?: SocialNetwork; icon?: string | React.ReactNode; glyph?: string }>;
  columns?: Array<{ title: string; links: Array<string | FooterLink> }>;
  copyright?: string;
  /** shown after the copyright, each followed by a full stop */
  legal?: Array<string | FooterLink>;
  /** accessible name of the link columns, default "Footer" */
  navLabel?: string;
  className?: string;
}
export declare function Footer(props: FooterProps): React.ReactElement;

/* ── Breadcrumbs ── */
export interface BreadcrumbItem { label: React.ReactNode; href?: string; onClick?: (event: React.MouseEvent) => void }
export interface BreadcrumbsProps {
  /** the trail from the root to the current page; the last one is the current page and is never a link */
  items: Array<string | BreadcrumbItem>;
  /** fold the middle levels behind "…" when there are more than this many; default 4, 0 never folds */
  maxItems?: number;
  /** put it on the 1140px content column with 32px above and below */
  contained?: boolean;
  /** accessible name of the nav, default "Breadcrumb" */
  label?: string;
  /** accessible name of the "…" button, default "Show all levels" */
  moreLabel?: string;
  id?: string;
  className?: string;
}
export declare function Breadcrumbs(props: BreadcrumbsProps): React.ReactElement;

/* ── Overlays, dialogs and notifications ── */
export interface OverlayProps {
  /** 'light' (default) is black at 25%; 'dark' is black at 50% */
  tone?: 'light' | 'dark';
  /** a press on the backdrop itself, not on what sits on it */
  onClick?: (event: React.MouseEvent) => void;
  /** fill a positioned parent instead of the screen */
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}
export declare function Overlay(props: OverlayProps): React.ReactElement;

export interface ModalAction { label: React.ReactNode; onClick?: (event: React.MouseEvent) => void; href?: string; /** default: the last one is primary, the others secondary */ variant?: ButtonProps['variant']; disabled?: boolean; type?: 'button' | 'submit' }
/** What every modal in this file accepts. */
export interface ModalBase {
  open?: boolean;
  onClose?: () => void;
  /** heading level of the title, default 2 */
  titleLevel?: number;
  /** 'light' (default) 25% backdrop, 'dark' 50% */
  overlay?: 'light' | 'dark';
  /** selector of the element that gets focus on opening; default the first control */
  initialFocus?: string;
  /** draw the panel in the page flow with no backdrop, for documentation */
  inline?: boolean;
  /** default "Close" */
  closeLabel?: string;
  id?: string;
  className?: string;
}
export interface ModalProps extends ModalBase {
  title: React.ReactNode;
  eyebrow?: React.ReactNode;
  subtitle?: React.ReactNode;
  /** 'sm' 480px, 'md' 540px (default), 'lg' 600px */
  size?: 'sm' | 'md' | 'lg';
  /** footer buttons, primary last; or your own nodes */
  actions?: Array<ModalAction | React.ReactElement> | React.ReactNode;
  /** false removes the close button, Esc and backdrop closing */
  dismissible?: boolean;
  /** false keeps a press on the backdrop from closing it */
  closeOnOverlay?: boolean;
  children?: React.ReactNode;
}
export declare function Modal(props: ModalProps): React.ReactElement | null;

export interface FormModalProps extends Omit<ModalProps, 'children' | 'actions'> {
  /** the Form's props, or a ready-made form element */
  form?: FormProps | React.ReactElement;
}
export declare function FormModal(props: FormModalProps): React.ReactElement | null;

export interface AlertDialogProps extends Omit<ModalBase, 'closeLabel'> {
  /** 'destructive' (default, red), 'warning' (amber), 'info' (blue) */
  tone?: 'destructive' | 'warning' | 'info';
  title: React.ReactNode;
  message?: React.ReactNode;
  icon?: IconName;
  /** default "Confirm" */
  confirmLabel?: React.ReactNode;
  /** default "Cancel" */
  cancelLabel?: React.ReactNode;
  onConfirm?: (event: React.MouseEvent) => void;
  /** falls back to onClose */
  onCancel?: (event: React.MouseEvent) => void;
  /** replaces the two default buttons */
  actions?: Array<ModalAction | React.ReactElement> | React.ReactNode;
  children?: React.ReactNode;
}
export declare function AlertDialog(props: AlertDialogProps): React.ReactElement | null;

export interface SessionTimeoutProps extends Omit<ModalBase, 'closeLabel' | 'onClose'> {
  /** 'expired' shows the signed-out notice; by default it switches to it when the clock reaches zero */
  state?: 'warning' | 'expired';
  /** seconds left, when you drive the clock yourself */
  seconds?: number;
  /** seconds to count down from by itself, default 300 */
  defaultSeconds?: number;
  onExpire?: () => void;
  onStay?: (event: React.MouseEvent) => void;
  onSignOut?: (event: React.MouseEvent) => void;
  onSignIn?: (event: React.MouseEvent) => void;
  signInHref?: string;
  title?: React.ReactNode;
  message?: React.ReactNode;
  expiredTitle?: React.ReactNode;
  expiredMessage?: React.ReactNode;
  stayLabel?: React.ReactNode;
  signOutLabel?: React.ReactNode;
  signInLabel?: React.ReactNode;
  /** accessible name of the clock, default "Time left" */
  clockLabel?: string;
}
export declare function SessionTimeout(props: SessionTimeoutProps): React.ReactElement | null;

export interface SuccessConfirmationProps extends Omit<ModalBase, 'closeLabel'> {
  /** 'general' (default) or 'download' */
  type?: 'general' | 'download';
  title?: React.ReactNode;
  message?: React.ReactNode;
  actionLabel?: React.ReactNode;
  /** default: closes the modal */
  onAction?: (event: React.MouseEvent) => void;
  /** makes the button a link; with type 'download' it downloads */
  href?: string;
  download?: boolean | string;
  children?: React.ReactNode;
}
export declare function SuccessConfirmation(props: SuccessConfirmationProps): React.ReactElement | null;

export interface ExitIntentProps extends ModalBase {
  /** 'offer' (default): image beside the form. 'content': centered, with an icon tile. */
  type?: 'offer' | 'content';
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /** offer only */
  image?: string;
  imageAlt?: string;
  /** content only; default 'file', null for none */
  icon?: IconName | React.ReactNode | null;
  /** default { name: 'email', label: 'Work Email', type: 'email' } */
  field?: { name?: string; label?: string; type?: string; autoComplete?: string };
  submitLabel?: React.ReactNode;
  dismissLabel?: React.ReactNode;
  /** called with the field's value once it passes the check */
  onSubmit?: (value: string, event: React.FormEvent) => void;
  /** the "No Thanks" link; falls back to onClose */
  onDismiss?: (event: React.MouseEvent) => void;
  requiredMessage?: string;
}
export declare function ExitIntent(props: ExitIntentProps): React.ReactElement | null;

export interface WizardField { name: string; label: string; type?: string; required?: boolean; /** makes it a Select */ options?: Array<string | { value: string; label: string }>; hint?: string; autoComplete?: string }
export interface WizardStep { title: React.ReactNode; description?: string; fields?: WizardField[]; /** an opt-in checkbox under the fields */ consent?: string | { name?: string; label: React.ReactNode } }
export interface DemoRequestWizardProps extends ModalBase {
  steps: WizardStep[];
  /** a banner across the top of the panel, as on a Form */
  banner?: string | FormBanner;
  /** every value, once the last step passes; return false to stay on it */
  onSubmit?: (values: { [name: string]: string | boolean }) => boolean | void;
  /** the confirmation's wording; note false hides the blue line */
  success?: { title?: React.ReactNode; message?: React.ReactNode; note?: React.ReactNode | false; actionLabel?: React.ReactNode };
  /** controlled step, from 0; steps.length is the confirmation */
  step?: number;
  defaultStep?: number;
  onStepChange?: (step: number) => void;
  /** default "Step 1 of 3" */
  stepLabel?: (current: number, total: number) => string;
  nextLabel?: React.ReactNode;
  backLabel?: React.ReactNode;
  submitLabel?: React.ReactNode;
  requiredMessage?: string;
}
export declare function DemoRequestWizard(props: DemoRequestWizardProps): React.ReactElement | null;

export type ToastStatus = 'success' | 'warning' | 'error' | 'info';
export interface ToastProps {
  /** default 'info' */
  status?: ToastStatus;
  message?: React.ReactNode;
  /** adds the dismiss button */
  onClose?: () => void;
  /** default "Dismiss" */
  closeLabel?: string;
  className?: string;
  children?: React.ReactNode;
}
export declare function Toast(props: ToastProps): React.ReactElement;

export interface ToastItem { id: string | number; status?: ToastStatus; message: React.ReactNode; /** ms before it leaves; 0 keeps it. Default 5000 success and info, 8000 warning, 0 error. */ duration?: number }
export interface ToastStackProps {
  items: ToastItem[];
  /** remove the item with this id from your list */
  onDismiss?: (id: string | number) => void;
  /** default 'bottom-left' */
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  /** how many show at once, default 3 */
  max?: number;
  /** accessible name of the region, default "Notifications" */
  label?: string;
  closeLabel?: string;
  /** draw the stack in the page flow, for documentation */
  inline?: boolean;
  className?: string;
}
export declare function ToastStack(props: ToastStackProps): React.ReactElement;

export interface NotificationBarProps {
  /** default 'info' */
  type?: 'info' | 'success' | 'warning' | 'promo';
  message?: React.ReactNode;
  link?: string | { label: React.ReactNode; href?: string; onClick?: (event: React.MouseEvent) => void };
  icon?: IconName | React.ReactNode;
  /** adds the dismiss button */
  onClose?: () => void;
  /** default "Dismiss" */
  closeLabel?: string;
  id?: string;
  className?: string;
  children?: React.ReactNode;
}
export declare function NotificationBar(props: NotificationBarProps): React.ReactElement;

export interface CookieCategory { id: string; label: React.ReactNode; description?: React.ReactNode; /** always on, can't be changed */ required?: boolean; defaultChecked?: boolean }
export type CookiePrefs = { [id: string]: boolean };
export interface CookieBannerProps {
  /** 'compact' (default): the bar along the bottom. 'expanded': the preferences panel. */
  variant?: 'compact' | 'expanded';
  /** false hides it */
  open?: boolean;
  message?: React.ReactNode;
  /** compact: the policy link after the message */
  link?: string | { label: React.ReactNode; href?: string; onClick?: (event: React.MouseEvent) => void };
  /** expanded: one switch each */
  categories?: CookieCategory[];
  /** every category as true */
  onAccept?: (prefs: CookiePrefs) => void;
  onDecline?: (event: React.MouseEvent) => void;
  /** expanded: the switches as they stand */
  onSave?: (prefs: CookiePrefs) => void;
  /** compact: adds a "Manage Preferences" link */
  onManage?: (event: React.MouseEvent) => void;
  /** expanded: default "Cookie Preferences" */
  title?: React.ReactNode;
  titleLevel?: number;
  acceptLabel?: React.ReactNode;
  declineLabel?: React.ReactNode;
  saveLabel?: React.ReactNode;
  manageLabel?: React.ReactNode;
  /** compact: accessible name of the bar, default "Cookie consent" */
  label?: string;
  overlay?: 'light' | 'dark';
  /** draw it in the page flow, for documentation */
  inline?: boolean;
  id?: string;
  className?: string;
}
export declare function CookieBanner(props: CookieBannerProps): React.ReactElement | null;

export interface TooltipProps {
  /** the text; keep it to a few words */
  label?: React.ReactNode;
  /** same as label */
  content?: React.ReactNode;
  /** default 'top' */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** default 'dark' */
  theme?: 'dark' | 'light';
  /** ms before it shows on hover, default 300 */
  delay?: number;
  /** force it open or closed */
  open?: boolean;
  id?: string;
  className?: string;
  /** the element it describes; plain text gets a dotted underline and a tab stop */
  children?: React.ReactNode;
}
export declare function Tooltip(props: TooltipProps): React.ReactElement;

export interface HoverCardProps {
  /** 'logo' (default): logo, badge, name, copy, one link. 'profile': avatar, full name, role, company logo, LinkedIn button, close icon. One profile card can be pinned open at a time: the other headshots wait until it is closed */
  kind?: 'logo' | 'profile';
  /** logo card: the logo, its alt text, an optional badge (image address or node), the name, the copy. Profile card: `logo` is the company logo in the foot row (in place of the company name) */
  logo?: string;
  logoAlt?: string;
  badge?: string | React.ReactNode;
  badgeAlt?: string;
  title?: React.ReactNode;
  body?: React.ReactNode;
  /** profile card: the full name, headshot, role and company */
  name?: string;
  image?: string;
  designation?: React.ReactNode;
  company?: React.ReactNode;
  /** logo card: the TextLink ({ label, href }). Profile card: the profile link, drawn as the small SocialButton at the right of the foot row ({ href }; LinkedIn unless `network` says otherwise; `label` names it for screen readers) */
  link?: string | { label?: React.ReactNode; href: string; network?: 'linkedin' | 'x' | 'facebook' | 'instagram' | 'vimeo' | 'youtube' | 'url'; icon?: string | React.ReactNode; onClick?: (event: React.MouseEvent) => void };
  /** show the close icon; default true for 'profile', false for 'logo' */
  closable?: boolean;
  closeLabel?: string;
  /** where it opens first, default 'bottom'; it flips when there is no room */
  position?: 'bottom' | 'top';
  /** default 'center' */
  align?: 'start' | 'center' | 'end';
  /** ms before it opens on hover, default 150 */
  delay?: number;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** draws the card in the page flow with no trigger, for documentation */
  inline?: boolean;
  /** accessible name when the card has no title or name */
  label?: string;
  /** accessible name of the trigger when HoverCard wraps the child in a button */
  triggerLabel?: string;
  id?: string;
  className?: string;
  cardClassName?: string;
  /** the trigger: a button or link, or anything else (wrapped in a button) */
  children?: React.ReactNode;
}
export declare function HoverCard(props: HoverCardProps): React.ReactElement;

export interface ComparisonColumn { id?: string | number; name: string; logo?: string; logoAlt?: string; subtitle?: React.ReactNode }
export interface FeatureMatrixRow { label: React.ReactNode; values: Array<boolean | 0 | 1> }
export interface FeatureMatrixProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  /** the first column is the highlighted one (Qualys) */
  columns: Array<ComparisonColumn | string>;
  /** a row is { label, values } or [label, 1, 0, ...], one value per column */
  sections: Array<{ title: React.ReactNode; open?: boolean; rows: Array<FeatureMatrixRow | Array<React.ReactNode | boolean | number>> }>;
  /** default "Supported" */
  totalLabel?: React.ReactNode;
  formatTotal?: (count: number, total: number) => React.ReactNode;
  /** false removes the totals row */
  totals?: boolean;
  /** mobile: the competitor shown beside the first column */
  compare?: string;
  defaultCompare?: string;
  onCompareChange?: (id: string) => void;
  defaultDiffOnly?: boolean;
  compareLabel?: string;
  diffLabel?: string;
  noDiffLabel?: string;
  /** forces a layout; by default mobile below 768px of its own width */
  layout?: 'desktop' | 'mobile';
  titleLevel?: number;
  id?: string;
  className?: string;
}
export declare function FeatureMatrix(props: FeatureMatrixProps): React.ReactElement;

export interface DetailComparisonProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  columns: Array<ComparisonColumn | string>;
  /** copy is keyed by column id: a text, or { heading, body } */
  sections: Array<{ title: React.ReactNode; open?: boolean; heading?: React.ReactNode; copy: Record<string, React.ReactNode | { heading?: React.ReactNode; body?: React.ReactNode }> }>;
  /** the most competitors shown beside the first column, default 3 */
  max?: number;
  picked?: string[];
  defaultPicked?: string[];
  onChange?: (ids: string[]) => void;
  compareLabel?: string;
  hintLabel?: string;
  layout?: 'desktop' | 'mobile';
  titleLevel?: number;
  id?: string;
  className?: string;
}
export declare function DetailComparison(props: DetailComparisonProps): React.ReactElement;

export interface MarketingTableColumn {
  /** the column heading, one to three words: "CISA BOD 26-04", "ROC" */
  title?: React.ReactNode;
  /** a logo in place of the heading: the reversed Qualys logo URL, or a node */
  logo?: string | React.ReactNode;
  /** what the logo says, default "Qualys"; also names the column on mobile */
  logoAlt?: string;
  /** one word under the heading: "Requirements", "Capabilities", "Advantages" */
  subtitle?: React.ReactNode;
  /** the column to draw attention to: surface-neutral-300 ground, cells in Medium behind a blue check. One per table, never the first column */
  featured?: boolean;
}
export interface MarketingTableRow {
  /** the row heading (first column), Title Case */
  title: React.ReactNode;
  /** a Feature Icon address, or a node; give every row one or none */
  icon?: string | React.ReactNode;
  /** one cell for each column after the first, in column order */
  cells: React.ReactNode[];
}
export interface MarketingTableImage {
  src: string;
  /** the photo's width as a share of the header's: "72%" (default), "100%" */
  size?: string;
  /** how far down the photo the header is centered: "50%" (default), "54%" */
  focus?: string;
}
export interface MarketingTableProps {
  /** the first column heads the rows; each further column holds one cell per row */
  columns: MarketingTableColumn[];
  rows: MarketingTableRow[];
  /** the photo in the middle of the header row, drawn in grays and blended into the header color: a URL, or { src, size, focus } */
  image?: string | MarketingTableImage;
  /** header ground: 'blue' = Qualys Blue, deepening at the foot (default); 'dark' = Charcoal */
  tone?: 'blue' | 'dark';
  /** accessible name of the table */
  label?: string;
  id?: string;
  className?: string;
}
export declare function MarketingTable(props: MarketingTableProps): React.ReactElement;

declare global {
  interface Window {
    Qualys: {
      Button: typeof Button; TextLink: typeof TextLink; Hyperlink: typeof Hyperlink; Breadcrumbs: typeof Breadcrumbs; SocialButton: typeof SocialButton; Icon: typeof Icon; Tag: typeof Tag; FilterChip: typeof FilterChip; Flag: typeof Flag; Marker: typeof Marker; EventType: typeof EventType; Tabs: typeof Tabs; Drawer: typeof Drawer; DrawerCard: typeof DrawerCard; Accordion: typeof Accordion;
      Avatar: typeof Avatar; ProfileCard: typeof ProfileCard; ProfileModal: typeof ProfileModal; ProfileGrid: typeof ProfileGrid;
      TextField: typeof TextField; Select: typeof Select; FilterDropdown: typeof FilterDropdown; FilterChipGroup: typeof FilterChipGroup; AppliedFilters: typeof AppliedFilters; FilterButton: typeof FilterButton; FilterBar: typeof FilterBar; FilterDrawer: typeof FilterDrawer; SearchBar: typeof SearchBar;
      Checkbox: typeof Checkbox; Radio: typeof Radio; Toggle: typeof Toggle; Form: typeof Form;
      Card: typeof Card; IntegrationCard: typeof IntegrationCard; EventCard: typeof EventCard; WebinarCard: typeof WebinarCard; ResourceCard: typeof ResourceCard; BlogCard: typeof BlogCard; InlinePromoCard: typeof InlinePromoCard; StatCard: typeof StatCard;
      Nav: typeof Nav; NavBanner: typeof NavBanner; Media: typeof Media; Hero: typeof Hero; TypographicHeader: typeof TypographicHeader; GeneralContent: typeof GeneralContent; TabModule: typeof TabModule; AccordionModule: typeof AccordionModule; CtaModule: typeof CtaModule; Stats: typeof Stats; Carousel: typeof Carousel; TestimonialCard: typeof TestimonialCard; TestimonialCarousel: typeof TestimonialCarousel; LogoCarousel: typeof LogoCarousel; LogoHierarchy: typeof LogoHierarchy; EventCalendar: typeof EventCalendar; Footer: typeof Footer;
      HoverCard: typeof HoverCard; FeatureMatrix: typeof FeatureMatrix; DetailComparison: typeof DetailComparison; MarketingTable: typeof MarketingTable;
      Overlay: typeof Overlay; Modal: typeof Modal; FormModal: typeof FormModal; AlertDialog: typeof AlertDialog; SessionTimeout: typeof SessionTimeout; SuccessConfirmation: typeof SuccessConfirmation; ExitIntent: typeof ExitIntent; DemoRequestWizard: typeof DemoRequestWizard; Toast: typeof Toast; ToastStack: typeof ToastStack; NotificationBar: typeof NotificationBar; CookieBanner: typeof CookieBanner; Tooltip: typeof Tooltip;
    };
  }
}
