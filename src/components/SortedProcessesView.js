import React, { useEffect, useState } from 'react';
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

  const [height, setHeight] = useState(PROCESS_VIEW_HEIGHT);

  const [selectedOption, setSelectedOption] = useState(null);
  const [segments, setSegments] = useState([]);
  
  useEffect(() => {
    if (selectedOption) {
      const [allocationResult, newSegments, failtures] = segmentProcessesAndHoles(
        props.memorySize,
        height,
        props.processes,
        props.holes,
        selectedOption.value
      );
      if (allocationResult === false) {
        alert(`Failed to allocate process(es); ${failtures.join(' ')} to memory`);
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
      styles={{
        option: (provided) => ({
          ...provided,
          color: 'black'
        }),
        menu: (provided) => ({
          ...provided,
          marginTop: 2
        })
      }}
      placeholder="Allocation Method..."
    />

    {((selectedOption !== null && segments.length > 0) && <><div className="my-2 rounded-top" style={{
      position: 'relative',
      height: `${height}px`,
      transition: '.5s'
    }}>
      {segments.map((segment, i) => (
        <SortedSegmentView
          key={i}
          index={i}
          deallocateSelf={() => {
            let segmentStart = segment.unfactoredStart
            let segmentSize = segment.unfactoredSize;
            let newHole = [segmentStart, segmentSize];
            console.log(segment);
            props.insertHole(newHole);
          }}
          type={segment.type}
          start={segment.start}
          size={segment.end - segment.start}
          text={segment.name}
          style={{transition: '.5s'}}
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