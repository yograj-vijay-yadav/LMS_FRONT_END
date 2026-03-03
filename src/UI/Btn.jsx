export default function BrowseToolsButton() {
  return (
    <button
      className="
        relative overflow-hidden 
        px-10 py-4
        text-lg font-semibold text-gray-200 
        rounded-full 
        border border-[#1e253a]
        bg-[#070b0c]
        shadow-[0_0_20px_rgba(0,0,0,0.4)]
        transition-transform duration-300
        hover:scale-105
      "
    >
      {/* Animated sweeping green beam */}
      <span
        className="
          absolute inset-0 
          bg-gradient-to-r from-[#1c7a63] via-[#3dffca] to-[#003020]
          opacity-70
          animate-sweep
        "
        style={{ filter: "blur(22px)" }}
      />

      {/* Static background layer */}
      <span
        className="
          absolute inset-0 
          bg-gradient-to-r from-[#06080a] via-[#0c1a17] to-[#0d3b2d]
          rounded-full
          opacity-90
        "
      />

      {/* Label */}
      <span className="relative z-10">Browse Tools</span>
    </button>
  );
}
