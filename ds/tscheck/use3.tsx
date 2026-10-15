import * as React from 'react';
import { HoverCard, FeatureMatrix, DetailComparison, MarketingTable, TextLink, Hyperlink, Tag, Flag, Marker, Tabs, TabModule, DrawerCard, LogoHierarchy, Avatar } from './qualys';
export const a = <HoverCard kind="profile" name="Jordan Rivera" designation="Director" link={{ href: '#' }}><Avatar /></HoverCard>;
export const b = <HoverCard kind="logo" logo="x.svg" title="Partner" body="Text" link={{ label: 'View', href: '#' }} inline />;
export const d = <FeatureMatrix columns={[{ id: 'q', name: 'Qualys' }, 'Other']} sections={[{ title: 'S', open: true, rows: [['A', 1, 0], { label: 'B', values: [true, false] }] }]} noMark="red" />;
export const e = <DetailComparison columns={[{ id: 'q', name: 'Qualys' }, { id: 'o', name: 'Other' }]} sections={[{ title: 'S', heading: 'H', copy: { q: 'x', o: { heading: 'h', body: 'y' } } }]} />;
export const f = <MarketingTable label="L" columns={[{ title: "A" }, { logo: "l.svg", logoAlt: "Qualys", subtitle: "Adv", featured: true }]} rows={[{ title: "R", cells: ["x"] }]} tone="dark" image={{ src: "a.jpg", focus: "54%" }} />;
export const g = [<TextLink iconLeft="download" href="#">x</TextLink>, <Hyperlink arrow="always" disabled href="#">x</Hyperlink>, <Tag variant="eyebrow">x</Tag>, <Flag size="sm">x</Flag>, <Marker side="right" tone="blue" />,
  <Tabs items={[{ label: 'a' }]} autoplay={5000} />, <TabModule items={[]} autoplay />, <DrawerCard title="t" ctaVisibility="open-only" speakerVisibility="open-only" profileCards />,
  <LogoHierarchy tiers={[{ logos: [{ src: 'a.svg', alt: 'A', card: { title: 'A', body: 'b', link: { href: '#' } } }] }]} />];
