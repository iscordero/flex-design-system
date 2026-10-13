import * as React from 'react';
import { Breadcrumbs } from './qualys';
export const a = <Breadcrumbs contained maxItems={3} items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, 'Current Page']} />;

import { AccordionModule, Accordion, TextLink, Button } from './qualys';
export const accMod = <AccordionModule layout="list" items={[{ id: 'a', title: 'Cloud', icon: '/x.svg', content: 'Copy', cta: <TextLink href="#">More</TextLink> }]} />;
export const accMod2 = <AccordionModule layout="split" eyebrow="E" title="T" body="B" actions={<Button>Go</Button>} items={[]} defaultOpen={0} collapsible={false} />;
export const accMod3 = <AccordionModule layout="media-left" media={{}} items={[]} multiple onChange={(o) => o.length} />;
export const acc9 = <Accordion items={[]} collapsible={false} />;
// @ts-expect-error unknown layout
export const accBad = <AccordionModule layout="grid" items={[]} />;

export const accMod4 = <AccordionModule layout="list" marker="blue" items={[{ title: 'Cloud', cta: { label: 'Learn More', href: '#' } }]} />;
export const accMod5 = <AccordionModule layout="list" marker={false} items={[{ title: 'Cloud', cta: <Button size="sm">Go</Button> }]} />;
// @ts-expect-error unknown tone
export const accBad2 = <AccordionModule layout="list" marker={4} items={[]} />;

import { Marker, StatCard, Stats } from './qualys';
export const mk = <Marker tone="blue" count={2} />;
export const sc = <StatCard value="150" suffix="%" label="Faster" countUp={false} />;
export const sts = <Stats items={[{ value: '10', label: 'x' }]} countUp={false} />;
// @ts-expect-error marker is no longer a Drawer prop
export const dr = <Accordion items={[]} marker={1} />;
