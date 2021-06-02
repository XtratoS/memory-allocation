import React, { useEffect, useState, useRef } from 'react';
import Select from 'react-select';
import SortedSegmentView from './SortedSegmentView';
import {
  FIRST_FIT,
  BEST_FIT,
  WORST_FIT
} from '../helpers/constants';

import segmentProcessesAndHoles from '../core/segment';

export default function SortedProcesses(props) {

  const maxHeight = useRef(600);

  const [selectedOption, setSelectedOption] = useState(null);
  const [segments, setSegments] = useState([]);

  useEffect(() => {
    if (selectedOption) {
      const [allocationResult, newSegments] = segmentProcessesAndHoles(
        props.memorySize,
        maxHeight.current,
        props.processes,
        props.holes,
        selectedOption.value
      );
      if (allocationResult === false) {
        alert(`Failed to allocate processes to memory`);
        return;
      }
      setSegments(newSegments);
    }
  }, [
    selectedOption,
    props.memorySize,
    props.processes,
    props.holes
  ]);

  useEffect(() => {
    
  }, [segments]);
  
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  
  return (<>
    <Select
      value={selectedOption}
      onChange={handleChange}
      options={[
        {value: FIRST_FIT, label: 'First Fit'},
        {value: BEST_FIT, label: 'Best Fit'},
        {value: WORST_FIT, label: 'Worst Fit'}
      ]}
      placeholder="Allocation Method..."
    />
    <div className="bg-danger" style={{
      position: 'relative',
      height: `${maxHeight.current}px`
    }}>
      {segments.map((segment, i) => (
        <SortedSegmentView
          key={i}
          type={segment.type}
          start={segment.start}
          size={segment.end - segment.start}
          text={segment.name}
        />
      ))}
    </div>
  </>)
}