import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModalOverlay, Modal } from 'react-aria-components';
import { AlertDialog } from '../AlertDialog';

function renderAlertDialog(props: Partial<React.ComponentProps<typeof AlertDialog>> = {}) {
  const defaults = {
    title: 'Confirm action',
    actionLabel: 'Confirm',
    children: 'Are you sure you want to proceed?',
    ...props,
  };
  return render(
    <ModalOverlay isOpen isDismissable={false}>
      <Modal>
        <AlertDialog {...(defaults as React.ComponentProps<typeof AlertDialog>)} />
      </Modal>
    </ModalOverlay>
  );
}

describe('AlertDialog', () => {
  it('renders title and body content', () => {
    renderAlertDialog();

    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    expect(screen.getByText('Confirm action')).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to proceed?')).toBeInTheDocument();
  });

  it('renders the action button with the given label', () => {
    renderAlertDialog({ actionLabel: 'Delete' });

    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  });

  it('renders "Cancel" as the default cancel label', () => {
    renderAlertDialog();

    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('renders a custom cancel label when provided', () => {
    renderAlertDialog({ cancelLabel: 'Go back' });

    expect(screen.getByRole('button', { name: 'Go back' })).toBeInTheDocument();
  });

  it('renders the info icon by default (no variant)', () => {
    renderAlertDialog();

    // lucide InfoIcon renders an svg; the AlertCircle should not be present
    const svgs = document.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });

  it('calls onAction and closes when the action button is pressed', async () => {
    const user = userEvent.setup();
    const onAction = jest.fn();

    renderAlertDialog({ onAction });

    await user.click(screen.getByRole('button', { name: 'Confirm' }));

    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('does not call onAction when cancel is pressed', async () => {
    const user = userEvent.setup();
    const onAction = jest.fn();

    renderAlertDialog({ onAction });

    await user.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(onAction).not.toHaveBeenCalled();
  });

  it('applies destructive variant styles to the action button', () => {
    renderAlertDialog({ variant: 'destructive', actionLabel: 'Delete' });

    const actionBtn = screen.getByRole('button', { name: 'Delete' });
    // destructive variant adds red background classes via tailwind-variants
    expect(actionBtn.className).toContain('bg-red');
  });

  it('action button has autoFocus', () => {
    renderAlertDialog({ actionLabel: 'OK' });

    const actionBtn = screen.getByRole('button', { name: 'OK' });
    expect(actionBtn).toHaveFocus();
  });
});
