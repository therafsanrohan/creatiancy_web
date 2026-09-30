"use client";

import React from "react";
import { CLIENTS } from "@/lib/data/home";

export const Clients = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        <div className="md:w-1/3">
          <span className="text-[12px] font-medium tracking-[0.2em] text-[#A3A3A3] uppercase block mb-4">Select Clients</span>
          <h2 className="text-[20px] md:text-[24px] font-medium tracking-tight text-[#1E1E1E]">Trusted by ambitious organizations globally.</h2>
        </div>
        <div className="md:w-2/3 flex flex-wrap gap-8 md:gap-x-12 md:gap-y-8 justify-start md:justify-end items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-700">
          {CLIENTS.map((client, i) => (
            <span key={i} className="text-[20px] md:text-[24px] font-bold tracking-tight text-[#1E1E1E]/40 hover:text-[#1E1E1E] transition-colors cursor-default">
              {client}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
