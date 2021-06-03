import React, { useState, useEffect } from 'react';
import AnimateHeight from 'react-animate-height';

export default function ShowProcesses(props) {

  const [listHoles, setListHoles] = useState(true);
  const [listProcesses, setListProcesses] = useState(true);

  const [holeDivHeight, setHoleDivHeight] = useState('auto');
  const [processDivHeight, setProcessDivHeight] = useState('auto');

  useEffect(() => {
    setHoleDivHeight((listHoles === true && 'auto') || 0);
  }, [listHoles]);

  useEffect(() => {
    setProcessDivHeight((listProcesses === true && 'auto') || 0);
  }, [listProcesses]);

  let k = 0;
  return (<>
    <div
      className="h6 mt-1"
    >
      Holes <span
        style={{ cursor: 'pointer' }}
        onClick={() => {setListHoles(!listHoles)}}
        className="link-primary"
      >
        {(listHoles && '[hide]') || '[show]'}
      </span>
    </div>
    <AnimateHeight
      duration={500}
      height={holeDivHeight}
    >
      {props.holes.map((hole, index) => (<div key={k++} className="border border-1 rounded border-secondary">
        <div className="row m-0 p-0">
          <div className="col">
            Hole {index}
          </div>
        </div>
        <div className="row m-0 p-0 border-top border-1 border-secondary">
          <div className="col">
            Start: {hole[0]}
          </div>
          <div className="col">
            Size: {hole[1]}
          </div>
        </div>
      </div>))}
    </AnimateHeight>
    <div
      className="h6 mt-2"
    >
      Processes <span
        style={{ cursor: 'pointer' }}
        onClick={() => {setListProcesses(!listProcesses)}}
        className="link-primary"
      >
        {(listProcesses && '[hide]') || '[show]'}
      </span>
    </div>
    <AnimateHeight
      duration={500}
      height={processDivHeight}
    >
      {props.processes.map((process, index) => (<div
        key={k++}
        className={`border border-1 rounded border-secondary ${props.selectedProcessIndex === index && 'bg-warning'}`}
        onClick={() => {props.selectProcess(index)}}
        style={{cursor: 'pointer'}}
      >
        <div className="row m-0 p-0">
          <div className="col">
            {process.name || <div className="fs-italic">Unnamed Process</div>}
          </div>
        </div>
        <div className="row m-0 p-0 border-top border-1 border-secondary">
          <div className="col">
            # Segments: {process.segments.length}
          </div>
        </div>
      </div>))}
    </AnimateHeight>
  </>)
}


