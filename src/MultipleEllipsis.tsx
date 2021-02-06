import React, { FC, ReactNode, useEffect, useState } from 'react';
import ResizeObserver from 'rc-resize-observer';
import { DownOutlined } from '@ant-design/icons';
import { UpOutlined } from '@ant-design/icons';

type Props = {
  children: string | HTMLElement | JSX.Element | ReactNode;
  height: number;
};

const MultipleEllipsis: FC<Props> = (props: Props) => {
  const { children, height: overflowHeight } = props;
  const [state, setState] = useState({
    overflowed: false,
    showAllButton: false,
    initFlag: true
  });
  
  const updateState: any = (nextState: any, callback: any) => callback((prevState: any) => ({ ...prevState, ...nextState }));

  const handleShowAll: VoidFunction = () => {
    updateState({overflowed: !state.overflowed}, setState);
  };

  useEffect(() => {
    updateState({initFlag: true, showAllButton: false, overflowed: false}, setState);
    return () => {
      updateState({}, setState);
    }
  }, []);

  const handleResize: any = ({ height }: any) => {
    if (height > overflowHeight) {
      updateState({showAllButton: true, overflowed: true, initFlag: false}, setState);
    } else {
      updateState({showAllButton: false, overflowed: false, initFlag: false}, setState);
    }
  };
  return (
    
    <div className="multiple-line-ellipsis" style={state.overflowed ? {height: `${overflowHeight}px`, overflow: 'hidden'} : {}}>
      <ResizeObserver onResize={handleResize}>
        <div>
          { children }
          {
            state.showAllButton ?
              <span className="hide-all" onClick={handleShowAll}><UpOutlined /></span> : null
          }
        </div>
      </ResizeObserver>
      {
        state.showAllButton && state.overflowed ? 
          <span className="show-all" onClick={handleShowAll}>... <DownOutlined /></span> : null
      }
    </div>
    
  );
}

export default MultipleEllipsis;