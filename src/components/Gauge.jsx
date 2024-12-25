import React from 'react';
import { Gauge } from 'react-circular-gauge';
import chroma from 'chroma-js';

const GaugeComponent = ({ value, uom }) => {
  return (
    <div style={{ width: '300px', height: '200px' }}>
      <Gauge
        value = {value}
        minValue = {0}
        maxValue = {900}
        renderBottomLabel = { uom }
        arcColor={({ normValue }) => chroma.scale(['green', 'red'])(normValue).css()}
      />
    </div>
  )
}

export default GaugeComponent