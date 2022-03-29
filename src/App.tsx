import React, { ReactElement, ReactNode, useState } from 'react';
import logo from './logo.svg';
import './App.css';



//conventional props
const Heading = ({ title }: { title: string }) => {
  return (
    <h1>
      {title}
    </h1>
  )
}

const HeadingWithContent = ({ children }: { children: ReactNode }): ReactElement => {
  return <h1>{children}</h1>
};


//default props

type ContainerProps = { children: ReactNode } & typeof defaultContainerProps;

const Container = ({
  heading,
  children
}: ContainerProps): ReactElement => {
  return <div><h1>{heading}</h1>{children}</div>
};

const defaultContainerProps = {
  heading: <strong>MY Heading</strong>
};

Container.defaultProps = defaultContainerProps;


//pass func as props

function TextWithNumber({
  children,
  header,
}: {
  children: (num: number) => ReactNode;
  header?: (num: number) => ReactNode;
}) {
  const [state, setState] = useState<number>(0);
  return (
    <div>
      {header && <h2>{header?.(state)}</h2>}
      <div>
        {children(state)}
      </div>
      <div>
        <button onClick={() => setState(state + 1)}> Add</button>
      </div>
    </div>
  )
};

function List<ListItem>({
  items,
  render
}: {
  items: ListItem[],
  render: (item: ListItem) => ReactNode
}) {
  return (
    <ul>
      {items.map((item, index) => <li key={index}>{render(item)}</li>)}
    </ul>
  )
}


function App() {
  return (
    <div>
      <Heading title='hello' />

      <HeadingWithContent>hi</HeadingWithContent>

      <Container>FOo</Container>

      <TextWithNumber >{(num: number) => <div> Today's number is {num}</div>}</TextWithNumber>

      <List items={['jack', 'john', 'joe']} render={(item: string) => <div>{item.toLowerCase()}</div>}></List>
    </div>
  );
}

export default App;
