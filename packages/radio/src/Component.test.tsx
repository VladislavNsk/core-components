import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { Radio } from './index';

describe('Radio', () => {
    describe('Display tests', () => {
        it('should display correctly', () => {
            expect(render(<Radio label='text' />)).toMatchSnapshot();
        });

        it('should display with description correctly', () => {
            expect(render(<Radio hint='hint' label='text' />)).toMatchSnapshot();
        });

        it('should display without label or hint', () => {
            expect(render(<Radio />)).toMatchSnapshot();
        });
    });

    describe('Styles tests', () => {
        it('should set custom class', () => {
            const className = 'custom-class';
            const { container } = render(<Radio className={className} />);

            expect(container.firstElementChild).toHaveClass(className);
        });

        it('should set contentClassName', () => {
            const className = 'custom-class';
            const { container } = render(<Radio label='label' contentClassName={className} />);

            expect(container.querySelector('.content')).toHaveClass(className);
        });

        it('should set circleClassName', () => {
            const className = 'custom-class';
            const { container } = render(<Radio circleClassName={className} />);

            expect(container.querySelector('.circle')).toHaveClass(className);
        });

        it('should set `checked` class', () => {
            const { container } = render(<Radio checked={true} />);

            expect(container.firstElementChild).toHaveClass('checked');
        });

        it('should set `disabled` class', () => {
            const { container } = render(<Radio disabled={true} />);

            expect(container.firstElementChild).toHaveClass('disabled');
        });

        it('should set size 20 as default size', () => {
            const { container } = render(<Radio />);

            expect(container.firstElementChild).toHaveClass('size-20');
        });

        it('should set size 20', () => {
            const { container } = render(<Radio size={20} />);

            expect(container.firstElementChild).toHaveClass('size-20');
        });

        it('should set size 24', () => {
            const { container } = render(<Radio size={24} />);

            expect(container.firstElementChild).toHaveClass('size-24');
        });
    });

    describe('Attributes tests', () => {
        it('should set `data-test-id` attribute', () => {
            const dataTestId = 'test-id';
            const { getByTestId } = render(<Radio dataTestId={dataTestId} />);

            expect(getByTestId(dataTestId).tagName).toBe('INPUT');
        });

        it('should set disabled attribute', () => {
            const dataTestId = 'test-id';
            const { getByTestId } = render(<Radio disabled={true} dataTestId={dataTestId} />);

            expect(getByTestId(dataTestId)).toBeDisabled();
        });

        it('should set checked attribute', () => {
            const dataTestId = 'test-id';
            const { getByTestId } = render(<Radio checked={true} dataTestId={dataTestId} />);

            expect(getByTestId(dataTestId)).toBeChecked();
        });
    });

    describe('Render tests', () => {
        test('should unmount without errors', () => {
            const { unmount } = render(<Radio />);

            expect(unmount).not.toThrowError();
        });
    });

    describe('Interaction tests', () => {
        test('should not call `onChange` prop if checked', () => {
            const cb = jest.fn();

            const { container } = render(<Radio onChange={cb} checked={true} />);

            if (container.firstElementChild) {
                fireEvent.click(container.firstElementChild);
            }

            expect(cb).toBeCalledTimes(0);
        });

        test('should call `onChange` prop if checked', () => {
            const cb = jest.fn();

            const { container } = render(<Radio onChange={cb} checked={false} />);

            if (container.firstElementChild) {
                fireEvent.click(container.firstElementChild);
            }

            expect(cb).toBeCalledTimes(1);
        });

        test('should not call `onChange` prop if disabled', () => {
            const cb = jest.fn();

            const { container } = render(<Radio onChange={cb} disabled={true} />);

            if (container.firstElementChild) {
                fireEvent.click(container.firstElementChild);
            }

            expect(cb).not.toBeCalled();
        });

        test('should not call `onChange` prop if disabled and checked', () => {
            const cb = jest.fn();

            const { container } = render(<Radio onChange={cb} checked={true} disabled={true} />);

            if (container.firstElementChild) {
                fireEvent.click(container.firstElementChild);
            }

            expect(cb).not.toBeCalled();
        });

        test('should not call `onChange` prop if inactive', () => {
            const cb = jest.fn();

            const { container } = render(<Radio onChange={cb} inactive={true} />);

            if (container.firstElementChild) {
                fireEvent.click(container.firstElementChild);
            }

            expect(cb).not.toBeCalled();
        });

        test('should not call `onChange` prop if inactive and checked', () => {
            const cb = jest.fn();

            const { container } = render(<Radio onChange={cb} checked={true} inactive={true} />);

            if (container.firstElementChild) {
                fireEvent.click(container.firstElementChild);
            }

            expect(cb).not.toBeCalled();
        });

        test('should not call `onChange` on addon click', () => {
            const cb = jest.fn();
            const addonDti = 'addon';

            const { getByTestId } = render(
                <Radio onChange={cb} addons={<div data-test-id={addonDti} />} />,
            );

            fireEvent.click(getByTestId(addonDti));

            expect(cb).not.toBeCalled();
        });
    });
});
