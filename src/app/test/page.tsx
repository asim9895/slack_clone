"use client";

import { useQuery } from "convex/react";
import React from "react";
import { api } from "../../../convex/_generated/api";

const TestPage = () => {
  const tasks = useQuery(api.tasks.get);
  return (
    <div>
      {" "}
      <div>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          {tasks?.map(({ _id, text }) => <div key={_id}>{text}</div>)}
        </main>
      </div>
    </div>
  );
};

export default TestPage;
