import React from 'react';
import { storiesOf } from '@storybook/react';
import { Router, Route } from 'react-router';
import { createMemoryHistory } from 'history'

import components from './components';

const storybook = 'Titolo progetto';
const story = storiesOf(storybook, module)
.addDecorator(story => (
  <Router history={createMemoryHistory('/')}>
    <Route path="/" component={() => story()} />
  </Router>
));

function findChild(name, props){
  for (let i=0; i<components.length;i++) {
    const element = components[i];
    if (element.name === name) {
      const Child = element.path;
      return <Child {...props} />;
    }
  }
}

components.forEach(element => {

    const Component = element.path;
    const dataSource = element.data;
    const dataStyle = element.style;

    if (dataSource && Array.isArray(dataSource)) {
      const _story = storiesOf(`${storybook}/${element.name}`, module);
      dataSource.forEach(data => {
        const props = data.data;
        const name = data.name;

        if (props.children) {
          const _children = [];
          props.children.forEach(element => {
            _children.push(findChild(element.component, element.props));
          });
          props.children = _children;
        }
        
        _story.addDecorator(story => <div style={dataStyle}>{story()}</div>)
        .addDecorator(story => (
          <Router history={createMemoryHistory('/')}>
            <Route path="/" component={() => story()} />
          </Router>
        ))
        .add(name, () => <Component {...props} />);
      });
    } else {
      story.add(element.name, () => <Component />);
    }



});