export default function SectionTitle({ text1, text2, text3 }) {
  return (
    <div className="anim-fade-up mx-auto max-w-2xl text-center">
      <span className="badge badge-rose font-semibold uppercase tracking-wider">
        {text1}
      </span>
      <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        {text2}
      </h2>
      {text3 && (
        <p className="mt-4 text-base leading-relaxed text-slate-400">
          {text3}
        </p>
      )}
    </div>
  );
}
