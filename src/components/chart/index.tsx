"use client";
import VerticalChart from "./types/vertical";
import PieChart from './types/pie';
import { useState } from 'react';

export default function ChartPopup({ open, onClose }: { open: boolean, onClose: () => void }) {
    const [switchState, setSwitch] = useState<boolean>(false);
    return (
        <>
            {!switchState ? (
                <VerticalChart switchState={switchState} setSwitch={setSwitch} open={open} onClose={onClose} />
            ) : (   
                <PieChart switchState={switchState} setSwitch={setSwitch} open={open} onClose={onClose} />
            )}
        </>
    );
}

