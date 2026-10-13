import * as React from 'react';
import { Modal, FormModal, AlertDialog, SessionTimeout, SuccessConfirmation, ExitIntent, DemoRequestWizard, Toast, ToastStack, NotificationBar, CookieBanner, Tooltip, Overlay, Icon } from './qualys';
export const a = [
  <Modal open onClose={() => {}} title="T" size="lg" actions={[{ label: 'Cancel' }, { label: 'OK', variant: 'primary' }]}>Body</Modal>,
  <FormModal open title="T" eyebrow="E" form={{ variant: 'minimal', title: 'x' }} />,
  <AlertDialog open tone="warning" title="T" message="m" onConfirm={() => {}} />,
  <SessionTimeout open defaultSeconds={300} onStay={() => {}} />,
  <SuccessConfirmation open type="download" href="/f.pdf" />,
  <ExitIntent open type="content" title="T" onSubmit={(v) => v.length} />,
  <DemoRequestWizard open steps={[{ title: 'A', fields: [{ name: 'a', label: 'A', options: ['x'] }], consent: 'ok' }]} onSubmit={(v) => !!v.a} />,
  <Toast status="error" message="m" />,
  <ToastStack items={[{ id: 1, message: 'm', status: 'success', duration: 0 }]} onDismiss={(id) => id} position="top-right" />,
  <NotificationBar type="promo" message="m" link={{ label: 'Go', href: '#' }} />,
  <CookieBanner variant="expanded" categories={[{ id: 'a', label: 'A', required: true }]} onSave={(p) => p.a} />,
  <Tooltip label="x" position="left" theme="light"><button>b</button></Tooltip>,
  <Overlay tone="dark" />,
  <Icon name="cookie" />,
];
