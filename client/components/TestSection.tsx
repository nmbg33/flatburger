import React from "react";

export const TestSection: React.FC = () => {
  return (
    <section className="py-20 bg-red-500 text-white min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-6xl font-black mb-4">TEST SECTION</h2>
        <p className="text-2xl">This is a test to see if sections render properly</p>
      </div>
    </section>
  );
};
