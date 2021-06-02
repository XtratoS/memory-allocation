import React, { useEffect, useState, useRef } from 'react';
import Select from 'react-select';
import SortedSegmentView from './SortedSegmentView';
import {
  FIRST_FIT,
  BEST_FIT,
  WORST_FIT,
  PROCESS_VIEW_HEIGHT,
  EXPANDED_PROCESS_VIEW_HEIGHT
} from '../helpers/constants';

import segmentProcessesAndHoles from '../core/segment';

export default function SortedProcesses(props) {

  const [height, setHeight] = useState(PROCESS_VIEW_HEIGHT)
  // const height = useRef(PROCESS_VIEW_HEIGHT);

  const [selectedOption, setSelectedOption] = useState(null);
  const [segments, setSegments] = useState([]);
  
  useEffect(() => {
    if (selectedOption) {
      const [allocationResult, newSegments] = segmentProcessesAndHoles(
        props.memorySize,
        height,
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
    height,
    selectedOption,
    props.memorySize,
    props.processes,
    props.holes
  ]);
  
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

    {((selectedOption !== null && segments.length > 0) && <><div className="bg-danger my-2 rounded-top" style={{
      position: 'relative',
      height: `${height}px`
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
    <div
      onClick={() => {
        if (height === PROCESS_VIEW_HEIGHT) {
          setHeight(EXPANDED_PROCESS_VIEW_HEIGHT);
        } else {
          setHeight(PROCESS_VIEW_HEIGHT);
        }
      }}
    >
      <i
        style={{width: '100%', cursor: 'pointer'}}
        className={'fas fa-arrow-' + (height === PROCESS_VIEW_HEIGHT ? 'down' : 'up')}
      ></i>
    </div></>)}
  </>)
}