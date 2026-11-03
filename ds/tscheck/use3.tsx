import * as React from 'react';
import { SpeakerList, FeatureList, AppGrid, EventBanner, StatCard, Stats, Carousel, Form, HoverCard, FeatureMatrix, DetailComparison, MarketingTable, TextLink, Hyperlink, Tag, Flag, Marker, Tabs, TabModule, DrawerCard, LogoHierarchy, Avatar } from './qualys';
export const a = <HoverCard kind="profile" name="Jordan Rivera" designation="Director" link={{ href: '#' }}><Avatar /></HoverCard>;
export const b = <HoverCard kind="logo" logo="x.svg" title="Partner" body="Text" link={{ label: 'View', href: '#' }} inline />;
export const d = <FeatureMatrix columns={[{ id: 'q', name: 'Qualys' }, 'Other']} sections={[{ title: 'S', open: true, rows: [['A', 1, 0], { label: 'B', values: [true, false] }] }]} />;
export const e = <DetailComparison columns={[{ id: 'q', name: 'Qualys' }, { id: 'o', name: 'Other' }]} sections={[{ title: 'S', heading: 'H', copy: { q: 'x', o: { heading: 'h', body: 'y' } } }]} />;
export const f = <MarketingTable label="L" columns={[{ title: "A" }, { logo: "l.svg", logoAlt: "Qualys", subtitle: "Adv", featured: true }]} rows={[{ title: "R", cells: ["x"] }]} tone="dark" image={{ src: "a.jpg", focus: "54%" }} />;
export const g = [<TextLink iconLeft="download" href="#">x</TextLink>, <Hyperlink arrow="always" disabled href="#">x</Hyperlink>, <Tag variant="eyebrow">x</Tag>, <Flag size="sm">x</Flag>, <Marker side="right" tone="blue" />,
  <Tabs items={[{ label: 'a' }]} autoplay={5000} />, <TabModule items={[]} autoplay />, <DrawerCard title="t" ctaVisibility="open-only" speakerVisibility="open-only" profileCards />,
  <LogoHierarchy tiers={[{ logos: [{ src: 'a.svg', alt: 'A', card: { title: 'A', body: 'b', link: { href: '#' } } }] }]} />];
export const h2 = [<SpeakerList speakers={[{ name: 'A', role: 'B', image: 'a.jpg' }, { name: 'C' }]} layout="vertical" size="md" />,
  <FeatureList items={['One', { label: 'Two', href: '#' }]} columns={2} card={false} label="Included" />,
  <AppGrid title="T" body="B" link={{ label: 'Explore', href: '#' }} groups={[{ title: 'G', icon: 'i.svg', links: ['a', { label: 'b', href: '#' }] }]} />,
  <EventBanner series="Cyber Risk Series" tag="Live Virtual Event" title="T" action={{ label: 'Watch Now', href: '#' }} video="v.mp4" image="p.jpg" tone="dark" />,
  <StatCard tone="plain" value="99" suffix="%" label="L" />, <Stats layout="cards" tone="plain" items={[{ value: 1, label: 'a' }]} />,
  <Carousel title="Latest" link={{ label: 'View All', href: '#' }}><div /></Carousel>,
  <Form submitted success={{ title: 'Done', message: 'm', actionLabel: 'Download', href: '#' }} fields={[]} />];
