export default function SectionTitle({ id, title, subtitle, subtitleClass = '' }) {
    return (
        <>
            <h2 id={id} className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">{title}</h2>
            {subtitle && <p className={`mt-4 text-lg text-blush ${subtitleClass}`}>{subtitle}</p>}
        </>
    );
}
