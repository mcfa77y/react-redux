import { useRef } from 'react';

export const Use_Count_Renders = (name: string) => {
  const renders = useRef(0);
  console.log(`${name} rendered: ${renders.current += 1}`);
};
