"use client";

export default function Transition({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center h-[500px] md:h-full w-full">
      <p className="text-xl italic text-gray-800 md:ml-3 md:text-2xl lg:text-4xl pt-6 lg:pt-6">
        {message}
      </p>
    </div>
  );
}
