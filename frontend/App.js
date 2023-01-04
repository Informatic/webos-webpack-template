import './style.scss';
import React from 'react';
const Item = React.forwardRef(({children, label, ...props}, ref) =>
  <div ref={ref} className="item" tabIndex={0} onKeyPress={(evt) => { console.info(evt); if (evt.which === 13) { evt.target.click(); evt.preventDefault(); evt.stopPropagation(); } }} {...props}>
    {label ? <div className="header">
      {label}
    </div> : null}
    {children}
    </div>);

function ExpandableInput({label, value, onChange, ...props}) {
  const [expanded, setExpanded] = React.useState(null);
  const inputRef = React.useRef(null);
  const itemRef = React.useRef(null)
  React.useEffect(() => {
    if (expanded && inputRef.current) {
      inputRef.current.focus();
    } else if (expanded === false && itemRef.current) {
      itemRef.current.focus();
    }
  }, [expanded]);

  return <Item onClick={() => { console.info('item.click()'); setExpanded(true) }} label={label} ref={itemRef}>
    {expanded ?
      <input type="text" value={value} ref={inputRef} onChange={onChange} onKeyDown={(evt) => {
        if (evt.which === 13) {
          setExpanded(false);
          evt.preventDefault();
          evt.stopPropagation();
        }
      }}  onBlur={() => setExpanded(false)} {...props}/> :
      <div className="inner">{value}</div>}
  </Item>;
}

export function App() {
  const [password, setPassword] = React.useState('hello');
  const [port, setPort] = React.useState('123');
  const [width, setWidth] = React.useState('123');
  const [height, setHeight] = React.useState('123');
  const [autostart, setAutostart] = React.useState(true);
  const [value, setValue] = React.useState('initial');

  return <div>
    <div className="half">
      <button onClick={() => setPassword('one')}>Button 1</button>
      <button onClick={() => setPassword('two')}>Button 2</button>
      <ExpandableInput label="Capture width" value={width} onChange={(evt) => { console.info(evt); setWidth(evt.target.value) }}/>
      <ExpandableInput label="Capture height" value={height} onChange={(evt) => { console.info(evt); setHeight(evt.target.value) }}/>
      <ExpandableInput label="Port" value={port} onChange={(evt) => { console.info(evt); setPort(evt.target.value) }}/>
      <ExpandableInput label="Password" value={password} onChange={(evt) => { console.info(evt); setPassword(evt.target.value) }}/>
      <Item label="Autostart" onClick={() => setAutostart(!autostart)}><div className="inner">{autostart ? 'Enabled' : 'Disabled'}</div></Item>
      <Item label="Apply" onClick={() => setPassword('Saved!')} />
    </div>
    <div className="half">
      <div style={{ overflow: 'scroll', maxHeight: '250px' }}>
        {Array.from(Array(20).keys()).map(i => <Item label={`test item ${i}`} />)}
      </div>
      {password}
    </div>
  </div>
}
