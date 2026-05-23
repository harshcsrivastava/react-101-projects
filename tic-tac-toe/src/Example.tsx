import { useState } from "react";

export default function Example() {
  const [map, setMap] = useState<Map<string, number>>(new Map());

  const addItem = (key: string, value: number) => {
    setMap(prev => {
      const newMap = new Map(prev); // clone to trigger re-render
      newMap.set(key, value);
      return newMap;
    });
  };

  return (
    <div>
      <button onClick={() => addItem("a", 1)}>Add A</button>
      <button onClick={() => addItem("b", 2)}>Add B</button>
      <pre>{JSON.stringify(Array.from(map.entries()))}</pre>
    </div>
  );
}
