import React, { useEffect, useState, useRef } from 'react';
import Select from 'react-select';
import { ResizableBox } from 'react-resizable';
import SortedSegmentView from './SortedSegmentView';
import {
  FIRST_FIT,
  BEST_FIT,
  WORST_FIT,
  PROCESS_VIEW_HEIGHT
} from '../helpers/constants';

import segmentProcessesAndHoles from '../core/segment';

export default function SortedProcesses(props) {

  const height = useRef(PROCESS_VIEW_HEIGHT);

  const [selectedOption, setSelectedOption] = useState(null);
  const [segments, setSegments] = useState([]);

  useEffect(() => {
    if (selectedOption) {
      const [allocationResult, newSegments] = segmentProcessesAndHoles(
        props.memorySize,
        height.current,
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

  useEffect(() => {}, [segments]);
  
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
    <div className="bg-danger mt-2 rounded-top" style={{
      position: 'relative',
      height: `${height.current}px`
    }}>
      {segments.map((segment, i) => (
        <SortedSegmentView
          key={i}
          index={i}
          type={segment.type}
          start={segment.start}
          size={segment.end - segment.start}
          text={segment.name}
        />
      ))}
    </div>
  </>)
}