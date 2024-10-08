import React, { forwardRef } from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';
import { getComponentBreakpoint } from '@alfalab/core-components-shared';
import type { TPatternLockInstance } from '@alfalab/react-canvas-pattern-lock';

import { PatternLockDesktop } from './desktop';
import { PatternLockMobile } from './mobile';
import { PatternLockProps } from './typings';

export const PatternLock = forwardRef<TPatternLockInstance, PatternLockProps>(
    ({ breakpoint = getComponentBreakpoint(), defaultMatchMediaValue, ...restProps }, ref) => {
        const query = `(min-width: ${breakpoint}px)`;

        const [isDesktop] = useMatchMedia(query, defaultMatchMediaValue);

        const Component = isDesktop ? PatternLockDesktop : PatternLockMobile;

        return <Component ref={ref} {...restProps} />;
    },
);

PatternLock.displayName = 'PatternLock';
