/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useCallback } from 'react'
import { useTooltip } from '@nivo/tooltip'
import { Slice } from './hooks'
import { SliceTooltipProps } from './SliceTooltip'

interface SlicesItemProps {
    slice: Slice
    axis: 'x' | 'y'
    debug: boolean
    height: number
    tooltip: React.ComponentClass<SliceTooltipProps>
    isCurrent: boolean
    setCurrent: React.Dispatch<React.SetStateAction<Slice | null>>
}

export default function SlicesItem({ slice, axis, debug, tooltip, isCurrent, setCurrent }: SlicesItemProps) {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleMouseEnter = useCallback(
        event => {
            showTooltipFromEvent(React.createElement(tooltip, { slice, axis }), event, 'right')
            setCurrent(slice)
        },
        [showTooltipFromEvent, tooltip, slice]
    )

    const handleMouseMove = useCallback(
        event => {
            showTooltipFromEvent(React.createElement(tooltip, { slice, axis }), event, 'right')
        },
        [showTooltipFromEvent, tooltip, slice]
    )

    const handleMouseLeave = useCallback(() => {
        hideTooltip()
        setCurrent(null)
    }, [hideTooltip])

    return (
        <rect
            x={slice.x0}
            y={slice.y0}
            width={slice.width}
            height={slice.height}
            stroke="red"
            strokeWidth={debug ? 1 : 0}
            strokeOpacity={0.75}
            fill="red"
            fillOpacity={isCurrent && debug ? 0.35 : 0}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        />
    )
}
