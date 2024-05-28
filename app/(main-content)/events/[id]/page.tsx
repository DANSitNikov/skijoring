import React from "react";

const page = (props: any) => {
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight mb-2">
        Событиe - {JSON.stringify(props.params.id)}
      </h1>
    </div>
  );
};

export default page;
